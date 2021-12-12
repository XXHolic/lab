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
    this.setColorRamp(defaultRampColors);
  }

  setColorRamp(colors) {
    // lookup texture for colorizing the particles according to their speed
    // 速度两个分量对应颜色的两个分量，256 种可能，宽高 16*16
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
    // 粒子总数
    this._numParticles = particleRes * particleRes;
    // 存放 rgba 四个分量，每个分量 8 位
    const particleState = new Uint8Array(this._numParticles * 4);
    for (let i = 0; i < particleState.length; i++) {
      // 产生随机位置
      particleState[i] = Math.floor(Math.random() * 256);
    }
    // 包含每个位置 rgab 信息放入纹理中
    this.particleStateTexture = webglUtil.createTexture(
      gl,
      gl.NEAREST,
      particleState,
      particleRes,
      particleRes
    );
    // 创建顶点索引数据并缓冲
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
    webglUtil.bindTexture(gl, this.particleStateTexture, 1);

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
}
