import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {
  SSR,
  DepthOfField,
  Bloom,
  Noise,
  Glitch,
  Vignette,
  EffectComposer,
} from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import { Suspense, useRef } from 'react'
import Drunk from './Drunk.js'
// console.log(BlendFunction)
// console.log(GlitchMode)
console.log(Noise)

export default function Experience() {
  const drunkRef = useRef()

  // const { frequency, amplitude, glitchMode, blendFunction } = useControls({
  // frequency: { value: 10, min: 0, max: 100 },
  // amplitude: { value: 0.1, min: 0, max: 1 },
  // glitchMode: { value: GlitchMode.SPORADIC, options: GlitchMode },
  // blendFunction: { value: BlendFunction.NORMAL, options: BlendFunction },
  // })
  const drunkProps = useControls('Drunk Effect', {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  })

  const { bloom, dof, glitch, vignette, noise } = useControls({
    bloom: true,
    dof: true,
    glitch: true,
    vignette: true,
    noise: true,
  })

  const ssrProps = useControls('SSR Effect', {
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
    maxSamples: { value: 0, min: 0, max: 1 },
    resolutionScale: { value: 1, min: 0, max: 1 },
    blurMix: { value: 0.5, min: 0, max: 1 },
    blurKernelSize: { value: 8, min: 0, max: 8 },
    blurSharpness: { value: 0.5, min: 0, max: 1 },
    rayStep: { value: 0.3, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 5 },
    maxRoughness: { value: 0.1, min: 0, max: 1 },
    jitter: { value: 0.7, min: 0, max: 5 },
    jitterSpread: { value: 0.45, min: 0, max: 1 },
    jitterRough: { value: 0.1, min: 0, max: 1 },
    roughnessFadeOut: { value: 1, min: 0, max: 1 },
    rayFadeOut: { value: 0, min: 0, max: 1 },
    MAX_STEPS: { value: 20, min: 0, max: 20 },
    NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
    maxDepthDifference: { value: 3, min: 0, max: 10 },
    maxDepth: { value: 1, min: 0, max: 1 },
    thickness: { value: 10, min: 0, max: 10 },
    ior: { value: 1.45, min: 0, max: 2 },
  })
  return (
    <>
      <EffectComposer
      //</> multisampling={0}
      >
        {/* <Vignette
          eskil={false}
          offset={0.5}
          darkness={1.0}
          //   blendFunction={BlendFunction.COLOR_DODGE}
          blendFunction={BlendFunction.LINEAR_BURN}
        /> */}
        {/* <Glitch
          delay={[0.5, 1, 0.5]}
          duration={[0.1, 0.3, 0.5, 0.7, 0.9]}
          strength={[0.2, 0.4]}
          //   mode={GlitchMode.CONSTANT_MILD}
          mode={GlitchMode.SPORADIC}
        /> */}
        {/* <Noise blendFunction={BlendFunction.LUMINOSITY} premultiply /> */}
        {/* <Bloom
          // must set tonemapping to false on mesh color value needs to be grater than 1 or emmissive
          mipmapBlur
          intensity={0.3}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.1}
          height={300}
          //   blendFunction={BlendFunction.COLOR_DODGE}
        /> */}
        {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        {/* <SSR {...ssrProps} /> */}

        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        />
        <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
          mode={GlitchMode.CONSTANT_MILD}
        />
        <Noise
          // premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
        />
        <Bloom intensity={1.0} luminanceThreshold={0.5} />
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        />
        <SSR {...ssrProps} /> */}
        <Drunk
          frequency={2}
          amplitude={0.1}
          ref={drunkRef}
          {...drunkProps}
          blendFunction={BlendFunction.DARKEN}
        />
      </EffectComposer>

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <color args={['#ffffff']} attach="background" />
      {/* <color args={['#000000']} attach="background" /> */}
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
        {/* <meshStandardMaterial color={[4, 1, 2]} toneMapped={false} /> */}
        {/* <meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} /> */}
        {/* <meshStandardMaterial
          color="mediumpurple"
          toneMapped={false}
          emissive={'orange'}
          emissiveIntensity={2}
        /> */}
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="#555555" metalness={0} roughness={0} />
      </mesh>
    </>
  )
}
