class Vector {
  /**
   * 两个向量相加，会返回一个新的向量，不影响原向量
   * @param {*} v1
   * @param {*} v2
   */
  static add(v1, v2) {
    if (v1 instanceof Vector && v2 instanceof Vector) {
      const x = v1.x + v2.x;
      const y = v1.y + v2.y;
      const z = v1.z + v2.z;
      return new Vector(x, y, z);
    }
    console.warn("invalid params");
  }

  // 两个向量减法
  static sub(v1, v2) {
    if (v1 instanceof Vector && v2 instanceof Vector) {
      const x = v1.x - v2.x;
      const y = v1.y - v2.y;
      const z = v1.z - v2.z;
      return new Vector(x, y, z);
    }
    console.warn("invalid params");
  }
  // 两个向量乘法
  static mult(v1, v2) {
    let x = 0,
      y = 0,
      z = 0;
    if (v1 instanceof Vector && v2 instanceof Vector) {
      x = v1.x * v2.x;
      y = v1.y * v2.y;
      z = v1.z * v2.z;
      return new Vector(x, y, z);
    }

    if (v1 instanceof Vector && v2 instanceof Array) {
      const [x2, y2, z2] = v2;
      if (v2.length === 1) {
        x = v1.x * x2;
        y = v1.y * x2;
        z = v1.z * x2;
      }
      if (v2.length === 2) {
        x = v1.x * x2;
        y = v1.y * y2;
      }
      if (v2.length === 3) {
        x = v1.x * x2;
        y = v1.y * y2;
        z = v1.z * z2;
      }
      return new Vector(x, y, z);
    }

    if (v1 instanceof Array && v2 instanceof Vector) {
      const [x1, y1, z1] = v1;
      if (v2.length === 1) {
        x = v2.x * x1;
        y = v2.y * x1;
        z = v2.z * x1;
      }
      if (v2.length === 2) {
        x = v2.x * x1;
        y = v2.y * y1;
      }
      if (v2.length === 3) {
        x = v2.x * x1;
        y = v2.y * y1;
        z = v2.z * z1;
      }
      return new Vector(x, y, z);
    }

    console.warn("invalid params");
  }
  // 两个向量除法
  static div(v1, v2) {
    let x = 0,
      y = 0,
      z = 0;
    if (v1 instanceof Vector && v2 instanceof Vector) {
      if (v2.x === 0 || v2.y === 0 || v2.z === 0) {
        console.warn("Vector.prototype.div:", "divide by 0");
        return;
      }
      x = v1.x / v2.x;
      y = v1.y / v2.y;
      z = v1.z / v2.z;
      return new Vector(x, y, z);
    }

    if (v1 instanceof Vector && v2 instanceof Array) {
      if (v2.includes(0)) {
        console.warn("Vector.prototype.div:", "divide by 0");
        return;
      }
      const [x2, y2, z2] = v2;
      if (v2.length === 1) {
        x = v1.x / x2;
        y = v1.y / x2;
        z = v1.z / x2;
      }
      if (v2.length === 2) {
        x = v1.x / x2;
        y = v1.y / y2;
      }
      if (v2.length === 3) {
        x = v1.x / x2;
        y = v1.y / y2;
        z = v1.z / z2;
      }
      return new Vector(x, y, z);
    }

    if (v1 instanceof Array && v2 instanceof Vector) {
      if (v1.includes(0)) {
        console.warn("Vector.prototype.div:", "divide by 0");
        return;
      }
      const [x1, y1, z1] = v1;
      if (v2.length === 1) {
        x = v2.x / x1;
        y = v2.y / x1;
        z = v2.z / x1;
      }
      if (v2.length === 2) {
        x = v2.x / x1;
        y = v2.y / y1;
      }
      if (v2.length === 3) {
        x = v2.x / x1;
        y = v2.y / y1;
        z = v2.z / z1;
      }
      return new Vector(x, y, z);
    }

    console.warn("invalid params");
  }

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
