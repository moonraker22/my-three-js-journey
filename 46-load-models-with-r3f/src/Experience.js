import { Suspense } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Model from './Model.js'
import Placeholder from './Placeholder'
import Hamburger from './Hamburger'
import Fox from './Fox.js'

export default function Experience() {
  // const model = useLoader(GLTFLoader, './hamburger.glb')
  // console.log(model)
  // const model = useLoader(GLTFLoader, './hamburger-draco.glb', (loader) => {
  //   const dracoLoader = new DRACOLoader()
  //   dracoLoader.setDecoderPath('./draco/')
  //   loader.setDRACOLoader(dracoLoader)
  // })
  // directionalLight.shadow.normalBias = 0.05

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        // shadow={{ normalBias: 0.05 }}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.5} />
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      {/* <primitive object={model.scene} scale={0.35} /> */}
      {/* <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Model />
      </Suspense> */}
      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Hamburger scale={0.35} />
        <Fox scale={0.35} />
      </Suspense>
    </>
  )
}
