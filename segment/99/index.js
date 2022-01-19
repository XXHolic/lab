window.onload = function () {
  const page = {
    texture1: null,
    texture2: null,
    canvasObj: null,
    fadeOpacity: 0.9, // 每次透明度的变化基数
    init: function () {
      const canvasObj = new WebGL(300, 300);
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
      const vertices = [
        0.2, 0.2, 0.0, -0.2, 0.2, 0.0, -0.2, -0.2, 0.0, 0.2, -0.2, 0.0,
      ]; // 矩形
      const indexData = [0, 1, 2, 0, 2, 3]; // 索引，公用的
      const texCoords = [
        1.0,
        1.0, // 右上角
        0.0,
        1.0, // 左上角
        0.0,
        0.0, // 左下角
        1.0,
        0.0, // 右下角
      ];

      // 顶点着色器 glsl 代码
      const source = `
        precision highp float;
        attribute vec3 aVertexPos;
        attribute vec2 aVertexTextureCoord;

        varying highp vec2 vTextureCoord;
        void main(void){
          gl_Position = vec4(aVertexPos, 1);
          vTextureCoord = aVertexTextureCoord;
        }
      `;

      const fragmentSource = `
        precision highp float;
        varying highp vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform float uOpacity;

        void main(void){
          vec4 color = texture2D(uSampler, vTextureCoord);
          gl_FragColor = vec4(floor(255.0 * color * uOpacity) / 255.0);
        }
      `;

      const program = this.createShaderProgram(gl, source, fragmentSource);
      this.shaderProgram = program;
      // 顶点缓冲
      const verticesBuffer = this.createBuffer(gl, new Float32Array(vertices));
      this.bindEnableBuffer(gl, verticesBuffer, program.aVertexPos, 3);
      // 索引缓冲
      this.setIndexBuffers(gl, indexData);
      // 纹理坐标缓冲
      const texCoordsBuffer = this.createBuffer(
        gl,
        new Float32Array(texCoords)
      );
      this.bindEnableBuffer(
        gl,
        texCoordsBuffer,
        program.aVertexTextureCoord,
        2
      );
      // 帧缓冲
      this.framebuffer = gl.createFramebuffer();
      this.screenTexture = util.createTexture(
        gl,
        gl.NEAREST,
        emptyPixels,
        gl.canvas.width,
        gl.canvas.height
      );

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
      img.src = "./person.png";

      const img2 = new Image();
      img2.onload = (e) => {
        this.texture2 = this.createTexture(gl, e.target);
        loadCount--;
        if (!loadCount) {
          this.draw();
        }
      };
      // img2.src = "./person.png";
    },
    /**
     *
     * @param {*} gl
     * @param {*} framebuffer 帧缓冲对象
     * @param {*} texture 纹理
     */
    bindFramebuffer: function (gl, framebuffer, texture) {
      // 将纹理对象关联到帧缓冲区对象
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      if (texture) {
        // 使用绑定的目标，将创建的纹理对象指定为帧缓冲区的颜色关联对象
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          texture,
          0
        );
      }
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
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
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
      // 这个就让绘制的目标变成了帧缓冲区
      this.bindFramebuffer(gl, this.framebuffer, this.texture1);
      this.drawTexture(this.texture1, this.fadeOpacity);
      // gl.enable(gl.BLEND);
      // 权重都是源颜色的透明度，第一个参数假设是 a，第二个就是 1-a
      // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      // 这个会让绘制的目标变成了颜色缓冲区
      this.bindFramebuffer(gl, null);
      this.drawTexture(this.texture1, 1);
      // gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    },
    drawTexture: function (texture, opacity) {
      const gl = this.gl;
      const program = this.shaderProgram;
      gl.useProgram(program.program);

      this.activeBindTexture(gl, texture, 1);
      gl.uniform1i(program.uSampler, 1);
      gl.uniform1f(program.uOpacity, opacity);

      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    },
  };

  page.init();
  // insertLink({ title: "JavaScript WebGL 图片透明处理", linkIndex: 115 });
};
