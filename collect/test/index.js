window.onload = function() {
  function test1() {
    let a = [1,2,3],b = [5,6];
    let c = a.splice(1,0,...b);
    console.info('a',a);

  }

  function testObj() {
    const obj1 = {1:'1'};
    const obj2 = {'name':'tom'};
    const mark = Symbol('age');
    const obj3 = {[mark]:19};
    console.log(obj1);
    console.log(obj2);
    console.log(obj3);

  }
  function testObj2() {
    let obj = {};
    // obj.1 = '1';
    obj.name = 'tom';
    const mark = Symbol('age');
    obj.mark = 19;
    obj[mark] = 19;
    console.log(obj);
  }
  function testObjGet() {
    let obj = {};
    // obj.1 = '1';
    obj.name = 'tom';
    const mark = Symbol('age');
    obj.mark = 19;
    obj[mark] = 19;
    console.log(obj);
  }

  testObj2();
  testObjGet()

};
