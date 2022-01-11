window.onload = function () {
  const page = {
    texture1: null,
    texture2: null,
    init: function () {
      const canvasObj = new WebGL(300, 300);
      // const canvasObj = new WebGL(400, 300);
      canvasObj.attrs({ class: "demo-webgl" });
      document.querySelector("#demo").appendChild(canvasObj.node);
      // canvasObj.clear();
      const gl = canvasObj.context;
      if (!gl) {
        alert("浏览器不支持 WebGL");
        return;
      }

      const vertices = [
        // 第一套顶点
        0.0, 0.5, 0.0, 0.0, -0.8, 0.5, 0.0, 0.0, -0.8, -0.5, 0.0, 0.0, 0.0,
        -0.5, 0.0, 0.0,
        // 第二套顶点
        0.7, 0.3, 0.0, 1.0, -0.3, 0.3, 0.0, 1.0, -0.3, -0.7, 0.0, 1.0, 0.7,
        -0.7, 0.0, 1.0,
      ]; // 矩形
      const indexData = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]; // 索引
      const texCoords = [
        // 针对第一套顶点
        1.0,
        1.0, // 右上角
        0.0,
        1.0, // 左上角
        0.0,
        0.0, // 左下角
        1.0,
        0.0, // 右下角
        // 针对第二套顶点
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
        attribute float aTextureIndex;

        varying float vTextureIndex;
        varying highp vec2 vTextureCoord;
        void main(void){
          gl_Position = vec4(aVertexPos, 1);
          vTextureCoord = aVertexTextureCoord;
          vTextureIndex = aTextureIndex;
        }
      `;
      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, source);
      const fragmentSource = `
        precision highp float;
        varying highp vec2 vTextureCoord;
        varying float vTextureIndex;
        uniform sampler2D uSampler1;
        uniform sampler2D uSampler2;
        void main(void){
          if (vTextureIndex == 0.0) {
              gl_FragColor = texture2D(uSampler1, vTextureCoord);
          }
          if (vTextureIndex == 1.0) {
              gl_FragColor = texture2D(uSampler2, vTextureCoord);
          }
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
      this.setIndexBuffers(gl, indexData);
      this.setTextureBuffers(gl, shaderProgram, texCoords);
      this.loadImage(gl, shaderProgram);
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
      img.src = "./1.jpg";

      const img2 = new Image();
      img2.onload = (e) => {
        this.texture2 = this.createTexture(gl, e.target);
        loadCount--;
        if (!loadCount) {
          this.draw(gl, shaderProgram);
        }
      };
      img2.src = "./2-transparency.png";
      // img2.src = "./2.png";
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
    /**
     * 绘制
     * @param {*} gl WebGL 上下文
     * @param {*} shaderProgram 着色器程序
     */
    draw: function (gl, shaderProgram) {
      this.activeBindTexture(gl, this.texture1, 1);
      this.activeBindTexture(gl, this.texture2, 2);
      // 获取纹理采样器
      const samplerUniform1 = gl.getUniformLocation(shaderProgram, "uSampler1");
      const samplerUniform2 = gl.getUniformLocation(shaderProgram, "uSampler2");
      // 指定全局变量关联的纹理单元
      gl.uniform1i(samplerUniform1, 1);
      gl.uniform1i(samplerUniform2, 2);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawElements(gl.TRIANGLES, 12, gl.UNSIGNED_SHORT, 0);
    },
  };

  page.init();
  // insertLink({ title: "JavaScript WebGL 使用图片疑惑点", linkIndex: 114 });
};
