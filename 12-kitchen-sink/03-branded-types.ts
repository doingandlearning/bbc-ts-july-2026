// TypeScript is structural by default - two `string`s are interchangeable no
// matter what you call them. Branded types attach a type-only property to
// force the compiler to treat otherwise-identical primitives as distinct.

type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

const userId: UserId = "kevin";
const productId: ProductId = "iPod";

function lookUpProduct(productId: ProductId) {
  return true;
}

type Meters = Brand<number, "Meters">;
type Seconds = Brand<number, "Seconds">;

function createMeters(value: number): Meters {
  return value as Meters;
}
function createSeconds(value: number): Seconds {
  return value as Seconds;
}
function calculateSpeed(distance: Meters, time: Seconds): number {
  return distance / time;
}

const distance = createMeters(100);
const time = createSeconds(10);
const speed = calculateSpeed(distance, time);
