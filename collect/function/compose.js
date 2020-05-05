function compose(...funcs) {
  if (funcs.length === 0) {
      // infer the argument type so it is usable in inference down the line
      return (arg) => arg;
  }
  if (funcs.length === 1) {
      return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function a(...args) {
  console.info('a',...args);
}

function b(...args) {
  console.info('b',...args);
}

function c(...args) {
  console.info('c',...args);
}

compose(a,b,c)('1','2','3')