
window.onload = function() {

  function testObjBase() {
    const obj1 = {1:'1'};
    const obj2 = {'name':'Tom'};
    const mark = Symbol('age');
    const obj3 = {[mark]:19};
    console.log(obj1);
    console.log(obj2);
    console.log(obj3);

  }
  function testObjAdd() {
    let obj = {};
    // obj.1 = '1';
    obj.name = 'Tom';
    const mark = Symbol('age');
    obj.mark = 19;
    obj[mark] = 19;
    console.log(obj);
  }

  function testObjGet() {
    let obj = {};
    obj.name = 'Tom';
    const mark = Symbol('age');
    obj[mark] = 19;
    console.log(obj.name);
    console.log(obj.mark);
    console.log(obj[mark]);
  }

  function testObjDel() {
    let obj = {};
    obj.name = 'Tom';
    const mark = Symbol('age');
    obj[mark] = 19;
    delete obj.name;
    delete obj[mark];
    console.log(obj);
  }

  function testObjOrder() {
    let obj = {name:'Tom',1:'1'};
    const mark = Symbol('age');
    obj[mark] = 19;
    for (const ele of Object.keys(obj)) {
      console.log(ele);
    }

  }

  function testObjDel() {
    let obj = {};
    obj.name = 'Tom';
    const mark = Symbol('age');
    obj[mark] = 19;
    delete obj.name;
    delete obj[mark];
    console.log(obj);
  }

  // testObjBase();
  // testObjAdd();
  // testObjGet();
  // testObjOrder()
  // testObjDel()


  function testMapBase() {
    const m = new Map([
      [1,'1'],
      ['name','Tom'],
      [Symbol('age'),19],
      [{other:'play'},'basketball'],
    ]);
    console.log(m);
    console.log(m.size);
  }

  function testMapAdd() {
    const m = new Map();
    m.set(1,'1').set('name','Tom');
    const mark = Symbol('age');
    m.set(mark,19);
    const obj = {other:'play'};
    m.set(obj,'basketball');
    console.log(m);
  }

  function testMapGet() {
    const m = new Map();
    m.set(1,'1');
    m.set('name','Tom');
    const mark = Symbol('age');
    m.set(mark,19);
    const obj = {other:'play'};
    m.set(obj,'basketball');
    console.log(m.get('name'));
    console.log(m.get(mark));
    console.log(m.get(obj));
  }

  function testMapDele() {
    const m = new Map();
    m.set(1,'1');
    m.set('name','Tom');
    const mark = Symbol('age');
    m.set(mark,19);
    const obj = {other:'play'};
    m.set(obj,'basketball');
    console.log(m.delete('name'));
    console.log(m.delete(mark));
    console.log(m.delete(obj));
  }

  function testMapOrder() {
    const m = new Map([
      [1,'1'],
      ['name','Tom'],
      [Symbol('age'),19],
      [{other:'play'},'basketball'],
    ]);
    for (const ele of m.keys()) {
      console.log(ele);
  }
  }

  // testMapBase();
  // testMapAdd();
  // testMapGet()
  // testMapDele()
  // testMapOrder()


}