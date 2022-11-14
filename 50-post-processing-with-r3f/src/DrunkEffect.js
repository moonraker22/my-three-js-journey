import { Uniform } from 'three'
import { BlendFunction, Effect } from 'postprocessing'

const fragmentShader = /* glsl */ `
uniform float frequency;
uniform float amplitude;
 uniform float offset;

void mainUv(inout vec2 uv){

  // cool circle effect  
//   uv = uv * 2.0 - 1.0;
//   float d = length(uv);
//   float r = 0.5;
//   float f = smoothstep(r, r + 0.01, d);
//   uv = mix(uv, vec2(0.0), f);
//   uv = uv * 0.5 + 0.5;

// uv.y += sin(uv.x);
// uv.y += sin(uv.x * 10.0) * 0.1;
//  uv.y += sin(uv.x * frequency) * amplitude;
 uv.y += sin(uv.x * frequency + offset) * amplitude;
}

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        // outputColor = vec4(uv, 1.0, 1.0);
        // outputColor = inputColor;
         vec4 color = inputColor;
    color.rgb *= vec3(0.8, 1.0, 0.5);

    // outputColor = color;
    outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
    }
`

const vertexShader = /* glsl */ `
    `

export default class DrunkEffect extends Effect {
  constructor({ frequency, amplitude, blendFunction = BlendFunction.DARKEN }) {
    console.log(frequency, amplitude, blendFunction)

    super('DrunkEffect', fragmentShader, {
      //   uniforms: new Map([
      //     ['frequency', { value: frequency }],
      //     ['amplitude', { value: amplitude }],
      //   ]),
      blendFunction: blendFunction,
      uniforms: new Map([
        ['frequency', new Uniform(frequency)],
        ['amplitude', new Uniform(amplitude)],
        ['offset', new Uniform(0)],
      ]),
    })
  }
  update(renderer, inputBuffer, deltaTime) {
    console.log(renderer, inputBuffer)
    // called every frame
    // console.log('update')

    // retrieve value from Map
    // this.uniforms.get('offset').value += 0.02
    this.uniforms.get('offset').value += deltaTime
  }
}
