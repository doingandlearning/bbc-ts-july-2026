import { location, company } from "./utils.js"
import fs from "node:fs"

console.log({ location, company })
console.log(fs.readFileSync(import.meta.filename, "utf-8"))
