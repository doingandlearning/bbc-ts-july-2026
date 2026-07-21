// legacy.d.ts
type Circle = {
  type: "circle";
  radius: number;
  area?: number;
};

type Rectangle = {
  type: "rectangle";
  length: number;
  width: number;
  area?: number;
};

type RightTriangle = {
  type: "rightTriangle";
  base: number;
  area?: number;
  height: number;
};

type Square = {
  type: "square";
  area?: number;
  width: number;
};

type Shape = Circle | Rectangle | Square | RightTriangle;

type CircleAreaFn = (radius: number) => number;
type RectangleAreaFn = (length: number, width: number) => number;
type SquareAreaFn = (width: number) => number;
type RightTriangleAreaFn = (base: number, height: number) => number;
type AreaFn = (shape: Shape) => void;
