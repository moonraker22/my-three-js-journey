uniform float uTime;

varying vec2 vUv;

#include "lygia/draw/circle.glsl"
#include "lygia/draw/hex.glsl"


#define PI 3.1415926535897932384626433832795


    // random function
    float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// rotate function
vec2 rotate(vec2 st, float angle)
{
    st -= 0.5;
    st =  mat2(cos(angle),-sin(angle),sin(angle),cos(angle)) * st;
    st += 0.5;
    return st;
}

// rotate function
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

// perlin noise function
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}
//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main()
{
    
    // float strength = vUv.x;
    // float strength = 1.0 - vUv.y;
    //vertically
    // float strength = mod(vUv.x * 30.0, 1.0);

    // circle with lygia
    float strength = circle(vUv, 0.5, 0.1);
    strength += circle(vUv, 0.3, 0.1);
    strength += hex(vUv, 0.7, 0.1);

    //horizontally
    // float strength = mod(vUv.y * 30.0, 1.0);
     //diagonal
    // float strength = mod(vUv.x * 30.0 + vUv.y * 30.0, 1.0);
    //lines
    // float strength = mod(vUv.y * 20.0, 1.0);
    // strength = step(0.9, strength);
    //diagonal lines adjust the 30.0 to change the density of the lines
    //adjust the 0.9 to change the width of the lines
    // float strength = mod(vUv.y * 20.0 + vUv.x * 20.0, 1.0);
    // strength = step(0.9, strength);
    // checkerboard
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));
    // muliply to see the intersection tweek the edge to change the width of the lines
    // float strength = step(0.1, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.1, mod(vUv.y * 10.0, 1.0));
    // arrows
    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
    // refactored arrows
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
    // float strength = barX + barY;
    // crosses with offset to the x and y axis
    // float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
    // float strength = barX + barY;
    // abs
    // float strength = abs(vUv.x - 0.5); 
    // abs with min value
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // abs with max value
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // squares with step max and abs change max to min to get different squares
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // This pattern is the multiplication of one square with another but smaller and inverted.
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // gradient lines
    // float strength = floor(vUv.x * 20.0) / 20.0;
    // combine the different axes by multiplying them
    // float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;

    // random noise
    // float strength = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    // random noise with a seed
    // float strength = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453 + 0.5);
    // random noise with a seed and a scale
    // float strength = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453 + 0.5) * 0.5;
    // float strength = random(vUv);

    //checkerboard with random noise
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
    // float strength = step(0.8, random(gridUv));
    // float strength = step(0.8, random(gridUv + 0.5));
    // float strength = step(0.8, random(gridUv + sin(uTime * 0.1) * 0.1));

    // float strength = step(0.8, random(gridUv + 0.5) * random(gridUv + 0.5));
    // float strength = random(gridUv);

    // diagonal checkerboard with random noise
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0);
    // float strength = random(gridUv);

    // float strength = length(vUv);
    // float strength = distance(vUv, vec2(0.5));
    // float strength = 1.0 - distance(vUv, vec2(0.5));

    // center circle
    // float strength = 0.015 / (distance(vUv, vec2(0.5)));
    // float strength = 0.015 / (distance(vUv, vec2(0.5)) + 0.015);
    // float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));

    // star center
    // float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    // strength *= 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
    // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
    // float strength = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
//     float strength = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
// strength *= 0.15 / (distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

    // circle
    // float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);
    // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
    // float strength = step(0.02, abs(distance(vUv, vec2(0.5)) - 0.25));
    // inverted circle
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // pattern 
    // vec2 wavedUv = vec2( vUv.x,vUv.y + sin(vUv.x * 30.0) * 0.1);
    // float strength = step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
    // inverted
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // another pattern change the multiplaction to get different patterns
    // vec2 wavedUv = vec2(
    // vUv.x + sin(vUv.y * 100.0) * 0.1, vUv.y + sin(vUv.x * 100.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // This pattern is actually the angle of vUv. To get an angle from 2D coordinates, we can use atan(...)
    // float strength = atan(vUv.y - 0.5, vUv.x - 0.5) / PI + 0.5;
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = angle;
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = angle;

    // startburst
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = mod(angle * 20.0, 1.0);
    // using sin
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = sin(angle * 100.0);
    
    // circle pattern
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float radius = 0.25 + sin(angle * 100.0) * 0.02;
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

    // perlin noise change multiplier to get different patterns
    // float strength = cnoise(vUv * 50.0);
    // float strength = cnoise(vUv * 50.0 + 0.5);
    // float strength = cnoise(vUv * 50.0 + 0.5) * cnoise(vUv * 50.0 + 0.5);
    // with step
    // float strength = step(0.0, cnoise(vUv * 50.0));
    // with abs
    // float strength = abs(cnoise(vUv * 50.0));
    // float strength = 1.0 - abs(cnoise(vUv * 10.0));
    // float strength = 1.0 - abs(cnoise(vUv * 10.0 + 0.5));
    // float strength = 1.0 - abs(cnoise(vUv * 10.0 + 0.5) * cnoise(vUv * 10.0 + 0.5));
    // with sin
    // float strength = sin(cnoise(vUv * 10.0) * 20.0);
    // with sin and abs
    // float strength = abs(sin(cnoise(vUv * 10.0) * 20.0));
    // float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));

    // Pattern 11
// float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
// strength += step(0.8, mod(vUv.y * 10.0, 1.0));
// strength = clamp(strength, 0.0, 1.0);

// ...

// Pattern 14
// float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
// float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
// float strength = barX + barY;
// strength = clamp(strength, 0.0, 1.0);

// Pattern 15
// float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
// float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
// float strength = barX + barY;
// strength = clamp(strength, 0.0, 1.0);

// animated pattern
// float strength = step(0.8, mod(vUv.x * 10.0 + uTime, 1.0));
// strength += step(0.8, mod(vUv.y * 10.0 + uTime, 1.0));





    // colors
    vec3 blackColor = vec3(0.0);
    vec3 whiteColor = vec3(1.0);
    vec3 uvColor = vec3(vUv, 1.0);

    vec3 mixedColor = mix(blackColor, uvColor, strength);




    // gl_FragColor = vec4(vec3(strength), 1.0);
    gl_FragColor = vec4(mixedColor, 1.0);

    //    gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);

}