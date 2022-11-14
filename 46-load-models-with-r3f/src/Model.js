import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

//Using DREI
import { Clone, useGLTF } from '@react-three/drei'

export default function Model() {
  useGLTF.preload('./hamburger-draco.glb')
  //   const model = useLoader(
  //     GLTFLoader,
  //     './FlightHelmet/glTF/FlightHelmet.gltf',
  //     (loader) => {
  //       const dracoLoader = new DRACOLoader()
  //       dracoLoader.setDecoderPath('./draco/')
  //       loader.setDRACOLoader(dracoLoader)
  //     }
  //   )
  //   const model = useLoader(GLTFLoader, './hamburger.glb', (loader) => {
  //     const dracoLoader = new DRACOLoader()
  //     dracoLoader.setDecoderPath('./draco/')
  //     loader.setDRACOLoader(dracoLoader)
  //   })

  //   const model = useGLTF('./hamburger.glb')

  // with DRACO compression
  const model = useGLTF('./hamburger-draco.glb')

  return (
    <>
      <Clone object={model.scene} scale={0.35} position-x={-4} />
      <Clone object={model.scene} scale={0.35} position-x={0} />
      <Clone object={model.scene} scale={0.35} position-x={4} />
      {/* <primitive object={model.scene} scale={0.35} position-y={-1} /> */}
    </>
  )
}
