export type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

export function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      const exhaustive: never = shape;
      throw new Error(`Unhandled shape: ${exhaustive}`);
  }
}

export async function fetchArea(shape: Shape) {
  return area(shape);
}
