export type Circle = {
  type: "circle";
  radius: number;
  area?: number;
};

export type Rectangle = {
  type: "rectangle";
  length: number;
  width: number;
  area?: number;
};

export type RightTriangle = {
  type: "rightTriangle";
  base: number;
  area?: number;
  height: number;
};

export type Square = {
  type: "square";
  area?: number;
  width: number;
};

export type ValidShapes = Circle | Rectangle | RightTriangle | Square;
