// legacy.d.ts

interface Circle {
  type: "circle";
  radius: number;
  area?: number;
}

interface Rectangle {
  type: "rectangle";
  length: number;
  width: number;
  area?: number;
}

interface Square {
  type: "square";
  width: number;
  area?: number;
}

interface RightTriangle {
  type: "rightTriangle";
  base: number;
  height: number;
  area?: number;
}

type Shape = Circle | Rectangle | Square | RightTriangle;

declare function getCircleArea(radius: number): number;
declare function getRectangleArea(length: number, width: number): number;
declare function getSquareArea(width: number): number;
declare function getRightTriangleArea(base: number, height: number): number;
declare function getArea(shape: Shape): void;
