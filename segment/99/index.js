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
      // 背景纹理相关变量
      const vertices = [
        0.0, 0.2, 0.0, -0.2, 0.2, 0.0, -0.2, -0.2, 0.0, 0.0, -0.2, 0.0,
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
      // 这个是为了在后面重复使用，先创建好这个对象。
      this.quadBuffer = this.createBuffer(gl, new Float32Array([]));
      this.setIndexBuffers(gl, indexData);
      this.bindEnableBuffer(gl, this.quadBuffer, program.aVertexPos, 3);
      this.bindEnableBuffer(gl, this.quadBuffer, program.aVertexPos, 3);

      // this.setBuffers(gl, shaderProgram, vertices);
      // this.setTextureBuffers(gl, shaderProgram, texCoords);
      // this.loadImage(gl, shaderProgram);
      // this.pageEvent(gl, shaderProgram);
    },
    loadImage: function (gl, shaderProgram) {
      let loadCount = 2;
      const img = new Image();
      img.onload = (e) => {
        this.texture1 = this.createTexture(gl, e.target);
        loadCount--;
        if (!loadCount) {
          this.draw(gl, shaderProgram);
        }
      };
      img.src = "./person.png";

      const img2 = new Image();
      img2.onload = (e) => {
        this.texture2 = this.createTexture(gl, e.target);
        loadCount--;
        if (!loadCount) {
          this.draw(gl, shaderProgram);
        }
      };
      img2.src = "./person.nng";
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
     * 缓冲纹理坐标数据
     * @param {*} gl WebGL 上下文
     * @param {*} shaderProgram 着色器程序
     * @param {*} data 纹理坐标数据
     */
    setTextureBuffers: function (gl, shaderProgram, data) {
      // 创建空白的缓冲对象
      const buffer = gl.createBuffer();
      // 绑定目标
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      // WebGL 不支持直接使用 JavaScript 原始数组类型，需要转换
      const dataFormat = new Float32Array(data);
      // 初始化数据存储
      gl.bufferData(gl.ARRAY_BUFFER, dataFormat, gl.STATIC_DRAW);

      // 获取对应数据索引
      const texCoord = gl.getAttribLocation(
        shaderProgram,
        "aVertexTextureCoord"
      );
      // 解析顶点数据
      gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 0, 0);
      // 启用顶点属性，顶点属性默认是禁用的。
      gl.enableVertexAttribArray(texCoord);
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
      gl.bufferData(gl.ARRAY_BUFFER, dataFormat, gl.STATIC_DRAW);

      // 获取对应数据索引
      const vertexPos = gl.getAttribLocation(shaderProgram, "aVertexPos");
      // 解析顶点数据
      gl.vertexAttribPointer(vertexPos, 3, gl.FLOAT, false, 16, 0);
      // 启用顶点属性，顶点属性默认是禁用的。
      gl.enableVertexAttribArray(vertexPos);
      // 区分使用纹理的索引
      const aTextureIndex = gl.getAttribLocation(
        shaderProgram,
        "aTextureIndex"
      );
      gl.vertexAttribPointer(aTextureIndex, 1, gl.FLOAT, false, 16, 12);
      gl.enableVertexAttribArray(aTextureIndex);
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
      const gl = this.gl;
      this.canvasObj.clear();
      this.activeBindTexture(gl, this.texture1, 1);
      // this.activeBindTexture(gl, this.texture2, 2);
      // 获取纹理采样器
      const samplerUniform1 = gl.getUniformLocation(shaderProgram, "uSampler");
      // const samplerUniform2 = gl.getUniformLocation(shaderProgram, "uSampler2");
      // 指定全局变量关联的纹理单元
      gl.uniform1i(samplerUniform1, 1);
      gl.uniform1f(program.uOpacity, this.fadeOpacity);
      // gl.enable(gl.BLEND);
      // gl.blendFunc(gl.SRC_COLOR, gl.DST_COLOR);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    },
    pageEvent: function (gl, shaderProgram) {},
  };

  page.init();
  // insertLink({ title: "JavaScript WebGL 图片透明处理", linkIndex: 115 });
};
