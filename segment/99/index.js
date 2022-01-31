window.onload = function () {
  const page = {
    canvasObj: null,
    imgTexture: null, // 图片纹理
    offscreenWidth: 200, // 离屏绘制的宽度
    offscreenHeight: 150, // 离屏绘制的高度
    init: function () {
      const canvasObj = new WebGL(400, 300);
      this.canvasObj = canvasObj;
      const ratio = canvasObj.ratio;
      this.offscreenWidth = this.offscreenWidth * ratio;
      this.offscreenHeight = this.offscreenHeight * ratio;
      canvasObj.attrs({ class: "demo-webgl" });
      document.querySelector("#demo").appendChild(canvasObj.node);
      // canvasObj.clear();
      const gl = canvasObj.context;
      if (!gl) {
        alert("浏览器不支持 WebGL");
        return;
      }
      this.gl = gl;

      const source = `
        precision mediump float;
        attribute vec2 aVertexPos;
        attribute vec2 aVertexTextureCoord;

        varying vec2 vTextureCoord;
        void main(void){
          gl_Position = vec4(aVertexPos, 0, 1);
          vTextureCoord = aVertexTextureCoord;
        }
      `;
      const fragmentSource = `
        precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        void main(void){
          gl_FragColor = texture2D(uSampler, vTextureCoord);
        }
      `;

      this.shaderProgram = this.createShaderProgram(gl, source, fragmentSource);
      this.screenBuffer = this.initBuffersForScreen(gl);
      // 帧缓冲对象
      this.framebufferObj = this.createFramebufferObject(gl);
      // 针对帧缓冲区绘制的顶点和纹理坐标
      this.offScreenBuffer = this.initBuffersForFramebuffer(gl);

      this.loadImage();
    },
    loadImage: function () {
      const gl = this.gl;
      let loadCount = 1;
      const img = new Image();
      img.onload = (e) => {
        this.imgTexture = this.createTexture(gl, e.target);
        loadCount--;
        if (!loadCount) {
          this.draw();
        }
      };
      img.src = "./1.jpg";
    },
    initBuffersForScreen: function (gl) {
      const vertices = new Float32Array([
        1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
      ]); // 矩形
      const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
      const texCoords = new Float32Array([
        1.0,
        1.0, // 右上角
        0.0,
        1.0, // 左上角
        0.0,
        0.0, // 左下角
        1.0,
        0.0, // 右下角
      ]);

      const obj = {};
      obj.verticesBuffer = this.createBuffer(gl, gl.ARRAY_BUFFER, vertices);
      obj.indexBuffer = this.createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices);
      obj.texCoordsBuffer = this.createBuffer(gl, gl.ARRAY_BUFFER, texCoords);

      return obj;
    },
    initBuffersForFramebuffer: function (gl) {
      const vertices = new Float32Array([
        0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
      ]); // 矩形
      // const vertices = new Float32Array([
      //   1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
      // ]); // 矩形
      const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
      const texCoords = new Float32Array([
        1.0,
        1.0, // 右上角
        0.0,
        1.0, // 左上角
        0.0,
        0.0, // 左下角
        1.0,
        0.0, // 右下角
      ]);

      const obj = {};
      obj.verticesBuffer = this.createBuffer(gl, gl.ARRAY_BUFFER, vertices);
      obj.indexBuffer = this.createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices);
      obj.texCoordsBuffer = this.createBuffer(gl, gl.ARRAY_BUFFER, texCoords);

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
    createFramebufferObject: function (gl) {
      let framebuffer = gl.createFramebuffer();

      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        this.offscreenWidth,
        this.offscreenHeight,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      );
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
      framebuffer.texture = texture; // 保存纹理对象
      // console.info("framebuffer", framebuffer);

      // 关联缓冲区对象
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );

      // 检查配置是否正确
      var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      if (gl.FRAMEBUFFER_COMPLETE !== e) {
        console.log("Frame buffer object is incomplete: " + e.toString());
        return;
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, null);

      return framebuffer;
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
      const frameBuffer = this.framebufferObj;
      this.canvasObj.clear();
      const program = this.shaderProgram;
      gl.useProgram(program.program);

      // 这个就让绘制的目标变成了帧缓冲区
      gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

      gl.viewport(0, 0, this.offscreenWidth, this.offscreenHeight);
      this.drawOffFrame(program, this.imgTexture);

      // 解除帧缓冲区绑定，绘制的目标变成了颜色缓冲区
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      this.drawScreen(program, frameBuffer.texture);
      // this.drawScreen(program, this.imgTexture);
    },
    drawOffFrame: function (program, texture) {
      const gl = this.gl;
      const targetBuffer = this.offScreenBuffer;

      this.activeBindTexture(gl, texture, 0);
      this.bindEnableBuffer(
        gl,
        targetBuffer.texCoordsBuffer,
        program.aVertexTextureCoord,
        2
      );
      this.bindEnableBuffer(
        gl,
        targetBuffer.verticesBuffer,
        program.aVertexPos,
        2
      );

      gl.uniform1i(program.uSampler, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, targetBuffer.indexBuffer);

      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    },
    drawScreen: function (program, texture) {
      const gl = this.gl;
      const targetBuffer = this.screenBuffer;

      this.activeBindTexture(gl, texture, 1);

      this.bindEnableBuffer(
        gl,
        targetBuffer.texCoordsBuffer,
        program.aVertexTextureCoord,
        2
      );
      this.bindEnableBuffer(
        gl,
        targetBuffer.verticesBuffer,
        program.aVertexPos,
        2
      );

      gl.uniform1i(program.uSampler, 1);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, targetBuffer.indexBuffer);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    },
  };

  page.init();
  insertLink({ title: "JavaScript WebGL 帧缓冲区对象", linkIndex: 116 });
};
