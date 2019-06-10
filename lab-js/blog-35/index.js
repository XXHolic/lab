window.onload = function() {
  var x = 1;
  function* foo() {
    x++;
    yield;
    x++;
    return x;
  }

  var it = foo();
  console.info("it:", it);
  var firstNext = it.next();
  console.log("firstNext:", firstNext);
  console.log("x:", x);
  var secondNext = it.next();
  console.log("secondNext:", secondNext);
  console.log("x:", x);
  var thirdNext = it.next();
  console.log("thirdNext:", thirdNext);
  console.log("x:", x);

  function* noYield() {
    console.info("done");
  }

  var gene = noYield();
  gene.next();

  // function *demo() {
  //   var b = 2 + (yield);
  //   var a = 2 + yield; // Uncaught SyntaxError: Unexpected identifier
  //   return a+b;
  // }

  function* calculate(x) {
    var y = 2 * (yield x);
    var z = 3 * (yield y);
    return y + z;
  }
  var a = calculate(2);
  console.info(a.next());
  console.info(a.next());
  console.info(a.next());

  var b = calculate(2);
  console.info(b.next());
  console.info(b.next(2));
  console.info(b.next(3));

  function* foo() {
    yield 1;
    yield 2;
  }

  function* something() {
    yield* foo();
    yield 3;
  }

  var gene = something();
  console.info(gene.next().value);
  console.info(gene.next().value);
  console.info(gene.next().value);

  var getJSONData = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        init.next(JSON.parse(xhr.responseText));
      } else {
        new Error(xhr.statusText);
      }
    };

    xhr.open("GET", url);
    xhr.send();
  };

  function* main() {
    try {
      var data = yield getJSONData("./data.json");
      console.info("data:", data);
    } catch (error) {
      console.error(error);
    }
  }

  var init = main();
  init.next();
};
