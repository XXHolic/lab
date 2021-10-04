/* eslint-disable */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.
Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */
class MathCalculate {
  constructor(check = true) {
    this._boundaryCheckingState = check;
    this.float2Fixed = this.float2Fixed.bind(this);
    this.times = this.times.bind(this);
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
    this.divide = this.divide.bind(this);
    this.round = this.round.bind(this);
    this.checkBoundary = this.checkBoundary.bind(this);
  }

  spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  }

  /**
   * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
   * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
   */
  /**
   * 把错误的数据转正
   * strip(0.09999999999999998)=0.1
   */
  strip(num, precision) {
    if (precision === void 0) {
      precision = 15;
    }
    return +parseFloat(Number(num).toPrecision(precision));
  }

  /**
   * Return digits length of a number
   * @param {*number} num Input number
   */
  digitLength(num) {
    // Get digit length of e
    var eSplit = num.toString().split(/[eE]/);
    var len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }

  /**
   * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
   * @param {*number} num 输入数
   */
  float2Fixed(num) {
    const { digitLength, strip } = this;
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    var dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }

  /**
   * 检测数字是否越界，如果越界给出提示
   * @param {*number} num 输入数
   */
  checkBoundary(num) {
    if (this._boundaryCheckingState) {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        console.warn(
          num +
            " is beyond boundary when transfer to integer, the results may not be accurate"
        );
      }
    }
  }

  /**
   * 精确乘法
   */
  times(num1, num2) {
    var others = [];
    const { spreadArrays, float2Fixed, digitLength, checkBoundary } = this;
    for (var _i = 2; _i < arguments.length; _i++) {
      others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
      return times.apply(
        this,
        spreadArrays([times(num1, num2), others[0]], others.slice(1))
      );
    }
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    var baseNum = digitLength(num1) + digitLength(num2);
    var leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }

  /**
   * 精确加法
   */
  plus(num1, num2) {
    const { spreadArrays, times, digitLength, plus } = this;

    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
      return plus.apply(
        this,
        spreadArrays([plus(num1, num2), others[0]], others.slice(1))
      );
    }
    var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
  }

  /**
   * 精确减法
   */
  minus(num1, num2) {
    const { spreadArrays, times, digitLength, minus } = this;

    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
      return minus.apply(
        this,
        spreadArrays([minus(num1, num2), others[0]], others.slice(1))
      );
    }
    var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
  }

  /**
   * 精确除法
   */
  divide(num1, num2) {
    const {
      spreadArrays,
      checkBoundary,
      strip,
      digitLength,
      float2Fixed,
      divide,
      times,
    } = this;

    var others = [];
    const {} = this;
    for (var _i = 2; _i < arguments.length; _i++) {
      others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
      return divide.apply(
        this,
        spreadArrays([divide(num1, num2), others[0]], others.slice(1))
      );
    }
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
    return times(
      num1Changed / num2Changed,
      strip(Math.pow(10, digitLength(num2) - digitLength(num1)))
    );
  }

  /**
   * 四舍五入
   */
  round(num, ratio) {
    const { divide, times } = this;
    var base = Math.pow(10, ratio);
    return divide(Math.round(times(num, base)), base);
  }

  /**
   * 是否进行边界检查，默认开启
   * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
   */
  enableBoundaryChecking(flag) {
    if (flag === void 0) {
      flag = true;
    }
    this._boundaryCheckingState = flag;
  }
}
if (window.MathLab) {
  console.warn("Repeated Global Variable");
} else {
  window.MathLab = new MathCalculate();
}
