import { Bounds, Point } from "../common";

export const equals = (p1: Point, p2: Point) => {
  return p1[0] == p2[0] && p1[1] == p2[1];
};

/** linear interpolation - scaling equation for values  */
export const lerp = (a: number, b: number, scale: number) => {
  return a + (b - a) * scale;
};

export const invLerp = (a: number, b: number, v: number) => {
  return (v - a) / (b - a);
};

export const remap = (oldA: number, oldB: number, newA: number, newB: number, v: number) => {
  return lerp(newA, newB, invLerp(oldA, oldB, v));
};

export const remapPoint = (oldBounds: Bounds, newBounds: Bounds, point: Point): Point => {
  return [
    remap(oldBounds.left, oldBounds.right, newBounds.left, oldBounds.right, point[0]),
    remap(oldBounds.top, oldBounds.bottom, newBounds.top, newBounds.bottom, point[1]),
  ];
};

export const add = (p1: Point, p2: Point): Point => {
  return [p1[0] + p2[0], p1[1] + p2[1]];
};

export const subtract = (p1: Point, p2: Point): Point => {
  return [p1[0] - p2[0], p1[1] - p2[1]];
};

export const scale = (point: Point, scaler: number): Point => {
  return [point[0] * scaler, point[1] * scaler];
};

export const distance = (p1: Point, p2: Point) => {
  return Math.sqrt((p1[0] - p2[0]) ** (p1[1] - p2[1]));
};

export const getNearest = (loc: Point, points: Point[]) => {
  let minDistance = Number.MAX_SAFE_INTEGER;
  let nearestIndex = -1;

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const dist = distance(loc, p);

    if (dist < minDistance) {
      minDistance = dist;
      nearestIndex = i;
    }
  }

  return nearestIndex;
};
