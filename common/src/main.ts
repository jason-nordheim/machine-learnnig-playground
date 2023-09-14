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

export const drawPaths = (ctx: CanvasRenderingContext2D, paths: number[][][], color = "black") => {
  for (const path of paths) {
    drawPath(ctx, path, color);
  }
};
