window.onload = function () {
  const page = {
    init: function () {
      const canvasObj = new WebGL();
      // const canvasObj = new WebGL(150, 75);
      canvasObj.attrs({ class: "demo-webgl" });
      document.querySelector("#demo").appendChild(canvasObj.node);
      const glContext = canvasObj.context;

      if (!glContext) {
        alert("浏览器不支持 WebGL");
        return;
      }

      let vertices = [0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0]; // 三角形

      let colors = [
        1.0,
        0.0,
        0.0,
        1.0, // red
        0.0,
        1.0,
        0.0,
        1.0, // green
        0.0,
        0.0,
        1.0,
        1.0, // blue
      ];
      // 顶点着色器 glsl 代码
      const source = `
        attribute vec3 vertexPos;
        attribute vec4 vertexColor;

        varying vec4 vColor;
        void main(void){
          gl_Position = vec4(vertexPos, 1);
          vColor = vertexColor;
        }
      `;
      const vertexShader = this.loadShader(
        glContext,
        glContext.VERTEX_SHADER,
        source
      );
      const fragmentSource = `
        precision highp float;
        varying vec4 vColor;

        int findMax(float r, float g, float b) {
            if (r > g && r > b) {
                return 0;
            }
            if (g > r && g > b) {
                return 1;
            }
            return 2;
        }

        void main(void){
          float red = vColor.r;
          float green = vColor.g;
          float blue = vColor.b;
          int max = findMax(red, green, blue);
          vec4 finalColor = vColor;
          if (max == 0) {
              finalColor = vec4(1.0, 0.0, 0.0, 1.0);
          }
          else if (max == 1) {
              finalColor = vec4(0.0, 1.0, 0.0, 1.0);
          }
          else if (max == 2) {
              finalColor = vec4(0.0, 0.0, 1.0, 1.0);
          }
          gl_FragColor = finalColor;
        }
      `;
      const fragmentShader = this.loadShader(
        glContext,
        glContext.FRAGMENT_SHADER,
        fragmentSource
      );
      const shaderProgram = this.initShaderProgram(
        glContext,
        vertexShader,
        fragmentShader
      );
      this.setBuffers(glContext, shaderProgram, vertices);
      this.setColorBuffers(glContext, shaderProgram, colors);
      this.draw(glContext);
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
    setColorBuffers: function (gl, shaderProgram, vertexData) {
      // 创建空白的缓冲对象
      const buffer = gl.createBuffer();
      // 绑定目标
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      // WebGL 不支持直接使用 JavaScript 原始数组类型，需要转换
      const dataFormat = new Float32Array(vertexData);
      // 初始化数据存储
      gl.bufferData(gl.ARRAY_BUFFER, dataFormat, gl.DYNAMIC_DRAW);

      // 获取对应数据索引
      const vertexPos = gl.getAttribLocation(shaderProgram, "vertexColor");
      // 解析顶点数据
      gl.vertexAttribPointer(vertexPos, 4, gl.FLOAT, false, 0, 0);
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
      let drawType = type ? type : gl.TRIANGLES; // LINE_STRIP  LINE_LOOP
      // 绘制
      gl.drawArrays(drawType, 0, 3); // LINE_LOOP LINE_STRIP
    },
  };

  page.init();
  insertLink({ title: "JavaScript WebGL 设置颜色", linkIndex: 112 });
};
