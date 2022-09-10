#include "lygia/color/blend/add.glsl"
#include "lygia/color/blend/phoenix.glsl"

varying vec3 vColor;



void main()
{
    // Disc
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = step(0.5, strength);
    // strength = 1.0 - strength;

    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Diffuse point
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength *= 3.0;
    // strength = 1.0 - strength;


    //lygia blend
    // strength= blendAdd(strength, 0.2);
    // lygia phoenix
    // strength= blendPhoenix(strength, 0.8);


    // Light point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 5.0);
    // Final color
    vec3 color = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(color, 1.0);


    // gl_FragColor = vec4(vec3(strength), 1.0);
    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);
}