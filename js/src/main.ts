const drawPath = (ctx: CanvasRenderingContext2D, path: number[][], color = "black") => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  const [x, y] = path[0];
  // console.log(`moving to: ${x},${y}`);
  ctx.moveTo(x, y);
  for (let i = 1; i < path.length; i++) {
    const [x, y] = path[i];
    // console.log(`creating line: ${x},${y}`);
    ctx.lineTo(x, y);
  }
  ctx.stroke();
};

const drawPaths = (ctx: CanvasRenderingContext2D, paths: number[][][], color = "black") => {
  for (const path of paths) {
    drawPath(ctx, path);
  }
};

class SketchPad {
  private canvas: HTMLCanvasElement;
  private paths: number[][][];
  private isDrawing: boolean;

  constructor(container: Element, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style.backgroundColor = "white";
    this.canvas.style.boxShadow = `0px 0px 10px 2px black`;
    container.appendChild(this.canvas);

    this.ctx.scale(1, 1);

    this.paths = [];
    this.isDrawing = false;

    this.addEventListeners();
  }

  private get ctx() {
    return this.canvas.getContext("2d")!;
  }

  private reDraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
    drawPaths(this.ctx, this.paths);
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
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.round(loc.clientX);
      const y = Math.round(loc.clientY - rect.top);
      return [x, y];
    }
    throw new Error("Unsupported event provided");
  }

  private makeStartPathEventHandler() {
    return (evt: MouseEvent | TouchEvent) => {
      const position = this.getPosition(evt);
      this.paths.push([position]);
      this.isDrawing = true;
    };
  }

  private makeDragPathEventHandler() {
    return (evt: MouseEvent | TouchEvent) => {
      if (this.isDrawing) {
        const position = this.getPosition(evt);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(position);
        this.reDraw();
      }
    };
  }

  private makeDragEndEventHandler() {
    return (_: MouseEvent | TouchEvent) => {
      this.isDrawing = false;
    };
  }

  private addEventListeners() {
    this.canvas.onmousedown = this.makeStartPathEventHandler();
    this.canvas.onmousemove = this.makeDragPathEventHandler();
    this.canvas.onmouseup = this.makeDragEndEventHandler();
    this.canvas.ontouchstart = this.makeStartPathEventHandler();
    this.canvas.ontouchmove = this.makeDragPathEventHandler();
    this.canvas.ontouchend = this.makeDragEndEventHandler();
  }
}

const init = () => {
  const container = document.querySelector("#sketchPadContainer");
  if (!container) {
    throw new Error("Cannot find sketch pad container");
  }

  const sketchPad = new SketchPad(container);
};

init();
