// 顶点着色器 glsl 代码
var source = `
        precision mediump float;

        attribute vec2 a_pos;

        varying vec2 v_tex_pos;

        void main() {
            v_tex_pos = a_pos;
            gl_Position = vec4(1.0 - 2.0 * a_pos, 0, 1);
        }
      `;

var fragmentSource = `
          precision mediump float;

          uniform sampler2D u_screen;
          uniform float u_opacity;

          varying vec2 v_tex_pos;

          void main() {
              // vec4 color = texture2D(u_screen, 1.0 - v_tex_pos);
              gl_FragColor = texture2D(u_screen, 1.0 - v_tex_pos);
              // a hack to guarantee opacity fade out even with a value close to 1.0
              // gl_FragColor = vec4(floor(255.0 * color * u_opacity) / 255.0);
          }
      `;
var drawVert = `
        precision highp float;
        attribute vec3 aVertexPos;
        attribute vec2 aVertexTextureCoord;

        varying highp vec2 vTextureCoord;
        void main(void){
          gl_Position = vec4(aVertexPos, 1);
          vTextureCoord = aVertexTextureCoord;
        }
      `;
var drawFrag = `
        precision highp float;
        varying highp vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform float uOpacity;

        void main(void){
          gl_FragColor = texture2D(uSampler, vTextureCoord);
          // gl_FragColor = vec4(floor(255.0 * color * uOpacity) / 255.0);
        }
      `;
var emptySource = `
        precision mediump float;
        attribute vec2 a_pos;
        varying vec2 v_tex_pos;
        void main() {
          v_tex_pos = a_pos;
          // 这个结合顶点就会发现是覆盖了这个画布
          gl_Position = vec4(1.0 - 2.0 * a_pos, 0, 1);
          // gl_Position = vec4(a_pos, 0, 1);
        }
      `;

var emptyFragmentSource = `
          precision mediump float;
          uniform sampler2D u_screen;
          varying vec2 v_tex_pos;
          void main() {
            // 1.0 - v_tex_pos 的处理保证了与加载存储的纹理一致
            gl_FragColor = texture2D(u_screen, 1.0 - v_tex_pos);
              // gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
          }
      `;
