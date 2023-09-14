const drawPath = (ctx: CanvasRenderingContext2D, path: number[][], color = "black") => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
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

class SketchPad {
  private canvas: HTMLCanvasElement;
  private path: number[][];
  private isDrawing: boolean;
  private size: number;

  constructor(container: Element, size = 400) {
    this.size = size;
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style.backgroundColor = "white";
    this.canvas.style.boxShadow = `0px 0px 10px 2px black`;
    container.appendChild(this.canvas);

    this.ctx.scale(1, 1);

    this.path = [];
    this.isDrawing = false;

    this.addEventListeners();
  }

  private get ctx() {
    return this.canvas.getContext("2d")!;
  }

  private getMouse(evt: MouseEvent) {
    const { offsetX, offsetY, pageX, pageY } = evt;
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.round(pageX - rect.left);
    const y = Math.round(pageY - rect.top);
    console.log({ x, y });
    return [x, y];
  }

  private reDraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
    drawPath(this.ctx, this.path);
  }

  private addEventListeners() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.getMouse(evt);
      this.path = [mouse];
      this.isDrawing = true;
    };
    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.getMouse(evt);
        this.path.push(mouse);
        this.reDraw();
      }
    };
    this.canvas.onmouseup = () => {
      this.isDrawing = false;
    };
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
