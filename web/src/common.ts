export type Point = [number, number];

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
