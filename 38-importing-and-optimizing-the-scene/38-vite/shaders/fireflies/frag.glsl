void main()
{
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);

    // vec2 uv = gl_PointCoord.xy / iResolution.xy;

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));

    // if (distanceToCenter > 0.5)
    // {
    //     discard;
    // }
    // float strength = 0.05 / distanceToCenter;
    float strength = 0.05 / distanceToCenter - 0.1 ;


    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}