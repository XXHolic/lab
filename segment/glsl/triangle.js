window.onload = () => {
  // 用于顶点着色器
  const vsSource = `
    attribute vec3 aVertexPosition;
    void main() {
      gl_Position = vec4(aVertexPosition.x,aVertexPosition.y,aVertexPosition.z,1);
    }
  `;

  // 用于片段着色器
  const fsSource = `void main(){gl_FragColor = vec4(1.0, 0.5, 0.2, 1.0);}`;

  // 创建不同类型的着色器
  function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(
        "An error occurred compiling the shaders: " +
          gl.getShaderInfoLog(shader)
      );
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  //  初始化着色器程序，让WebGL知道如何绘制我们的数据
  function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // 创建着色器程序

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    // 链接(Link)为一个着色器程序对象，在渲染对象的时候激活这个着色器程序。
    gl.linkProgram(shaderProgram);

    // 创建失败， alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert(
        "Unable to initialize the shader program: " +
          gl.getProgramInfoLog(shaderProgram)
      );
      return null;
    }

    return shaderProgram;
  }

  function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // var vertices = [
    //   1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0,
    // ];
    var vertices = [-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    return {
      position: positionBuffer,
    };
  }

  function drawScene(gl, programInfo, buffers) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // 告诉OpenGL该如何解析顶点数据
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    // 顶点属性默认是禁用的。以顶点属性位置值作为参数，启用顶点属性；
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    // 在glUseProgram函数调用之后，每个着色器调用和渲染调用都会使用这个程序对象
    gl.useProgram(programInfo.program);
    // 绘制;
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
  }

  function main() {
    const canvasObj = document.querySelector("#glcanvas");
    const gl = canvasObj.getContext("webgl", { antialias: false });

    if (!gl) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      return;
    }
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      },
    };

    const buffers = initBuffers(gl);
    drawScene(gl, programInfo);
  }

  main();
};
