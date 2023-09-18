import { Point } from "../common";

export const drawPoint = (ctx: CanvasRenderingContext2D, loc: Point, color: string = "black", size: number = 8) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(...loc, size / 2, 0, Math.PI * 2);
  ctx.fill();
};

type DrawTextParams = {
  ctx: CanvasRenderingContext2D;
  text: string;
  loc: Point;
  align?: CanvasRenderingContext2D["textAlign"];
  vAlign?: CanvasRenderingContext2D["textBaseline"];
  size?: number;
  color?: string;
};

export const drawText = ({
  ctx,
  text,
  loc,
  align = "center",
  vAlign = "middle",
  size = 10,
  color = "black",
}: DrawTextParams) => {
  ctx.textAlign = align;
  ctx.textBaseline = vAlign;
  ctx.font = `bold ${size}px Courier`;
  ctx.fillStyle = color;
  ctx.fillText(text, loc[0], loc[1]);
};

export const generateImages = () => {
  throw new Error("No Implemented");
};
