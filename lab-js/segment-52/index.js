window.onload = function() {
  // 普通嵌套
  // ES5
  function find(value) {
    return {
      in: function(arr) {
        return {
          combine: function(obj) {
            const result = arr.indexOf(value);
            obj.index = result;
            return obj;
          }
        };
      }
    };
  }

  const data = find(6)
    .in([1, 2, 3, 4, 5, 6])
    .combine({});
  console.info("data:", data);

  // es2015
  const find2 = value => ({
    in: arr => ({
      combine: obj => {
        const result = arr.indexOf(value);
        obj.index = result;
        return obj;
      }
    })
  });

  const data2 = find2(6)
    .in([1, 2, 3, 4, 5, 6])
    .combine({});
  console.info("data:", data2);

  // 管道机制
  const plus = a => a + 1;
  const minus = a => a - 2;
  const multi = a => a * 3;
  const div = a => a / 4;

  function pipeline() {
    for (var len = arguments.length, funcs = [], key = 0; key < len; key++) {
      funcs[key] = arguments[key];
    }

    return function(val) {
      var result = funcs.reduce(function(a, b) {
        return b(a);
      }, val);
      return result;
    };
  }

  var cal = pipeline(plus, minus, multi, div);
  var res = cal(5);
  console.info("data:", res);

  const pipeline2 = (...funcs) => val =>
    funcs.reduce(function(a, b) {
      return b(a);
    }, val);

  var cal2 = pipeline2(plus, minus, multi, div);
  var res2 = cal2(5);
  console.info("data:", res2);
};
