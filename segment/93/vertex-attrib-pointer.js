window.onload = function () {
  let isHorizontal = false;
  const vertices = [-0.5, 0, 0.0, 0.5, 0, 0.0]; // 水平直线
  const vertices2 = [0, 0.5, 0.0, 0, -0.5, 0.0]; // 垂直直线
  const page = {
    init: function () {
      const canvasObj = document.querySelector("#demo");
      const glContext = canvasObj.getContext("webgl");

      if (!glContext) {
        alert("浏览器不支持 WebGL");
        return;
      }
      this.setBuffers(glContext, vertices);

      const vertexShader = this.createVertexShader(glContext);
      const fragmentShader = this.createFragmentShader(glContext);
      const shaderProgram = this.initShaderProgram(
        glContext,
        vertexShader,
        fragmentShader
      );
      // 获取对应数据索引
      const vertexPos = glContext.getAttribLocation(shaderProgram, "vertexPos");
      // 解析顶点数据
      glContext.vertexAttribPointer(vertexPos, 3, glContext.FLOAT, false, 0, 0);
      requestAnimationFrame(() => {
        this.draw(glContext, shaderProgram);
      });
    },
    /**
     * 设置缓冲
     * @param {*} gl
     * @param {*} vertexData
     */
    setBuffers: function (gl, vertexData) {
      // 已缓冲对象
      // const existBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
      // console.info("existBuffer: ", existBuffer);
      // 创建空白的缓冲对象
      const buffer = gl.createBuffer();
      // 绑定目标
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      // WebGL 不支持直接使用 JavaScript 原始数组类型，需要转换
      const dataFormat = new Float32Array(vertexData);
      // 初始化数据存储
      gl.bufferData(gl.ARRAY_BUFFER, dataFormat, gl.DYNAMIC_DRAW);
    },
    // 创建顶点着色器
    createVertexShader: function (gl) {
      // 顶点着色器 glsl 代码
      const source = `
        attribute vec3 vertexPos;
        void main(void){
          gl_Position = vec4(vertexPos, 1);
        }
      `;

      // 创建着色器
      const shader = gl.createShader(gl.VERTEX_SHADER);

      // 设置顶点着色器代码
      gl.shaderSource(shader, source);

      // 编译
      gl.compileShader(shader);

      // 判断是否编译成功
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("编译着色器报错: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    },
    // 片段着色器
    createFragmentShader: function (gl) {
      // 片段着色器 glsl 代码
      const source = `
        void main(void){
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `;

      // 创建着色器
      const shader = gl.createShader(gl.FRAGMENT_SHADER);

      // 设置片段着色器代码
      gl.shaderSource(shader, source);

      // 编译
      gl.compileShader(shader);

      // 判断是否编译成功
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("编译着色器报错: " + gl.getShaderInfoLog(shader));
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

      return shaderProgram;
    },
    // 绘制
    draw: function (gl, shaderProgram) {
      if (isHorizontal) {
        this.setBuffers(gl, vertices);
      } else {
        this.setBuffers(gl, vertices2);
      }
      isHorizontal = !isHorizontal;
      // 获取对应数据索引
      const vertexPos = gl.getAttribLocation(shaderProgram, "vertexPos");
      // 解析顶点数据
      // gl.vertexAttribPointer(vertexPos, 3, gl.FLOAT, false, 0, 0);
      // 启用顶点属性，顶点属性默认是禁用的。
      gl.enableVertexAttribArray(vertexPos);
      // 将定义好的对象添加到当前的渲染状态中。
      gl.useProgram(shaderProgram);
      // 绘制
      gl.drawArrays(gl.LINE_STRIP, 0, 2);
      // requestAnimationFrame(() => {
      //   this.draw(gl, shaderProgram);
      // });
    },
  };

  page.init();
  insertLink({ title: "JavaScript WebGL 绘制一条直线", linkIndex: 109 });
};
