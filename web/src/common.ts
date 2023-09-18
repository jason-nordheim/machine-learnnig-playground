export interface UnMountable {
  unmount: () => void;
}

export type SessionData = {
  name?: string;
  sessionId?: number;
  drawings?: { [k: string]: number[][][] };
};

export type Point = [number, number];

export type PointWithId = {
  point: Point;
  id: string;
};

export type Bounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export type CombinedData = {
  session: number;
  student: string;
  drawings: {
    [k: string]: number[][][];
  };
};

export type FeatureSpec = {
  path_count: number;
  point_count: number;
  session_id: string;
  label: string;
};

export type GenericData = { point: [number, number]; xLabel: string; yLabel: number; xDesc: string; yDesc: string };

export type ChartData = {
  points: PointWithId[];
  axisLabels: { x: string; y: string };
};

export type AxisLabels = {
  x: string;
  y: string;
};
