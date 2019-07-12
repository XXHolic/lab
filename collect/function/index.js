window.onload = function() {
  /**
   * 实现 sum 函数使得以下表达式的值正确
   * sum(1, 2, 3).sumOf(); //6
   * sum(2, 3)(2).sumOf(); //7
   * sum(1)(2)(3)(4).sumOf(); //10
   * sum(2)(4, 1)(2).sumOf(); //9
   */

  function sum(...args) {
    var result = args.reduce((pre, current) => {
      return pre + current;
    });

    var fn = function(...args2) {
      return sum(...args, ...args2);
    }

    fn.sumOf = function() {
      console.info(result);
      return result;
    };

    return fn;
  }

  sum(1, 2, 3).sumOf();
  sum(2, 3)(2).sumOf();
  sum(1)(2)(3)(4).sumOf();
  sum(2)(4, 1)(2).sumOf();

  // console.info(a.sumOf());
};
