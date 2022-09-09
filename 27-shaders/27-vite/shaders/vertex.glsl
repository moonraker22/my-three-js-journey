// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;
uniform float uResolution;

// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;
attribute float aRandom;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vRandom;
varying vec2 vFrequency;
varying float vTime;
varying float vResolution;
varying float vElevation;


void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
    // modelPosition.z += sin(modelPosition.y * 10.0) * 0.1;
    // modelPosition.z += sin(modelPosition.x * 10.0 + aRandom) * 0.1;
    // modelPosition.z += aRandom * 0.1;
    //  modelPosition.z += sin(modelPosition.x * uFrequency.x) * 0.1;
    modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    
    // modelPosition.z += elevation * 0.1;

    vPosition = modelPosition.xyz;
    // vNormal = normal;
    vElevation = elevation;
    vUv = uv;
    vRandom = aRandom;
    vTime = uTime;
    // vFrequency = uFrequency;
    // modelPosition *= uv;
    // float distance = length(uv);
    // modelPosition.z += sin(distance * 10.0) * 0.3;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
}