window.onload = function () {
  const page = {
    canvasObj: null,
    transformData: [0, 0],
    init: function () {
      const canvasObj = new WebGL(400, 300);
      this.canvasObj = canvasObj;
      document.querySelector("#demo").appendChild(canvasObj.node);
      const gl = canvasObj.context;
      if (!gl) {
        alert("浏览器不支持 WebGL");
        return;
      }
      this.gl = gl;

      const source = `
        attribute vec2 aVertexPos;
        uniform mat3 uMatrix;

        void main(void){
          // 二维位移的顶点坐标第三个分量必须是 1 ，否则得到的结果就不对
          vec3 position = uMatrix * vec3(aVertexPos, 1);
          gl_Position = vec4(position.xyz, 1.0);
        }
      `;
      const fragmentSource = `
        void main(void){
          gl_FragColor = vec4(1.0, 0.5, 0.2, 1.0);
        }
      `;

      this.shaderProgram = this.createShaderProgram(gl, source, fragmentSource);
      this.screenBuffer = this.initBuffersForScreen(gl);
      this.draw();
      this.pageEvent();
    },
    initBuffersForScreen: function (gl) {
      const vertices = new Float32Array([0, 0.3, -0.3, -0.3, 0.3, -0.3]); // 三角形

      const obj = {};
      obj.verticesBuffer = this.createBuffer(gl, gl.ARRAY_BUFFER, vertices);

      return obj;
    },
    // 创建缓冲对象
    createBuffer: function (gl, type, data) {
      const buffer = gl.createBuffer();
      gl.bindBuffer(type, buffer);
      gl.bufferData(type, data, gl.STATIC_DRAW);
      gl.bindBuffer(type, null);
      return buffer;
    },
    // 缓冲并激活对应顶点属性
    bindEnableBuffer: function (gl, buffer, attribute, numComponents) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, numComponents, gl.FLOAT, false, 0, 0);
    },
    activeBindTexture: function (gl, texture, unit) {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
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
    createShaderProgram: function (gl, vertexSource, fragmentSource) {
      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vertexSource);
      const fragmentShader = this.loadShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentSource
      );
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
      const wrapper = { program: shaderProgram };

      const numAttributes = gl.getProgramParameter(
        shaderProgram,
        gl.ACTIVE_ATTRIBUTES
      );
      for (let i = 0; i < numAttributes; i++) {
        const attribute = gl.getActiveAttrib(shaderProgram, i);
        wrapper[attribute.name] = gl.getAttribLocation(
          shaderProgram,
          attribute.name
        );
      }
      const numUniforms = gl.getProgramParameter(
        shaderProgram,
        gl.ACTIVE_UNIFORMS
      );
      for (let i = 0; i < numUniforms; i++) {
        const uniform = gl.getActiveUniform(shaderProgram, i);
        wrapper[uniform.name] = gl.getUniformLocation(
          shaderProgram,
          uniform.name
        );
      }

      return wrapper;
    },
    getTransform: function (tx, ty) {
      return [
        1,
        0,
        0, //
        0,
        1,
        0, //
        Number(tx),
        Number(ty),
        1,
      ];
    },
    /**
     * 绘制
     * @param {*} gl WebGL 上下文
     * @param {*} shaderProgram 着色器程序
     */
    draw: function () {
      const gl = this.gl;
      this.canvasObj.clear();
      const program = this.shaderProgram;
      const targetBuffer = this.screenBuffer;
      gl.useProgram(program.program);
      const [x, y] = this.transformData;
      const transformValue = this.getTransform(x, y);
      this.bindEnableBuffer(
        gl,
        targetBuffer.verticesBuffer,
        program.aVertexPos,
        2
      );
      gl.uniformMatrix3fv(program.uMatrix, false, transformValue);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    pageEvent: function () {
      const xEle = document.querySelector("#xTransform");
      const yEle = document.querySelector("#yTransform");
      xEle.onchange = (e) => {
        const value = e.target.value;
        console.info("水平位移：", value);
        const yValue = yEle.value;
        this.transformData = [value, yValue];
        this.draw();
      };
      yEle.onchange = (e) => {
        const value = e.target.value;
        console.info("垂直位移：", value);
        const xValue = xEle.value;
        this.transformData = [xValue, value];
        this.draw();
      };
    },
  };

  page.init();
  // insertLink({ title: "JavaScript WebGL 帧缓冲区对象", linkIndex: 116 });
};
