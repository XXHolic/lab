var babel = require("@babel/core");
var code = "()=>{let a=3;a++}";
babel.transform(code, {},function (err, result) {
  console.info('ddd');
  console.info('code',result.code);
  console.info('result', result.map);
  console.info('result', result.ast);
  // result; // => { code, map, ast }
});