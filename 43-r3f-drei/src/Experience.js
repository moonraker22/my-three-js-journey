// import { useThree, extend } from '@react-three/fiber'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// extend({ OrbitControls })
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Sky,
  Float,
  MeshReflectorMaterial,
  Stars,
  useTexture,
  useCubeTexture,
  useProgress,
  useGLTF,
} from '@react-three/drei'
import { useRef } from 'react'

export default function Experience() {
  //   const { camera, gl } = useThree()
  const cube = useRef()
  const sphere = useRef()

  return (
    <>
      <Sky sunPosition={[0, 1, 0]} />

      {/* <orbitControls args={ [ camera, gl.domElement ] } /> */}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
        scale={100}
        fixed={true}
      >
        <mesh position-x={-2} ref={sphere}>
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={8}
            occlude={[sphere, cube]}
          >
            That's a sphere 👍
          </Html>
          <sphereGeometry />
          <MeshReflectorMaterial
            resolution={512}
            blur={[1000, 1000]}
            mixBlur={1}
            mirror={0.5}
            color="orange"
          />
        </mesh>
      </PivotControls>

      <mesh position-x={2} scale={1.5} ref={cube}>
        <boxGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color="mediumpurple"
        />
      </mesh>

      <TransformControls object={cube} mode="translate" />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.8}
          color="greenyellow"
        />
      </mesh>

      <Html>
        <div className="container">
          <h1>React Three Fiber</h1>
          <p>3D in React</p>
        </div>
      </Html>
      <Float speed={5} floatIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          color={'black'}
          fontSize={1}
          // position={[0, 2, 0]}
          position-y={2}
          // maxWidth={2}
          textAlign="center"
        >
          MooNRakeR
          {/* <meshNormalMaterial /> */}
        </Text>
      </Float>
    </>
  )
}
