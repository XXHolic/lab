"use strict";

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  console.info("_possibleConstructorReturn", self, call);
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

// 获取对象原型
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

/**
 *
 * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
 * @param {*} superClass
 */
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  // 没有这一步的话，就拿不到父类的属性
  if (superClass) _setPrototypeOf(subClass, superClass);
}

// 设置对象原型
function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

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

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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

var Apple =
  /*#__PURE__*/
  (function(_Fruit) {
    _inherits(Apple, _Fruit);

    function Apple(name, color) {
      var _this;

      _classCallCheck(this, Apple);

      console.info(this);
      console.info(_getPrototypeOf(Apple).call(this, name));
      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(Apple).call(this, name)
      );
      _this.color = color;
      return _this;
    }

    _createClass(Apple, [
      {
        key: "showColor",
        value: function showColor() {
          console.info("Apple Color:", this.color);
        }
      }
    ]);

    return Apple;
  })(Fruit);

var apple = new Apple("apple", "green");
console.info("apple:", apple);
apple.showName();
apple.showColor();
