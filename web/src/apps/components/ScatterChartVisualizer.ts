import {
  add,
  distance,
  equals,
  formatNumber,
  getNearest,
  invLerp,
  lerp,
  remap,
  remapPoint,
  scale,
  subtract,
} from "../../helpers/math";
import { drawPoint, drawText } from "../../helpers/drawingUtils";
import { AxisLabels, ChartData, FeatureSpec, GenericData, Point, ExtendedPoint } from "../../common";

type PointRenderOptions = "text" | "emoji" | "color";

type ChartStyles = {
  bgColor: string;
  transparency: number;
  margin?: number;
};

export type ScatterChartOptions = {
  size: number;
  labels: AxisLabels;
  showPointsAs?: PointRenderOptions;
};

type DragInfo = {
  start: Point;
  end: Point;
  offset: Point;
  isDragging: boolean;
};

type DataTrans = {
  offset: Point;
  scale: number;
};

type Bounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const DEFAULT_OPTIONS: Required<ScatterChartOptions> = {
  size: 400,
  labels: { x: "x", y: "y" },
  showPointsAs: "color",
};

const DEFAULT_STYLES = {
  transparency: 0.5,
  bgColor: "white",
};

export class ScatterChartVisualizer {
  private container: HTMLDivElement;
  private canvasRef: HTMLCanvasElement;

  // configuration options
  private margin: number;
  private size: number;
  private transparency: number;
  private axisLabels: AxisLabels;
  private showPointAs: PointRenderOptions;

  private hoveredSample: any;
  private selectedSample: any;
  private nearestSampleToMouse?: ExtendedPoint;

  private pixelBounds: Bounds;
  private dataBounds: Bounds;
  private defaultDataBounds: Bounds;

  private pointsWithIds: ExtendedPoint[] = [];

  private dataTrans: DataTrans;
  private dragInfo: DragInfo;

  constructor(container: HTMLDivElement, data: ChartData, options: ScatterChartOptions, styles?: ChartStyles) {
    this.container = container;
    this.pointsWithIds = data.points;

    // options
    this.margin = options.size * 0.11;
    this.size = options.size;
    this.transparency = styles?.transparency || DEFAULT_STYLES.transparency;
    this.axisLabels = options.labels;
    this.showPointAs = options?.showPointsAs || DEFAULT_OPTIONS.showPointsAs;

    // setup canvas
    this.canvasRef = document.createElement("canvas");
    this.canvasRef.width = this.size;
    this.canvasRef.height = this.size;
    this.canvasRef.style.backgroundColor = styles?.bgColor ? styles.bgColor : DEFAULT_STYLES.bgColor;
    this.container.appendChild(this.canvasRef);

    // setup bound
    this.pixelBounds = this.getPixelBounds();
    this.dataBounds = this.getDataBounds();
    this.defaultDataBounds = this.getDataBounds();

    // setup dragging
    this.dataTrans = {
      offset: [0, 0],
      scale: 1,
    };
    this.dragInfo = {
      start: [0, 0],
      end: [0, 0],
      offset: [0, 0],
      isDragging: false,
    };

    this.draw();

    this.addEventListeners();
  }

  private get ctx() {
    return this.canvasRef.getContext("2d")!;
  }

  private getMousePos(evt: MouseEvent, dataSpace = false) {
    const rect = this.canvasRef.getBoundingClientRect();
    const pixelLoc: Point = [evt.clientX - rect.left, evt.clientY - rect.top];
    if (dataSpace) {
      const dataLoc = remapPoint(this.pixelBounds, this.defaultDataBounds, pixelLoc);
      return dataLoc;
    }
    return pixelLoc;
  }

  private updateDataBounds(offset: Point) {
    const def = this.defaultDataBounds;
    const newBounds = {
      left: def.left + offset[0],
      right: def.right + offset[0],
      top: def.top + offset[1],
      bottom: def.bottom + offset[1],
    };

    const center: Point = [
      (this.dataBounds.left + this.dataBounds.right) / 2,
      (this.dataBounds.top + this.dataBounds.bottom) / 2,
    ];

    const scale = this.dataTrans.scale ** 2;
    const scaledBounds = {
      left: lerp(center[0], newBounds.left, scale),
      right: lerp(center[0], newBounds.right, scale),
      top: lerp(center[1], newBounds.top, scale),
      bottom: lerp(center[1], newBounds.bottom, scale),
    };

    this.dataBounds = scaledBounds;
  }

  private addEventListeners() {
    this.canvasRef.onmousedown = (evt) => {
      const dataLoc = this.getMousePos(evt, true);
      this.dragInfo.start = dataLoc;
      this.dragInfo.isDragging = true;
    };

    this.canvasRef.onmousemove = (evt) => {
      if (this.dragInfo.isDragging) {
        const dataLoc = this.getMousePos(evt, true);
        this.dragInfo.end = dataLoc;
        this.dragInfo.offset = subtract(this.dragInfo.start, this.dragInfo.end);
        const newOffset = add(this.dataTrans.offset, this.dragInfo.offset);
        this.updateDataBounds(newOffset);
      }
      // hover logic
      const pLoc = this.getMousePos(evt);
      const dPoints = this.pointsWithIds.map((s) => remapPoint(this.dataBounds, this.pixelBounds, s.point));
      // nearest search
      const index = getNearest(pLoc, dPoints);
      this.nearestSampleToMouse = this.pointsWithIds[index];
      this.draw();
    };

    this.canvasRef.onmouseup = (evt) => {
      this.dataTrans.offset = add(this.dataTrans.offset, this.dragInfo.offset);
      this.dragInfo.isDragging = false;
      evt.preventDefault();
    };

    this.canvasRef.onwheel = (evt) => {
      const direction = Math.sign(evt.deltaY);
      const step = 0.02;
      const scale = this.dataTrans.scale + direction * step;
      this.dataTrans.scale = Math.max(step, Math.min(2, scale));
      this.updateDataBounds(this.dataTrans.offset);

      this.draw();
      evt.preventDefault();
    };
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.drawAxis();
    this.ctx.globalAlpha = this.transparency;
    this.drawSamples([...this.pointsWithIds]);
    this.ctx.globalAlpha = 1;

    if (this.nearestSampleToMouse) {
      this.drawSamples([this.nearestSampleToMouse]);
    }
  }

  private drawAxis() {
    const size = this.margin * 0.4;
    const { left, right, top, bottom } = this.pixelBounds;
    // x-axis
    drawText(this.ctx, {
      text: this.axisLabels.x,
      loc: [this.canvasRef.width / 2, bottom + this.margin / 2],
      size,
    });

    this.ctx.save();

    // y-axis
    this.ctx.translate((left - this.margin) / 2, this.canvasRef.height / 2);
    this.ctx.rotate(-Math.PI / 2);
    drawText(this.ctx, { text: this.axisLabels.y, loc: [0, size], size });
    this.ctx.restore();

    // lines
    this.ctx.moveTo(left, top);
    this.ctx.lineTo(left, bottom);
    this.ctx.lineTo(right, bottom);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "lightgray";
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // line labels
    this.drawLineLabels();
  }

  private drawLineLabels() {
    const { left, right, top, bottom } = this.pixelBounds;
    const size = this.margin * 0.25;
    const dataMin = remapPoint(this.pixelBounds, this.dataBounds, [left, bottom]);
    const xMinLabel = formatNumber(dataMin[0], 2);
    drawText(this.ctx, {
      text: xMinLabel.toString(),
      loc: [left, bottom],
      size,
      align: "left",
      vAlign: "top",
    });

    this.ctx.save();

    const yMinLabel = formatNumber(dataMin[1], 2);
    this.ctx.translate(left, bottom);
    this.ctx.rotate(-Math.PI / 2);
    drawText(this.ctx, {
      text: yMinLabel.toString(),
      loc: [0, 0],
      size,
      align: "left",
      vAlign: "bottom",
    });

    this.ctx.restore();

    const dataMax = remapPoint(this.pixelBounds, this.dataBounds, [right, top]);
    const xMaxLabel = formatNumber(dataMax[0], 2);
    drawText(this.ctx, {
      text: xMaxLabel.toString(),
      loc: [right, bottom],
      size,
      align: "right",
      vAlign: "top",
    });

    this.ctx.save();

    const yMaxLabel = formatNumber(dataMax[1], 2);
    this.ctx.translate(left, top);
    this.ctx.rotate(-Math.PI / 2);
    drawText(this.ctx, {
      text: yMaxLabel.toString(),
      loc: [0, 0],
      size,
      align: "right",
      vAlign: "bottom",
    });
    this.ctx.restore();
  }

  private drawSamples(points: ExtendedPoint[]) {
    for (let i = 0; i < points.length; i++) {
      const point = remapPoint(this.dataBounds, this.pixelBounds, points[i].point);
      switch (this.showPointAs) {
        case "text":
          const label = points[i].text;
          if (label == undefined) throw new Error("no label provided");
          drawText(this.ctx, { text: label, loc: point });
          break;
        case "emoji":
          const emoji = points[i].altText;
          if (emoji == undefined) throw new Error("no emoji provided");
          drawText(this.ctx, { text: emoji, loc: point });
          break;
        default:
          drawPoint(this.ctx, point, points[i]?.color);
          break;
      }
    }
  }

  private getPixelBounds() {
    const bounds = {
      left: this.margin,
      right: this.size - this.margin,
      top: this.margin,
      bottom: this.size - this.margin,
    };
    return bounds;
  }

  private getDataBounds() {
    const x = this.pointsWithIds.map((s) => s.point[0]);
    const y = this.pointsWithIds.map((s) => s.point[1]);

    const minX = Math.min(...x);
    const maxX = Math.max(...x);

    const minY = Math.min(...y);
    const maxY = Math.max(...y);

    const bounds = {
      left: minX,
      right: maxX,
      top: maxY,
      bottom: minY,
    };

    return bounds;
  }
}
