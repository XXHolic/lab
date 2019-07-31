window.onload = function() {
  var obj1 = {};
  var obj2 = {};
  obj1.a = obj2;
  obj2.b = obj1;

  var copy = _.cloneDeep(obj1);

  console.info("copy", copy);

};
