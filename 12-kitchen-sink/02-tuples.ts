// Tuples
// (2,3) -> immutable!

type Point = readonly [number, number];
const point: Point = [10, 20];

type UserInfo = [name: string, age: number, email: string];
const user: UserInfo = ["Alice", 30, "alice@bbc.co.uk"];

type OptionalTuple = [string, number?];
const opt1: OptionalTuple = ["hello"];
const opt2: OptionalTuple = ["hello", 42];

// Rest elements
type StringNumberBooleans = [string, number, ...boolean[]];
const tuple1: StringNumberBooleans = ["hello", 42];
const tuple2: StringNumberBooleans = ["hello", 42, true, false, true];

function getCoordinates(): [number, number] {
  return [10, 20];
}
const [xCoord, yCoord] = getCoordinates();
