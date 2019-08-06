window.onload = function() {
  var obj1 = {c:'apple'};
  var obj2 = {};
  obj1.a = obj2;
  obj2.b = obj1;
  // debugger;
  // var copy = _.cloneDeep(obj1);

  var obj3 = {};
  var testArr = [];;
  testArr.length = 205;
  for (let index = 0; index < 205; index++) {
    obj3[String(index)] = {[`${index}e`]:index};
  }
  console.info(obj3);
  var copy = _.cloneDeep(obj3);
  // console.info("copy2", copy2);

};
