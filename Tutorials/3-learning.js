// for export we have to use "module.export = "file name""
// for import we have to use "require("file path")"

const sayHi = require("./5-utils");
const names = require("./4-name").default;

sayHi(names.john);
