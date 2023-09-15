"use strict";
/// <reference types="@types/node"/>

const drawPath = (ctx: CanvasRenderingContext2D, path: number[][], color = "black") => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  const [x, y] = path[0];
  ctx.moveTo(x, y);
  for (let i = 1; i < path.length; i++) {
    const [x, y] = path[i];
    ctx.lineTo(x, y);
  }
  ctx.stroke();
};

const drawPaths = (ctx: CanvasRenderingContext2D, paths: number[][][], color = "black") => {
  if (paths && paths.length) {
    for (let i = 0; i < paths.length; i++) {
      drawPath(ctx, paths[i], color);
    }
  }
};

export { drawPath, drawPaths };
