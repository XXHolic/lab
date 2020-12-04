function tryCatchWrap(fn) {
  try {
    fn()
  } catch (e) {
    // console.info('exception type',Object.prototype.toString.call(e))
    // console.info('exception isInstanceOf Error',isInstanceOf(e, Error))
    TraceKit.report(e);
    // setTimeout(() => {
      // TraceKit.report(e);
    // },0)

//     const err1 = {
//   message: 'Invalid array length',
//   stack: "RangeError: Invalid array lengthat http://localhost:6677/index.js:94:15at tryCatchWrap (http://localhost:6677/index.js:3:5)at http://localhost:6677/index.js:93:1"
// }

//     TraceKit.report(err1);
    // throw e;
    console.log({e});
    // console.log('message：',e.message);              //
    // console.log('name：',e.name);                 //
    // console.log('fileName：',e.fileName);             //
    // console.log('lineNumber：',e.lineNumber);           //
    // console.log('columnNumber：',e.columnNumber);         //
    // console.log('stack：',e.stack);
  }
}

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

// window.onerror = function(msg, url, lineNo, columnNo, error) {
//   console.info('-----msg：',msg)
//   console.info('-----url：',url)
//   console.info('--lineNo：',lineNo)
//   console.info('columnNo：',columnNo)
//   console.info('---error：',error)
//   // console.info('exception type',Object.prototype.toString.call(error))
//   // console.info('exception isInstanceOf Error',isInstanceOf(error, Error))
//   console.info('')
//   console.info('-----error.message：',error.message)
//   console.info('--------error.name：',error.name)
//   console.info('----error.fileName：',error.fileName);
//   console.info('--error.lineNumber：',error.lineNumber);
//   console.info('error.columnNumber：',error.columnNumber);
//   console.info('-------error.stack：',error.stack);
// }

// window.onunhandledrejection = function(error) {
//   console.info('error',error)
// }

// 针对静态资源加载处理
// window.addEventListener('error',function(error){
//   console.info('error',error)
//   const err = error.target.src || error.target.href
//   if(err){
//     // throw error;
//       // console.log('捕获到资源加载异常',err)
//   }
// },true)

TraceKit.report.subscribe(function yourLogger(errorReport) {
  console.info('errorReport',errorReport)
});

// Sentry.init({
//   dsn: "https://1ea46c0309124094908fa0eb69e21afb@o366923.ingest.sentry.io/5169726",
// });




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
tryCatchWrap(function() {
  const arr = new Array(-10)
})

// console.info('ddddd')


// ReferenceError
// tryCatchWrap(function() {
//   let a = undefinedVariable
// })

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


// DOMException
// var node = document.querySelector('#demo');
// var refnode = node.nextSibling;
// var newnode = document.createTextNode('这就是为何你挂了！');
// node.insertBefore(newnode, refnode);


// ErrorEvent
// const err = new ErrorEvent('ErrorEvent')
// throw err

// DOMError
// const err = new DOMError('DOMError');
// throw err;



// 模仿异常
// const err1 = {
//   message: 'Invalid array length',
//   stack: "RangeError: Invalid array lengthat http://localhost:6677/index.js:94:15at tryCatchWrap (http://localhost:6677/index.js:3:5)at http://localhost:6677/index.js:93:1"
// }
// const err2 = {
//   message: 'undefinedVariable is not defined',
//   stack: "ReferenceError: undefinedVariable is not defined at http://localhost:6677/index.js:102:11 at tryCatchWrap (http://localhost:6677/index.js:3:5)at http://localhost:6677/index.js:101:1"
// }
// TraceKit.report(err1)

// TraceKit.report(err2)