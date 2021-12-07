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

  class WindGL {
    constructor(gl) {
      this.gl = gl;

      this.fadeOpacity = 0.996; // how fast the particle trails fade on each frame
      this.speedFactor = 0.25; // how fast the particles move
      this.dropRate = 0.003; // how often the particles move to a random place
      this.dropRateBump = 0.01; // drop rate increase relative to individual particle speed

      this.drawProgram = util.createProgram(gl, drawVert, drawFrag);

      this.quadBuffer = util.createBuffer(
        gl,
        new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1])
      );
      this.framebuffer = gl.createFramebuffer(); // 提供了一个缓冲区的集合，这些缓冲区可以作为一个整体用作渲染操作的目标缓冲区。

      this.setColorRamp(defaultRampColors);
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
