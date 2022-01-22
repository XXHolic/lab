window.onload = function () {
  const page = {
    texture1: null,
    texture2: null,
    canvasObj: null,
    fadeOpacity: 0.9, // 每次透明度的变化基数
    init: function () {
      const canvasObj = new WebGL(670, 350);
      this.canvasObj = canvasObj;
      // const canvasObj = new WebGL(400, 300);
      canvasObj.attrs({ class: "demo-webgl" });
      document.querySelector("#demo").appendChild(canvasObj.node);
      // canvasObj.clear();
      const gl = canvasObj.context;
      if (!gl) {
        alert("浏览器不支持 WebGL");
        return;
      }
      this.gl = gl;
      // 背景纹理相关变量
      const vertices = [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1];
      // 1.0 - 2.0 * a_pos = [1, 1,  -1, 1,  1, -1,  1, -1,  -1, 1,  -1, -1];

      this.shaderProgram = this.createShaderProgram(
        gl,
        emptySource,
        emptyFragmentSource
      );
      this.quadBuffer = this.createBuffer(gl, new Float32Array(vertices));
      this.loadImage();
    },
    loadImage: function () {
      const gl = this.gl;
      let loadCount = 1;
      const img = new Image();
      img.onload = (e) => {
        this.texture1 = this.createTexture(gl, e.target);
        loadCount--;
        if (!loadCount) {
          this.draw();
        }
      };
      img.src = "./bg.png";
    },
    // 创建缓冲对象
    createBuffer: function (gl, data) {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return buffer;
    },
    // 缓冲并激活对应顶点属性
    bindEnableBuffer: function (gl, buffer, attribute, numComponents) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, numComponents, gl.FLOAT, false, 0, 0);
    },
    createTexture: function (gl, source) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      // 反转图片 Y 轴方向
      // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      // 纹理坐标水平填充 s
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      // 纹理坐标垂直填充 t
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      // 纹理放大处理
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // 纹理缩小处理
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // 图片数据赋给纹理对象
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        source
      );
      gl.bindTexture(gl.TEXTURE_2D, null);
      return texture;
    },
    activeBindTexture: function (gl, texture, unit) {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
    },
    /**
     * 缓冲索引数据
     * @param {*} gl WebGL 上下文
     * @param {*} data 索引数据
     */
    setIndexBuffers: function (gl, data) {
      // 创建空白的缓冲对象
      const buffer = gl.createBuffer();
      // 绑定目标
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
      // WebGL 不支持直接使用 JavaScript 原始数组类型，需要转换
      const dataFormat = new Uint16Array(data);
      // 初始化数据存储
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, dataFormat, gl.STATIC_DRAW);
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
    /**
     * 绘制
     * @param {*} gl WebGL 上下文
     * @param {*} shaderProgram 着色器程序
     */
    draw: function () {
      const gl = this.gl,
        program = this.shaderProgram;
      gl.useProgram(program.program);
      this.canvasObj.clear();
      this.activeBindTexture(gl, this.texture1, 1);
      this.bindEnableBuffer(gl, this.quadBuffer, program.a_pos, 2);
      gl.uniform1i(program.u_screen, 1);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    drawTexture: function (texture, opacity) {
      const gl = this.gl;
      const program = this.shaderProgram;
      gl.useProgram(program.program);
      this.bindEnableBuffer(gl, this.quadBuffer, program.a_pos, 2);
      // console.info("texture", texture);
      this.activeBindTexture(gl, texture, 2);
      gl.uniform1i(program.u_screen, 2);
      gl.uniform1f(program.u_opacity, opacity);

      // gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
  };

  page.init();
  // insertLink({ title: "JavaScript WebGL 图片透明处理", linkIndex: 115 });
};
