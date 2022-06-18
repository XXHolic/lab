const m3 = {
  // 单位矩阵
  identity: function () {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  },
  // 位移矩阵
  translation: (tx, ty) => {
    const x = Number(tx),
      y = Number(ty);
    // prettier-ignore
    return [
      1, 0, 0,
      0, 1, 0,
      x, y, 1,
    ];
  },
  // 缩放矩阵
  scaling: (sx, sy) => {
    const x = Number(sx),
      y = Number(sy);
    // prettier-ignore
    return [
      x, 0, 0,
      0, y, 0,
      0, 0, 1,
    ];
  },
  // 旋转矩阵
  rotation: (angle) => {
    const radian = (Math.PI * angle) / 180.0; // Convert to radians
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    // prettier-ignore
    return [
      c, s, 0,
     -s, c, 0,
      0, 0, 1
    ];
  },
  multiply: function (a, b) {
    var a00 = a[0 * 3 + 0];
    var a01 = a[0 * 3 + 1];
    var a02 = a[0 * 3 + 2];
    var a10 = a[1 * 3 + 0];
    var a11 = a[1 * 3 + 1];
    var a12 = a[1 * 3 + 2];
    var a20 = a[2 * 3 + 0];
    var a21 = a[2 * 3 + 1];
    var a22 = a[2 * 3 + 2];
    var b00 = b[0 * 3 + 0];
    var b01 = b[0 * 3 + 1];
    var b02 = b[0 * 3 + 2];
    var b10 = b[1 * 3 + 0];
    var b11 = b[1 * 3 + 1];
    var b12 = b[1 * 3 + 2];
    var b20 = b[2 * 3 + 0];
    var b21 = b[2 * 3 + 1];
    var b22 = b[2 * 3 + 2];
    return [
      b00 * a00 + b01 * a10 + b02 * a20,
      b00 * a01 + b01 * a11 + b02 * a21,
      b00 * a02 + b01 * a12 + b02 * a22,
      b10 * a00 + b11 * a10 + b12 * a20,
      b10 * a01 + b11 * a11 + b12 * a21,
      b10 * a02 + b11 * a12 + b12 * a22,
      b20 * a00 + b21 * a10 + b22 * a20,
      b20 * a01 + b21 * a11 + b22 * a21,
      b20 * a02 + b21 * a12 + b22 * a22,
    ];
  },
  translate: function (m, data) {
    const [tx, ty] = data;
    return m3.multiply(m, m3.translation(tx, ty));
  },

  rotate: function (m, angle) {
    return m3.multiply(m, m3.rotation(angle));
  },

  scale: function (m, data) {
    const [sx, sy] = data;
    return m3.multiply(m, m3.scaling(sx, sy));
  },
};
