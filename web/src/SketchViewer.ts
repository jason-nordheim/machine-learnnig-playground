// @ts-ignore
import { drawPaths } from "jn-drawing-common";

export class SketchViewer {
  container: Element;
  sketchContainerRef: HTMLDivElement;
  canvas: HTMLCanvasElement;

  constructor(container: Element, paths: number[][][], label: string, size = 200) {
    this.container = container;

    this.sketchContainerRef = document.createElement("div");
    this.sketchContainerRef.classList.add("sketch-viewer");
    const labelElement = document.createElement("span");
    labelElement.innerText = label;

    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    const ctx = this.canvas.getContext("2d");
    ctx?.scale(0.5, 0.5);
    drawPaths(ctx, paths);

    this.sketchContainerRef.appendChild(labelElement);
    this.sketchContainerRef.appendChild(this.canvas);
    this.container.appendChild(this.sketchContainerRef);
  }
}
