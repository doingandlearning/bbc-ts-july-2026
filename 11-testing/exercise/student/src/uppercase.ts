export default function uppercase(str: string) {
  if (typeof str !== "string") throw Error("input must be a string");
  return str.toUpperCase();
}
