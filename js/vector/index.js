const _PI = Math.PI;

const constants = {
  RADIANS: "radians",
  DEG_TO_RAD: _PI / 180.0,
  RAD_TO_DEG: 180.0 / _PI,
  DEGREES: "degrees",
};

class Vector {
  /**
   * 向量初始化
   * @param {*} x
   * @param {*} y
   * @param {*} z
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this._angleMode = constants.RADIANS;
  }

  set(x, y, z) {
    if (x instanceof Vector) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      this.z = x[2] || 0;
      return this;
    }
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    return this;
  }

  toString() {
    return `Vector Object : [${this.x}, ${this.y}, ${this.z}]`;
  }

  copy() {
    return new Vector(this.x, this.y, this.z);
  }

  // 获取单位向量
  normalize() {
    const len = this.mag();
    // here we multiply by the reciprocal instead of calling 'div()'
    // since div duplicates this zero check.
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  // 获取向量的长度
  mag() {
    return Math.sqrt(this.magSq());
  }

  // 获取向量的长度的平方
  magSq() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    return x * x + y * y + z * z;
  }

  // 限制向量长度的最大值
  limit(max) {
    const mSq = this.magSq();
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)) //normalize it
        .mult(max);
    }
    return this;
  }

  _fromRadians(angle) {
    if (this._angleMode === constants.DEGREES) {
      return angle * constants.DEG_TO_RAD;
    }
    return angle;
  }
  // 获取向量水平方向的夹角
  heading() {
    const h = Math.atan2(this.y, this.x);
    return this._fromRadians(h);
  }

  /**
   * 向量自身的加法，会改变自身的值
   * @param {*} x
   * @param {*} y
   * @param {*} z
   * @returns
   */
  add(x, y, z) {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      this.z += x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      this.z += x[2] || 0;
      return this;
    }
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    return this;
  }

  /**
   * 向量自身的减法，会改变自身的值
   * @param {*} x
   * @param {*} y
   * @param {*} z
   * @returns
   */
  sub(x, y, z) {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      this.z -= x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      this.z -= x[2] || 0;
      return this;
    }
    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    return this;
  }

  /**
   * 向量自身的乘法，会改变自身的值
   * @param {*} x
   * @param {*} y
   * @param {*} z
   * @returns
   */
  mult(...rest) {
    const [x, y, z] = rest;
    if (x instanceof Vector) {
      if (
        Number.isFinite(x.x) &&
        Number.isFinite(x.y) &&
        Number.isFinite(x.z) &&
        typeof x.x === "number" &&
        typeof x.y === "number" &&
        typeof x.z === "number"
      ) {
        this.x *= x.x;
        this.y *= x.y;
        this.z *= x.z;
      } else {
        console.warn(
          "Vector.prototype.mult:",
          "x contains components that are either undefined or not finite numbers"
        );
      }
      return this;
    }
    if (x instanceof Array) {
      if (
        x.every((element) => Number.isFinite(element)) &&
        x.every((element) => typeof element === "number")
      ) {
        if (x.length === 1) {
          this.x *= x[0];
          this.y *= x[0];
          this.z *= x[0];
        } else if (x.length === 2) {
          this.x *= x[0];
          this.y *= x[1];
        } else if (x.length === 3) {
          this.x *= x[0];
          this.y *= x[1];
          this.z *= x[2];
        }
      } else {
        console.warn(
          "Vector.prototype.mult:",
          "x contains elements that are either undefined or not finite numbers"
        );
      }
      return this;
    }

    if (
      rest.every((element) => Number.isFinite(element)) &&
      rest.every((element) => typeof element === "number")
    ) {
      if (rest.length === 1) {
        this.x *= x;
        this.y *= x;
        this.z *= x;
      }
      if (rest.length === 2) {
        this.x *= x;
        this.y *= y;
      }
      if (rest.length === 3) {
        this.x *= x;
        this.y *= y;
        this.z *= z;
      }
    } else {
      console.warn(
        "Vector.prototype.mult:",
        "x, y, or z arguments are either undefined or not a finite number"
      );
    }
    return this;
  }

  /**
   * 向量自身的除法，会改变自身的值
   * @param {*} x
   * @param {*} y
   * @param {*} z
   * @returns
   */
  div(...rest) {
    const [x, y, z] = rest;
    if (x instanceof Vector) {
      if (
        Number.isFinite(x.x) &&
        Number.isFinite(x.y) &&
        Number.isFinite(x.z) &&
        typeof x.x === "number" &&
        typeof x.y === "number" &&
        typeof x.z === "number"
      ) {
        if (x.x === 0 || x.y === 0 || x.z === 0) {
          console.warn("Vector.prototype.div:", "divide by 0");
          return this;
        }
        this.x /= x.x;
        this.y /= x.y;
        this.z /= x.z;
      } else {
        console.warn(
          "Vector.prototype.div:",
          "x contains components that are either undefined or not finite numbers"
        );
      }
      return this;
    }
    if (x instanceof Array) {
      if (
        x.every((element) => Number.isFinite(element)) &&
        x.every((element) => typeof element === "number")
      ) {
        if (x.some((element) => element === 0)) {
          console.warn("Vector.prototype.div:", "divide by 0");
          return this;
        }

        if (x.length === 1) {
          this.x /= x[0];
          this.y /= x[0];
          this.z /= x[0];
        } else if (x.length === 2) {
          this.x /= x[0];
          this.y /= x[1];
        } else if (x.length === 3) {
          this.x /= x[0];
          this.y /= x[1];
          this.z /= x[2];
        }
      } else {
        console.warn(
          "Vector.prototype.div:",
          "x contains components that are either undefined or not finite numbers"
        );
      }

      return this;
    }

    if (
      rest.every((element) => Number.isFinite(element)) &&
      rest.every((element) => typeof element === "number")
    ) {
      if (rest.some((element) => element === 0)) {
        console.warn("Vector.prototype.div:", "divide by 0");
        return this;
      }

      if (arguments.length === 1) {
        this.x /= x;
        this.y /= x;
        this.z /= x;
      }
      if (arguments.length === 2) {
        this.x /= x;
        this.y /= y;
      }
      if (arguments.length === 3) {
        this.x /= x;
        this.y /= y;
        this.z /= z;
      }
    } else {
      console.warn(
        "Vector.prototype.div:",
        "x, y, or z arguments are either undefined or not a finite number"
      );
    }

    return this;
  }
}

/**
 * 两个向量相加，会返回一个新的向量，不影响原向量
 * @param {*} v1
 * @param {*} v2
 */
Vector.add = function add(...rest) {
  let [v1, v2, target] = rest;
  if (!target) {
    target = v1.copy();
    if (rest.length === 3) {
      console.warn(
        "The target parameter is undefined, it should be of type Vector",
        "Vector.add"
      );
    }
  } else {
    target.set(v1);
  }
  target.add(v2);
  return target;
};

// 两个向量减法
Vector.sub = function sub(...rest) {
  let [v1, v2, target] = rest;
  if (!target) {
    target = v1.copy();
    if (rest.length === 3) {
      console.warn(
        "The target parameter is undefined, it should be of type Vector",
        "Vector.sub"
      );
    }
  } else {
    target.set(v1);
  }
  target.sub(v2);
  return target;
};
// 两个向量乘法
Vector.mult = function mult(...rest) {
  let [v, n, target] = rest;
  if (!target) {
    target = v.copy();
    if (rest.length === 3) {
      console.warn(
        "The target parameter is undefined, it should be of type Vector",
        "Vector.mult"
      );
    }
  } else {
    target.set(v);
  }
  target.mult(n);
  return target;
};
// 两个向量除法
Vector.div = function div(...rest) {
  let [v, n, target] = rest;
  if (!target) {
    target = v.copy();

    if (rest.length === 3) {
      console.warn(
        "The target parameter is undefined, it should be of type Vector",
        "Vector.div"
      );
    }
  } else {
    target.set(v);
  }
  target.div(n);
  return target;
};
