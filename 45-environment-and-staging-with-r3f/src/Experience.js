import { useFrame } from '@react-three/fiber'
import {
  Sparkles,
  Stage,
  Float,
  Lightformer,
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  softShadows,
  BakeShadows,
  useHelper,
  OrbitControls,
} from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// })

export default function Experience() {
  const cube = useRef()
  const directionalLight = useRef()
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2
    const time = state.clock.elapsedTime
    cube.current.position.x = 2 + Math.sin(time)
  })

  const { color, opacity, blur } = useControls('contact shadows', {
    color: '#1d8f75',
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  })

  const { sunPosition } = useControls('sky', {
    sunPosition: { value: [1, 2, 3] },
  })

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls('environment map', {
      envMapIntensity: { value: 7, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    })

  // Causing out of memory error
  // const { envMapIntensity } = useControls('environment map', {
  //   envMapIntensity: { value: 1, min: 0, max: 12 },
  // })
  return (
    <>
      {/* <mesh position-z={-5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="red" />
      </mesh>
      <Environment
        background
        // Cube texture
        // files={[
        //   './environmentMaps/2/px.jpg',
        //   './environmentMaps/2/nx.jpg',
        //   './environmentMaps/2/py.jpg',
        //   './environmentMaps/2/ny.jpg',
        //   './environmentMaps/2/pz.jpg',
        //   './environmentMaps/2/nz.jpg',
        // ]}

        // HDRI texture use HDR not EXR
        // files="./environmentMaps/the_sky_is_on_fire_2k.hdr"

        //Can use presets from drei
        preset="sunset"
        // preset="city"
        // preset="studio"
        // preset="forest"
        // preset="dawn"
        // preset="night"
        // preset="warehouse"
        // preset="apartment"

        // can control resolution
        // resolution={32}
        // ground={{
        //   height: 7,
        //   radius: 28,
        //   scale: 100,
        // }}
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        // can add mesh to envvironment for reflection or staging
        <color args={['blue']} attach="background" />
        <color args={['#000000']} attach="background" />
        <mesh position-z={-5} scale={10}>
          <planeGeometry />
          // can go beyond one on env texture to add more intensity
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh>
        <Lightformer
          position-z={-10}
          position-x={10}
          scale={10}
          color="red"
          intensity={100}
          // form="ring"
          form="circle"
        />
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer
            form="ring"
            color="red"
            intensity={1}
            scale={10}
            position={[-15, 4, -18]}
            target={[0, 0, 0]}
          />
        </Float>
      </Environment>
      {/* <Sky sunPosition={sunPosition} /> */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      />
      <BakeShadows />
      <color attach="background" args={['ivory']} />  */}

      {/* <directionalLight
        position={sunPosition}
        intensity={1.5}
        ref={directionalLight}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <directionalLight position={[1, 2, 3]} castShadow />
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      {/* <ambientLight intensity={0.5} /> */}

      {/* <Stage
        contactShadow={{ opacity: 0.2, blur: 3 }}
        environment="sunset"
        // Change the directional lights preset ('rembrandt', 'portrait', 'upfront', 'soft')
        preset="soft"
        // Change the directional lights intensity
        intensity={1}
      > */}
      <Stage
        contactShadow={{ opacity: 0.2, blur: 3 }}
        shadows
        adjustCamera
        intensity={1}
        environment="city"
        preset="rembrandt"
      >
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <mesh position-x={-2} position-y={1} castShadow>
          <sphereGeometry />
          <meshStandardMaterial color="orange" envMapIntensity={3.5} />
        </mesh>

        <mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            // envMapIntensity={envMapIntensity}
            envMapIntensity={3.5}
          />
        </mesh>
      </Stage>

      {/* <mesh
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        // receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          // envMapIntensity={envMapIntensity}
          envMapIntensity={3.5}
        />
      </mesh> */}
    </>
  )
}
