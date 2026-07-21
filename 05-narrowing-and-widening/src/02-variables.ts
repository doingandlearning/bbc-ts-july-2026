type Axis = "x" | "y" | "z";

type Vector3 = {
  x: { value: number };
  y: { value: number };
  z: { value: number };
};

function getComponent(vector: Vector3, axis: Axis) {
  if (axis === "x" || axis === "y" || axis === "z") {
    return vector[axis]["value"];
  }
  throw new Error("Vector and axis must meet contract.");
}

let vec = {
  x: { value: 10 },
  y: { value: 20 },
  z: { value: 30 },
};

// 1. Type the variable
// 2. `as` is casting the variables type - not typesafe by default - heavy hammer
// 3. Make the initial variable const
// 4. if block
// 5. as any ... opting out of typing! Silencing the type system

let axis = "x";

getComponent(vec, axis);

if (axis === "x" || axis === "y" || axis === "z") getComponent(vec, axis);
