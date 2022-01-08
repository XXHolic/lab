/**
 * a_index 对应 this.particleIndexBuffer - 粒子索引数据
 * u_particles_res 对应 this.particleStateResolution - 粒子总数平方根
 * u_particles 对应 this.particleStateTexture - 每个粒子状态的纹理
 *
 * floor(x) ： 返回小于等于x的最大整数值
 * fract(x) : 返回x-floor(x)，即返回x的小数部分
 *
 * fract(a_index/u_particles_res) 一定会返回小于 1 的值，用于水平方向的颜色采样， 注意纹理坐标范围是 0-1
 * floor(a_index/u_particles_res)/u_particles_res) 一定会返回小于 1 的值，用于垂直方向的颜色采样
 *
 * color 得到的值就是获取粒子的状态中存储的颜色值，请记住这些颜色值都是根据速度生成的
 *
 * v_particle_pos 根据 color 就得到速度对应映射值
 *
 */

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

/**
 * u_wind 对应 this.windTexture - 风纹理数据
 * u_wind_min 在 this.windData 里面的(uMin,vMin)
 * u_wind_max 在 this.windData 里面的(uMax,vMax)
 * u_color_ramp 对应 this.colorRampTexture - 颜色数据纹理
 *
 * mix(x,y,a) 返回 x 和 y 的线性混合， x*(1-a) + y*a
 * length 返回矢量的长度
 *
 * velocity 使用 mix 每个像素得到新的值，见 https://www.cnblogs.com/laizhenghong2012/p/11253100.html
 *
 */

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

const quadVert = `
  precision mediump float;

  attribute vec2 a_pos;

  varying vec2 v_tex_pos;

  void main() {
      v_tex_pos = a_pos;
      gl_Position = vec4(1.0 - 2.0 * a_pos, 0, 1);
  }
`;

const screenFrag = `
  precision mediump float;

  uniform sampler2D u_screen;
  uniform float u_opacity;

  varying vec2 v_tex_pos;

  void main() {
      vec4 color = texture2D(u_screen, 1.0 - v_tex_pos);
      // a hack to guarantee opacity fade out even with a value close to 1.0
      gl_FragColor = vec4(floor(255.0 * color * u_opacity) / 255.0);
  }
`;

const updateFrag = `
  precision highp float;

  uniform sampler2D u_particles;
  uniform sampler2D u_wind;
  uniform vec2 u_wind_res;
  uniform vec2 u_wind_min;
  uniform vec2 u_wind_max;
  uniform float u_rand_seed;
  uniform float u_speed_factor;
  uniform float u_drop_rate;
  uniform float u_drop_rate_bump;

  varying vec2 v_tex_pos;

  // pseudo-random generator
  const vec3 rand_constants = vec3(12.9898, 78.233, 4375.85453);
  float rand(const vec2 co) {
      float t = dot(rand_constants.xy, co);
      return fract(sin(t) * (rand_constants.z + t));
  }

  // wind speed lookup; use manual bilinear filtering based on 4 adjacent pixels for smooth interpolation
  vec2 lookup_wind(const vec2 uv) {
      // return texture2D(u_wind, uv).rg; // lower-res hardware filtering
      vec2 px = 1.0 / u_wind_res;
      vec2 vc = (floor(uv * u_wind_res)) * px;
      vec2 f = fract(uv * u_wind_res);
      vec2 tl = texture2D(u_wind, vc).rg;
      vec2 tr = texture2D(u_wind, vc + vec2(px.x, 0)).rg;
      vec2 bl = texture2D(u_wind, vc + vec2(0, px.y)).rg;
      vec2 br = texture2D(u_wind, vc + px).rg;
      return mix(mix(tl, tr, f.x), mix(bl, br, f.x), f.y);
  }

  void main() {
      vec4 color = texture2D(u_particles, v_tex_pos);
      vec2 pos = vec2(
          color.r / 255.0 + color.b,
          color.g / 255.0 + color.a); // decode particle position from pixel RGBA

      vec2 velocity = mix(u_wind_min, u_wind_max, lookup_wind(pos));
      float speed_t = length(velocity) / length(u_wind_max);

      // take EPSG:4236 distortion into account for calculating where the particle moved
      float distortion = cos(radians(pos.y * 180.0 - 90.0));
      vec2 offset = vec2(velocity.x / distortion, -velocity.y) * 0.0001 * u_speed_factor;

      // update particle position, wrapping around the date line
      pos = fract(1.0 + pos + offset);

      // a random seed to use for the particle drop
      vec2 seed = (pos + v_tex_pos) * u_rand_seed;

      // drop rate is a chance a particle will restart at random position, to avoid degeneration
      float drop_rate = u_drop_rate + speed_t * u_drop_rate_bump;
      float drop = step(1.0 - drop_rate, rand(seed));

      vec2 random_pos = vec2(
          rand(seed + 1.3),
          rand(seed + 2.1));
      pos = mix(pos, random_pos, drop);

      // encode the new particle position back into RGBA
      gl_FragColor = vec4(
          fract(pos * 255.0),
          floor(pos * 255.0) / 255.0);
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

    this.fadeOpacity = 0.996; // 粒子轨迹在每帧上衰减的速度有多快
    this.speedFactor = 0.25; // 粒子移动的速度有多快
    this.dropRate = 0.003; // 粒子移动到随机位置的频率
    this.dropRateBump = 0.01; // 下降速率相对于单个粒子速度的增加

    this.drawProgram = webglUtil.createProgram(gl, drawVert, drawFrag);
    this.screenProgram = webglUtil.createProgram(gl, quadVert, screenFrag);
    this.updateProgram = webglUtil.createProgram(gl, quadVert, updateFrag);

    this.quadBuffer = webglUtil.createBuffer(
      gl,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1])
    );
    this.framebuffer = gl.createFramebuffer();

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
    // Canvas 里面的数据放到纹理中，需要足够的大小：16 * 16 = 256
    this.colorRampTexture = webglUtil.createTexture(
      this.gl,
      this.gl.LINEAR,
      webglUtil.getColorRamp(colors), // 按照 8 位 256 中可能创建的渐变颜色，这样看起来就是对应连续渐变的整体色调
      16,
      16
    );
  }

  set numParticles(numParticles) {
    const gl = this.gl;

    // 状态要存到纹理里面，纹理需要宽高参数，这里当做宽高相等的正方形处理
    const particleRes = (this.particleStateResolution = Math.ceil(
      Math.sqrt(numParticles)
    ));
    // 总粒子数
    this._numParticles = particleRes * particleRes;
    // 所有粒子的颜色信息，存放 rgba 四个分量，每个分量 8 位
    const particleState = new Uint8Array(this._numParticles * 4);
    for (let i = 0; i < particleState.length; i++) {
      // 生成随机颜色，颜色会对应到图片中的位置
      particleState[i] = Math.floor(Math.random() * 256);
    }
    // 创建存储所有粒子颜色信息的纹理
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
    // 粒子索引
    const particleIndices = new Float32Array(this._numParticles);
    for (let i = 0; i < this._numParticles; i++) particleIndices[i] = i;
    this.particleIndexBuffer = webglUtil.createBuffer(gl, particleIndices);
  }

  get numParticles() {
    return this._numParticles;
  }

  setWind(windData) {
    // 风场图片的源数据
    this.windData = windData;
    // 风场图片纹理
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
    this.updateParticles();
  }

  drawScreen() {
    const gl = this.gl;
    // draw the screen into a temporary framebuffer to retain it as the background on the next frame
    webglUtil.bindFramebuffer(gl, this.framebuffer, this.screenTexture);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    this.drawTexture(this.backgroundTexture, this.fadeOpacity);
    this.drawParticles();

    webglUtil.bindFramebuffer(gl, null);
    // enable blending to support drawing on top of an existing background (e.g. a map)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    this.drawTexture(this.screenTexture, 1.0);
    gl.disable(gl.BLEND);

    // save the current screen as the background for the next frame
    const temp = this.backgroundTexture;
    this.backgroundTexture = this.screenTexture;
    this.screenTexture = temp;
  }

  drawTexture(texture, opacity) {
    const gl = this.gl;
    const program = this.screenProgram;
    gl.useProgram(program.program);

    webglUtil.bindAttribute(gl, this.quadBuffer, program.a_pos, 2);
    webglUtil.bindTexture(gl, texture, 2);
    gl.uniform1i(program.u_screen, 2);
    gl.uniform1f(program.u_opacity, opacity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawParticles() {
    const gl = this.gl;
    const program = this.drawProgram;
    gl.useProgram(program.program);
    // 激活并解析顶点数据
    webglUtil.bindAttribute(gl, this.particleIndexBuffer, program.a_index, 1);
    webglUtil.bindTexture(gl, this.colorRampTexture, 2);
    // 指定着色器中变量对应的数据
    gl.uniform1i(program.u_wind, 0); // 风纹理数据
    gl.uniform1i(program.u_particles, 1); // 粒子状态数据
    gl.uniform1i(program.u_color_ramp, 2); // 颜色数据
    // 指定着色器中变量对应的数据
    gl.uniform1f(program.u_particles_res, this.particleStateResolution);
    gl.uniform2f(program.u_wind_min, this.windData.uMin, this.windData.vMin);
    gl.uniform2f(program.u_wind_max, this.windData.uMax, this.windData.vMax);
    // 绘制点
    gl.drawArrays(gl.POINTS, 0, this._numParticles);
  }

  updateParticles() {
    const gl = this.gl;
    webglUtil.bindFramebuffer(gl, this.framebuffer, this.particleStateTexture1);
    gl.viewport(
      0,
      0,
      this.particleStateResolution,
      this.particleStateResolution
    );

    const program = this.updateProgram;
    gl.useProgram(program.program);

    webglUtil.bindAttribute(gl, this.quadBuffer, program.a_pos, 2);

    gl.uniform1i(program.u_wind, 0);
    gl.uniform1i(program.u_particles, 1);

    gl.uniform1f(program.u_rand_seed, Math.random());
    gl.uniform2f(program.u_wind_res, this.windData.width, this.windData.height);
    gl.uniform2f(program.u_wind_min, this.windData.uMin, this.windData.vMin);
    gl.uniform2f(program.u_wind_max, this.windData.uMax, this.windData.vMax);
    gl.uniform1f(program.u_speed_factor, this.speedFactor);
    gl.uniform1f(program.u_drop_rate, this.dropRate);
    gl.uniform1f(program.u_drop_rate_bump, this.dropRateBump);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // swap the particle state textures so the new one becomes the current one
    const temp = this.particleStateTexture0;
    this.particleStateTexture0 = this.particleStateTexture1;
    this.particleStateTexture1 = temp;
  }
}
