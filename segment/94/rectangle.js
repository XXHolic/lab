window.onload = function () {
  const page = {
    init: function () {
      const canvasObj = new WebGL();
      canvasObj.attrs({ class: "demo-webgl" });
      document.querySelector("#demo").appendChild(canvasObj.node);
      const gl = canvasObj.context;
      if (!gl) {
        alert("浏览器不支持 WebGL");
        return;
      }

      let vertices = [
        0.5,
        0.5,
        0.0,
        -0.5,
        0.5,
        0.0,
        -0.5,
        -0.5,
        0.0, // 第一个三角形
        -0.5,
        -0.5,
        0.0,
        0.5,
        -0.5,
        0.0,
        0.5,
        0.5,
        0.0, // 第二个三角形
      ]; // 矩形

      // 顶点着色器 glsl 代码
      const source = `
        attribute vec3 vertexPos;

        void main(void){
          gl_Position = vec4(vertexPos, 1);
        }
      `;
      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, source);
      const fragmentSource = `
        void main(void){
          gl_FragColor = vec4(1.0, 0.5, 0.2, 1.0);
        }
      `;
      const fragmentShader = this.loadShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentSource
      );
      const shaderProgram = this.initShaderProgram(
        gl,
        vertexShader,
        fragmentShader
      );
      this.setBuffers(gl, shaderProgram, vertices);
      this.draw(gl);
    },
    /**
     * 设置缓冲
     * @param {*} gl
     * @param {*} vertexData
     */
    setBuffers: function (gl, shaderProgram, vertexData) {
      // 创建空白的缓冲对象
      const buffer = gl.createBuffer();
      // 绑定目标
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      // WebGL 不支持直接使用 JavaScript 原始数组类型，需要转换
      const dataFormat = new Float32Array(vertexData);
      // 初始化数据存储
      gl.bufferData(gl.ARRAY_BUFFER, dataFormat, gl.DYNAMIC_DRAW);

      // 获取对应数据索引
      const vertexPos = gl.getAttribLocation(shaderProgram, "vertexPos");
      // 解析顶点数据
      gl.vertexAttribPointer(vertexPos, 3, gl.FLOAT, false, 0, 0);
      // 启用顶点属性，顶点属性默认是禁用的。
      gl.enableVertexAttribArray(vertexPos);
    },
    loadShader: function (gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("着色器编译失败: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    },
    // 初始化整个着色器程序
    initShaderProgram: function (gl, vertexShader, fragmentShader) {
      // 创建着色器对象
      const shaderProgram = gl.createProgram();
      // 添加着色器
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      // 多个着色器合并链接
      gl.linkProgram(shaderProgram);
      // 创建是否成功检查
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("无法初始化着色器程序: " + gl.getProgramInfoLog(shaderProgram));
        return null;
      }
      // 将定义好的对象添加到当前的渲染状态中。
      gl.useProgram(shaderProgram);
      return shaderProgram;
    },
    // 绘制
    draw: function (gl, type) {
      let drawType = type ? type : gl.TRIANGLES; // LINE_LOOP
      gl.drawArrays(drawType, 0, 6);
    },
  };

  page.init();
  // insertLink({ title: "JavaScript WebGL 基础疑惑点", linkIndex: 110 });
};
