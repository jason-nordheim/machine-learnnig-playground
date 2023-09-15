// @ts-ignore
import { drawPaths } from "jn-drawing-common";

export class SketchViewer {
  container: Element;
  canvas: HTMLCanvasElement;

  constructor(container: Element, paths: number[][][], size = 200) {
    this.container = container;

    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.classList.add("sketch-viewer");
    const ctx = this.canvas.getContext("2d");
    ctx?.scale(0.5, 0.5);
    drawPaths(ctx, paths);

    this.container.appendChild(this.canvas);
  }
}
