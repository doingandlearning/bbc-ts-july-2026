// @ts-check
const PI = Math.PI;

/** @type {CircleAreaFn} */
function getCircleArea(radius) {
  return radius * radius * PI;
}

/** @type {RectangleAreaFn} */
function getRectangleArea(length, width) {
  return length * width;
}

/** @type {SquareAreaFn} */
function getSquareArea(width) {
  return getRectangleArea(width, width);
}

/** @type {RightTriangleAreaFn} */
function getRightTriangleArea(base, height) {
  return (base * height) / 2;
}

/** @type {AreaFn} */
function getArea(shape) {
  switch (shape.type) {
    case "circle":
      shape.area = getCircleArea(shape.radius);
      break;
    case "rectangle":
      shape.area = getRectangleArea(shape.length, shape.width);
      break;
    case "square":
      shape.area = getSquareArea(shape.width);
      break;
    case "rightTriangle":
      shape.area = getRightTriangleArea(shape.base, shape.height);
      break;
  }
}

/** @type {Circle} */
const circle = { type: "circle", radius: 4 };
getArea(circle);
console.log(circle);

/** @type {Rectangle} */
const rectangle = { type: "rectangle", length: 7, width: 4 };

getArea(rectangle);
console.log(rectangle);

/** @type {Square} */
const square = { type: "square", width: 5 };
getArea(square);
console.log(square);

/** @type {RightTriangle} */
const rightTriangle = { type: "rightTriangle", base: 9, height: 4 };
getArea(rightTriangle);
console.log(rightTriangle);

let number = 6;
