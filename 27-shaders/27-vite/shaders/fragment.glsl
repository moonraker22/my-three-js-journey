precision mediump float;

uniform sampler2D uTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vRandom;
varying vec2 vFrequency;
varying float vTime;
varying float vResolution;
varying float vElevation;




    float Cir (vec2 uv, float r, bool blur, float R) {
    float a = blur ? 0.01 : 0.;
    float b = blur ? 0.13 : 5./R;
    return smoothstep(a, b, length(uv)-r);
}

        void main()
        {
            // vec3 position = vPosition;
            // vec2 uv = vUv;
            // float random = vRandom;
            // vec2 frequency = vFrequency;
            // float time = vTime;


            // float col = sin(vPosition.z * vTime) * 0.1 + 0.3;
            // float row = sin(vPosition.z * vTime) * 0.1 + 0.3;


            // crazy floating patten
            // float R = vResolution;
            // float col2 = Cir(vPosition.xy, 0.3, true, R);
            // float col = Cir(vPosition.xy, 0.1, true, R);
            // float row = Cir(vPosition.xy, 0.2, true, R);
            // row -= Cir(vPosition.xy, 0.1, true, R);
            // col = fract(col * 10.);
            // row = fract(row * 10.);
            // col2 = fract(col2 * 10.);
            // // col2 = smoothstep(0.1, 0.2, col2);
            // col2 = mix(col2, 0., 0.5);
            // col *= fract(vPosition.z * 10.);
            // row *= fract(vPosition.z * 10.);
            // col2 *= fract(vPosition.z * 10.);
            // col += fract(vPosition.z * 10.) - 0.5;;    
            
            vec4 textureColor = texture2D(uTexture, vUv);
            textureColor.rgb *= vElevation * 2.0 + 0.5;

            // gl_FragColor = vec4(1, 0, 0, 1.0);
            gl_FragColor = textureColor;
        }