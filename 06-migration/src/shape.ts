import type {
  Circle,
  Rectangle,
  RightTriangle,
  Square,
  ValidShapes,
} from "./shape.types.js";

const PI = Math.PI;

// Circle/Rectangle/Square/RightTriangle

// Shape
// Type the parameters

// @ts-expect-error
function getCircleArea({ radius }) {
  return radius * radius * PI;
}

function getRectangleArea({ length, width }: Rectangle) {
  return length * width;
}

function getSquareArea({ width }: Square) {
  return width * width;
}

function getRightTriangleArea({ base, height }: RightTriangle) {
  return (base * height) / 2;
}

function getArea(shape: ValidShapes) {
  switch (shape.type) {
    case "circle":
      return getCircleArea(shape);
    case "rectangle":
      return getRectangleArea(shape);
    case "square":
      return getSquareArea(shape);
    case "rightTriangle":
      return getRightTriangleArea(shape);
    default:
      throw new Error("Unknown shape.");
  }
}

const circle: Circle = { type: "circle", radius: 4 };
circle.area = getArea(circle);
console.log(circle);

const rectangle: Rectangle = { type: "rectangle", length: 7, width: 4 };
rectangle.area = getArea(rectangle);
console.log(rectangle);

const square: Square = { type: "square", width: 5 };
square.area = getArea(square);
console.log(square);

const rightTriangle: RightTriangle = {
  type: "rightTriangle",
  base: 9,
  height: 4,
};
rightTriangle.area = getArea(rightTriangle);
console.log(rightTriangle);
