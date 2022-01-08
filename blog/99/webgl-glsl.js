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

var drawVert = `
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

var drawFrag = `
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

var quadVert = `
  precision mediump float;

  attribute vec2 a_pos;

  varying vec2 v_tex_pos;

  void main() {
      v_tex_pos = a_pos;
      gl_Position = vec4(1.0 - 2.0 * a_pos, 0, 1);
  }
`;

var screenFrag = `
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

var updateFrag = `
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
