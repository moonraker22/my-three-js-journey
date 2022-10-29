varying vec2 vUv;

void main()
{
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));

    gl_FragColor = vec4(distanceToCenter, distanceToCenter, distanceToCenter, 1.0);
}