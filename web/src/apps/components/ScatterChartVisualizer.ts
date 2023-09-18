import {
  add,
  distance,
  equals,
  getNearest,
  invLerp,
  lerp,
  remap,
  remapPoint,
  scale,
  subtract,
} from "../../helpers/math";
import { drawPoint, drawText } from "../../helpers/drawingUtils";
import { AxisLabels, ChartData, FeatureSpec, GenericData, Point, PointWithId } from "../../common";

type ChartStyles = {
  bgColor: string;
  transparency: number;
  margin?: number;
};

export type ScatterChartOptions = {
  size: number;
  labels: AxisLabels;
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

const DEFAULT_OPTIONS = {
  size: 400,
  labels: { x: "x", y: "y" },
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

  private hoveredSample: any;
  private selectedSample: any;

  private pixelBounds: Bounds;
  private dataBounds: Bounds;

  private pointsWithIds: PointWithId[] = [];

  constructor(container: HTMLDivElement, data: ChartData, options: ScatterChartOptions, styles?: ChartStyles) {
    this.container = container;
    this.pointsWithIds = data.points;

    // options
    this.margin = options.size * 0.11;
    this.size = options.size;
    this.transparency = styles?.transparency || DEFAULT_STYLES.transparency;
    this.axisLabels = options.labels;

    // setup canvas
    this.canvasRef = document.createElement("canvas");
    this.canvasRef.width = this.size;
    this.canvasRef.height = this.size;
    this.canvasRef.style.backgroundColor = styles?.bgColor ? styles.bgColor : DEFAULT_STYLES.bgColor;
    this.container.appendChild(this.canvasRef);

    // setup bound
    this.pixelBounds = this.getPixelBounds();
    this.dataBounds = this.getDataBounds();
    this.draw();
  }

  getPosition(evt: MouseEvent | TouchEvent): [number, number] {
    if (evt instanceof MouseEvent) {
      const { offsetX, offsetY } = evt;
      const x = Math.round(offsetX);
      const y = Math.round(offsetY);
      return [x, y];
    } else if (evt instanceof TouchEvent) {
      evt.preventDefault();
      const loc = evt.touches[0];
      const rect = this.canvasRef.getBoundingClientRect();
      const x = Math.round(loc.clientX);
      const y = Math.round(loc.clientY - rect.top);
      return [x, y];
    }
    throw new Error("Unsupported event provided");
  }

  private addEventlisteners() {
    // // mouse down
    // this.canvasRef.onmousedown = (evt) => {
    //   this.dragInfo = {
    //     start: this.getPosition(evt),
    //     isDragging: true,
    //     end: [0, 0],
    //     offset: [0, 0],
    //   };
    // };
    // // mouse move
    // this.canvasRef.onmousemove = (evt) => {
    //   if (this.dragInfo.isDragging) {
    //     const location = this.getPosition(evt);
    //     this.dragInfo.end = location;
    //     this.dragInfo.offset = scale(subtract(this.dragInfo.start, this.dragInfo.end), this.dataTrans.scale ** 2);
    //     const newOffset = add(this.dataTrans.offset, this.dragInfo.offset);
    //   }
    //   const pLoc = this.getPosition(evt);
    //   const pPoints = this.data.map((sample) => {
    //     return remapPoint(this.dataBounds, this.pixelBounds, [sample.path_count, sample.point_count]);
    //   });
    //   const index = getNearest(pLoc, pPoints);
    //   const nearest = this.data[index];
    //   const dist = distance(pPoints[index], pLoc);
    //   const margin = this.options.styles!.margin!;
    //   if (dist < margin / 2) {
    //     this.hoveredSample = nearest;
    //   } else {
    //     this.hoveredSample = null;
    //   }
    //   this.draw();
    // };
    // // mouse up
    // this.canvasRef.onmouseup = () => {
    //   this.dataTrans.offset = add(this.dataTrans.offset, this.dragInfo.offset);
    //   this.dragInfo.isDragging = false;
    // };
    // // on wheel
    // this.canvasRef.onwheel = (evt) => {
    //   const dir = Math.sign(evt.deltaY);
    //   const step = 0.02;
    //   this.dataTrans.scale += dir * step;
    //   this.dataTrans.scale = Math.max(step, Math.min(2, this.dataTrans.scale));
    //   this.draw();
    //   evt.preventDefault();
    // };
    // this.canvasRef.onclick = (evt) => {
    //   if (!equals(this.dragInfo.offset, [0, 0])) {
    //     return;
    //   }
    //   const loc = this.getPosition(evt);
    //   if (this.hoveredSample) {
    //     if (this.selectedSample == this.hoveredSample) {
    //       this.selectedSample = null;
    //     } else {
    //       this.selectedSample = this.hoveredSample;
    //     }
    //   } else {
    //     this.selectedSample = null;
    //   }
    //   if (loc) {
    //     this.selectedSample = loc;
    //   }
    //   this.draw();
    // };
  }

  private get ctx() {
    return this.canvasRef.getContext("2d")!;
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.drawAxis();
    this.ctx.globalAlpha = this.transparency;
    this.drawSamples();
    this.ctx.globalAlpha = 1;
  }

  private drawAxis() {
    const size = this.margin * 0.4;
    const { left, right, top, bottom } = this.pixelBounds;
    drawText({
      ctx: this.ctx,
      text: this.axisLabels.x,
      loc: [this.canvasRef.width / 2, bottom + this.margin / 2],
      size,
    });

    this.ctx.save();

    this.ctx.translate((left - this.margin) / 2, this.canvasRef.height / 2);
    this.ctx.rotate(-Math.PI / 2);
    drawText({ ctx: this.ctx, text: this.axisLabels.y, loc: [0, size], size });
    this.ctx.restore();
  }

  private drawSamples() {
    for (let i = 0; i < this.pointsWithIds.length; i++) {
      const point = remapPoint(this.dataBounds, this.pixelBounds, this.pointsWithIds[i].point);
      drawPoint(this.ctx, point);
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
