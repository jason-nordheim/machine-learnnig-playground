//@ts-ignore
import { drawPaths } from "jn-drawing-common";

export class SketchPad {
  private undoBtn: HTMLButtonElement;
  private canvas: HTMLCanvasElement;
  private paths: number[][][] = [];
  private isDrawing: boolean = false;

  constructor(container: Element, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style.backgroundColor = "white";
    this.canvas.style.boxShadow = `0px 0px 10px 2px black`;
    container.appendChild(this.canvas);

    const controls = document.createElement("div");
    container.appendChild(controls);

    this.undoBtn = document.createElement("button");
    this.undoBtn.innerHTML = "Undo";
    container.appendChild(this.undoBtn);

    this.ctx.scale(1, 1);

    this.reset();

    this.addEventListeners();
  }

  private get ctx() {
    return this.canvas.getContext("2d")!;
  }

  private reDraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
    drawPaths(this.ctx, this.paths);
    if (this.paths.length > 0) {
      this.undoBtn.disabled = false;
    } else {
      this.undoBtn.disabled = true;
    }
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

  private makeUndoEventHandler() {
    return () => {
      this.paths.pop();
      this.reDraw();
    };
  }

  private addEventListeners() {
    this.canvas.onmousedown = this.makeStartPathEventHandler();
    this.canvas.onmousemove = this.makeDragPathEventHandler();
    document.onmouseup = this.makeDragEndEventHandler();
    this.canvas.ontouchstart = this.makeStartPathEventHandler();
    this.canvas.ontouchmove = this.makeDragPathEventHandler();
    document.ontouchend = this.makeDragEndEventHandler();

    this.undoBtn.onclick = this.makeUndoEventHandler();
  }

  public reset() {
    this.paths = [];
    this.isDrawing = false;
    this.reDraw();
  }

  public getPaths() {
    return this.paths;
  }
}
