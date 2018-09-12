var bebel = require("@babel/core");
import { transform } from "@babel/core";
import * as babel from "@babel/core";
var code = "()=>{console.info('babel.transform')}"
babel.transform(code, options, function (err, result) {
  console.info('code',result.code);
  console.info('result', result.map);
  console.info('result', result.ast);
  result; // => { code, map, ast }
});