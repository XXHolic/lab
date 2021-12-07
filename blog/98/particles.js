window.onload = function () {
  const drawVert = `
    precision mediump float;
    attribute float a_index;

    uniform sampler2D u_particles;
    uniform float u_particles_res;

    varying vec2 v_particle_pos;

    void main(){
      vec4 color=texture2D(u_particles,vec2(
        fract(a_index/u_particles_res),floor(a_index/u_particles_res)/u_particles_res));

      // decode current particle position from the pixel's RGBA value
      v_particle_pos=vec2(
        color.r / 255.0 + color.b,
        color.g / 255.0 + color.a);

      gl_PointSize = 1.0;
      gl_Position = vec4(2.0 * v_particle_pos.x - 1.0, 1.0 - 2.0 * v_particle_pos.y, 0, 1);
    }
  `;

  const drawFrag = `
    precision mediump float;

    uniform sampler2D u_wind;
    uniform vec2 u_wind_min;
    uniform vec2 u_wind_max;
    uniform sampler2D u_color_ramp;

    varying vec2 v_particle_pos;

    void main() {
      vec2 velocity = mix(u_wind_min, u_wind_max, texture2D(u_wind, v_particle_pos).rg);
      float speed_t = length(velocity) / length(u_wind_max);

      // color ramp is encoded in a 16x16 texture
      vec2 ramp_pos = vec2(
          fract(16.0 * speed_t),
          floor(16.0 * speed_t) / 16.0);

      gl_FragColor = texture2D(u_color_ramp, ramp_pos);
    }
  `;

  const defaultRampColors = {
    0.0: "#3288bd",
    0.1: "#66c2a5",
    0.2: "#abdda4",
    0.3: "#e6f598",
    0.4: "#fee08b",
    0.5: "#fdae61",
    0.6: "#f46d43",
    1.0: "#d53e4f",
  };

  const createBuffer = (gl, data) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buffer;
  };

  const createTexture = (gl, filter, data, width, height) => {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // 设置 s 轴纹理，纹理坐标会被约束在0到1之间，超出的部分会重复纹理坐标的边缘，产生一种边缘被拉伸的效果
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // TEXTURE_MIN_FILTER -缩小时纹理过滤，
    //   GL_NEAREST-邻近过滤，是OpenGL默认的纹理过滤方式，OpenGL会选择中心点最接近纹理坐标的那个像素。
    // GL_LINEAR - 线性过滤，它会基于纹理坐标附近的纹理像素，计算出一个插值，近似出这些纹理像素之间的颜色。
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    // TEXTURE_MAG_FILTER -放大时纹理过滤，
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    if (data instanceof Uint8Array) {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        width,
        height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        data
      );
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
  };

  const getColorRamp = (colors) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 256;
    canvas.height = 1;

    const gradient = ctx.createLinearGradient(0, 0, 256, 0);
    for (const stop in colors) {
      gradient.addColorStop(+stop, colors[stop]);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 1);

    return new Uint8Array(ctx.getImageData(0, 0, 256, 1).data);
  };
  class WindGL {
    constructor(gl) {
      this.gl = gl;
      this.drawProgram = util.createProgram(gl, drawVert, drawFrag);
      this.setColorRamp(defaultRampColors);
    }

    set numParticles(numParticles) {
      const gl = this.gl;

      // we create a square texture where each pixel will hold a particle position encoded as RGBA
      const particleRes = (this.particleStateResolution = Math.ceil(
        Math.sqrt(numParticles)
      ));
      this._numParticles = particleRes * particleRes;

      const particleState = new Uint8Array(this._numParticles * 4);
      for (let i = 0; i < particleState.length; i++) {
        particleState[i] = Math.floor(Math.random() * 256); // randomize the initial particle positions
      }

      const particleIndices = new Float32Array(this._numParticles);
      for (let i = 0; i < this._numParticles; i++) particleIndices[i] = i;
      this.particleIndexBuffer = createBuffer(gl, particleIndices);
    }

    get numParticles() {
      return this._numParticles;
    }

    setColorRamp(colors) {
      // lookup texture for colorizing the particles according to their speed
      this.colorRampTexture = createTexture(
        this.gl,
        this.gl.LINEAR,
        getColorRamp(colors),
        16,
        16
      );
    }

    setWind(windData) {
      this.windData = windData;
      this.windTexture = createTexture(this.gl, this.gl.LINEAR, windData.image);
    }

    draw() {
      const gl = this.gl;
      gl.disable(gl.DEPTH_TEST); // 关闭深度测试，这个是否开启影响物体遮挡顺序
      gl.disable(gl.STENCIL_TEST); // 关闭模板

      this.drawParticles();
    }

    drawParticles() {
      const gl = this.gl;
      const program = this.drawProgram;
      gl.useProgram(program.program);

      util.bindAttribute(gl, this.particleIndexBuffer, program.a_index, 1);
      util.bindTexture(gl, this.colorRampTexture, 2);

      gl.uniform1i(program.u_wind, 0);
      gl.uniform1i(program.u_particles, 1);
      gl.uniform1i(program.u_color_ramp, 2);

      gl.uniform1f(program.u_particles_res, this.particleStateResolution);
      gl.uniform2f(program.u_wind_min, this.windData.uMin, this.windData.vMin);
      gl.uniform2f(program.u_wind_max, this.windData.uMax, this.windData.vMax);

      gl.drawArrays(gl.POINTS, 0, this._numParticles);
    }
  }
  let globalGeo = [];
  const page = {
    canvasObj: {},
    init: function () {
      this.canvasObj = Canvas.setTarget("#coastline");
      this.getData();
    },
    getData: function () {
      const _this = this;
      fetch("https://xxholic.github.io/lab/blog/98/geo.json")
        .then((response) => response.json())
        .then((res) => {
          const backData = res.features || [];
          globalGeo = backData;
          _this.draw(backData);
        });
    },
    draw: function (data) {
      const { context, node, clear } = this.canvasObj;
      const len = data.length;
      clear();
      context.lineWidth = 1;
      context.lineJoin = context.lineCap = "round";
      context.strokeStyle = "rgba(0,148,255,1)";
      context.beginPath();
      for (let i = 0; i < len; i++) {
        const coordinates = data[i].geometry.coordinates || [];
        const coordinatesNum = coordinates.length;
        for (let j = 0; j < coordinatesNum; j++) {
          context[j ? "lineTo" : "moveTo"](
            ((coordinates[j][0] + 180) * node.width) / 360,
            ((-coordinates[j][1] + 90) * node.height) / 180
          );
        }
      }
      context.stroke();
    },
    resize: function () {
      const ele = document.querySelector("#coastline");
      ele.style.width = `${window.innerWidth}px`; // 控制显示大小
      ele.style.height = `${window.innerHeight}px`; // 控制显示大小
      this.canvasObj = Canvas.setTarget("#coastline");
      this.draw(globalGeo);
    },
    pageEvent: function () {},
  };

  page.init();
  let timeoutHandler = null;
  window.onresize = function () {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      page.resize();
    }, 500);
  };
  // insertLink({ title: "JavaScript 数学曲线—星形线(Astroid)", linkIndex: 105 });
};
