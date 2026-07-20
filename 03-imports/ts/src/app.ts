import { location, company } from "./utils.js";
import utils from "./utils.js";
import data from "./user.json" with { type: "json" };

import fs from "node:fs";
import { type VALID_URL_VALUE, printHello } from "./types.js";

console.log({ location, company }, utils.location);
console.log(fs.readFileSync(import.meta.filename, "utf-8"));

const field: VALID_URL_VALUE = "Kevin";
printHello();

console.log(`Hello ${data[0]?.name}`);
