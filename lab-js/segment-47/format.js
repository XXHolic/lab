"use strict";
/**
 * 对象的 Symbol.hasInstance 属性，指向一个内部方法。
 * 当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法。
 * 比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
 */
function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

// 防止直接当方法调用
function _classCallCheck(instance, Constructor) {
  // 判断 instance 是否为 Constructor 的实例
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 *
 * Object.defineProperty 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。
 *
 */
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  // 静态方法直接放在构造函数上
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Fruit =
  /*#__PURE__*/
  (function() {
    function Fruit(name) {
      _classCallCheck(this, Fruit);

      this.name = name;
    }

    _createClass(Fruit, [
      {
        key: "showName",
        value: function showName() {
          console.info("Fruit Name:", this.name);
        }
      }
    ]);

    return Fruit;
  })();

  var apple =  new Fruit("apple");
  console.info(apple);
