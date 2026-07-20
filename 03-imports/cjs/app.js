const utils = require("./utils")
const fs = require("node:fs")

console.log(utils)
console.log(fs.readFileSync(__filename, "utf-8"))
