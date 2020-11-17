function isInstanceOf(obj, base) {
  try {
      return obj instanceof base;
  } catch (e) {
      return false;
  }
}

function getType(value) {
  return Object.prototype.toString.call(value);
}

function tryCatchWrap(fn) {
  try {
    fn()
  } catch (e) {
    throw e;
    // console.info(e)
    // console.info('exception type',Object.prototype.toString.call(e))
    // console.info('exception isInstanceOf Error',isInstanceOf(e, Error))
  }
}

window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.info(error)
  console.info('exception type',Object.prototype.toString.call(error))
  console.info('exception isInstanceOf Error',isInstanceOf(error, Error))
}

// window.onunhandledrejection = function(error) {
//   console.info('error',error)
// }

// EvalError
// tryCatchWrap(
//   function() {
//     new eval(); // 目前浏览器不抛 EvalError 了。
//   }
// )

// try {
//   throw new EvalError('Hello, EvalError');
// } catch (e) {
//   console.log(e instanceof EvalError); // true
//   console.log(e.message);              // "Hello"
//   console.log(e.name);                 // "EvalError"
//   console.log(e.fileName);             // "someFile.js"
//   console.log(e.lineNumber);           // 10
//   console.log(e.columnNumber);         // 0
//   console.log(e.stack);                // "@Scratchpad/2:2:9\n"
// }


// RangeError
// tryCatchWrap(function() {
//   const arr = new Array(-10)
// })

// try {
//   const arr = new Array(-10)
// } catch (e) {
//   throw e;
// }

// ReferenceError
tryCatchWrap(function() {
  let a = undefinedVariable
})

// SyntaxError
// tryCatchWrap(function() {
//   eval('hello syntax')
// })

// TypeError
// tryCatchWrap(function() {
  // const a = 'hell';
  // a.fun();
// })

// URIError
// tryCatchWrap(function() {
//   decodeURIComponent('%')
// })

// AggregateError
// Promise.any([
//   Promise.reject(new Error("some error")),
// ]).catch(e => {
//   // console.info({e})
//   throw e;
// });


