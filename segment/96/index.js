window.onload = function () {
  const page = {
    init: function () {
      const canvasObj = new WebGL(300, 300);
      canvasObj.attrs({ class: "demo-webgl" });
      document.querySelector("#demo").appendChild(canvasObj.node);
      const gl = canvasObj.context;
      if (!gl) {
        alert("浏览器不支持 WebGL");
        return;
      }

      const vertices = [
        0.5, 0.5, 0.0, -0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,
      ]; // 矩形
      const indexData = [0, 1, 2, 0, 2, 3]; // 索引
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
        attribute vec3 vertexPos;
        attribute vec2 aVertexTextureCoord;

        varying highp vec2 vTextureCoord;
        void main(void){
          gl_Position = vec4(vertexPos, 1);
          vTextureCoord = aVertexTextureCoord;
        }
      `;
      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, source);
      const fragmentSource = `
        varying highp vec2 vTextureCoord;
        uniform sampler2D uSampler;
        void main(void){
          gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
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
      // this.setTextureBuffers(gl, shaderProgram, texCoords);
      this.loadImage(gl, shaderProgram, texCoords);
      // this.draw(gl);
    },
    loadImage: function (gl, shaderProgram, texCoords) {
      var img = new Image();
      img.onload = (e) => {
        // console.info("e", e);
        const texture = this.createTexture(gl, e.target);
        this.setTextureBuffers(gl, shaderProgram, texCoords);
        this.draw(gl, shaderProgram, texture);
      };
      // img.src = "./1.jpg";
      img.src = "./star.png";
    },
    createTexture: function (gl, source) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        source
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);
      return texture;
    },
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
      // 启用顶点属性，顶点属性默认是禁用的。
      gl.enableVertexAttribArray(texCoord);
      // 解析顶点数据
      gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 0, 0);
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
    draw: function (gl, shaderProgram, texture) {
      const samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
      gl.activeTexture(gl.TEXTURE0);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(samplerUniform, 0);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    },
  };

  page.init();
  // insertLink({ title: "JavaScript WebGL 绘制一个面", linkIndex: 111 });
};
