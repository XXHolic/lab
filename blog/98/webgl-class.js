const drawVert = `
  precision mediump float;

  attribute float a_index;

  uniform sampler2D u_particles;
  uniform float u_particles_res;

  varying vec2 v_particle_pos;

  void main(){
      vec4 color=texture2D(u_particles,vec2(
              fract(a_index/u_particles_res),
              floor(a_index/u_particles_res)/u_particles_res));

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

class WindGL {
  constructor(gl) {
    this.gl = gl;
    this.drawProgram = webglUtil.createProgram(gl, drawVert, drawFrag);
    this.quadBuffer = webglUtil.createBuffer(
      gl,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1])
    );
    this.setColorRamp(defaultRampColors);
    this.resize();
  }

  resize() {
    const gl = this.gl;
    const emptyPixels = new Uint8Array(gl.canvas.width * gl.canvas.height * 4);
    // screen textures to hold the drawn screen for the previous and the current frame
    this.backgroundTexture = webglUtil.createTexture(
      gl,
      gl.NEAREST,
      emptyPixels,
      gl.canvas.width,
      gl.canvas.height
    );
    this.screenTexture = webglUtil.createTexture(
      gl,
      gl.NEAREST,
      emptyPixels,
      gl.canvas.width,
      gl.canvas.height
    );
  }

  setColorRamp(colors) {
    // lookup texture for colorizing the particles according to their speed
    this.colorRampTexture = webglUtil.createTexture(
      this.gl,
      this.gl.LINEAR,
      webglUtil.getColorRamp(colors),
      16,
      16
    );
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
    // textures to hold the particle state for the current and the next frame
    this.particleStateTexture0 = webglUtil.createTexture(
      gl,
      gl.NEAREST,
      particleState,
      particleRes,
      particleRes
    );
    this.particleStateTexture1 = webglUtil.createTexture(
      gl,
      gl.NEAREST,
      particleState,
      particleRes,
      particleRes
    );

    const particleIndices = new Float32Array(this._numParticles);
    for (let i = 0; i < this._numParticles; i++) particleIndices[i] = i;
    this.particleIndexBuffer = webglUtil.createBuffer(gl, particleIndices);
  }
  get numParticles() {
    return this._numParticles;
  }

  setWind(windData) {
    this.windData = windData;
    this.windTexture = webglUtil.createTexture(
      this.gl,
      this.gl.LINEAR,
      windData.image
    );
  }

  draw() {
    const gl = this.gl;
    gl.disable(gl.DEPTH_TEST); // 关闭深度测试，这个是否开启影响物体遮挡顺序
    gl.disable(gl.STENCIL_TEST); // 关闭模板

    // 使用多个纹理，先指定到对应纹理单元
    webglUtil.bindTexture(gl, this.windTexture, 0);
    webglUtil.bindTexture(gl, this.particleStateTexture0, 1);

    this.drawScreen();
  }

  drawScreen() {
    const gl = this.gl;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    this.drawParticles();
  }

  drawParticles() {
    const gl = this.gl;
    const program = this.drawProgram;
    gl.useProgram(program.program);

    webglUtil.bindAttribute(gl, this.particleIndexBuffer, program.a_index, 1);
    webglUtil.bindTexture(gl, this.colorRampTexture, 2);

    gl.uniform1i(program.u_wind, 0);
    gl.uniform1i(program.u_particles, 1);
    gl.uniform1i(program.u_color_ramp, 2);

    gl.uniform1f(program.u_particles_res, this.particleStateResolution);
    gl.uniform2f(program.u_wind_min, this.windData.uMin, this.windData.vMin);
    gl.uniform2f(program.u_wind_max, this.windData.uMax, this.windData.vMax);

    gl.drawArrays(gl.POINTS, 0, this._numParticles);
  }
}
