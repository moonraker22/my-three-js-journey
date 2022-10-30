import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Experience from './Experience.js'
import App from './App.js'
import './style.css'

const root = createRoot(document.querySelector('#root'))

root.render(
  // <App clickersCount={10}>
  //   <h1>My First React App</h1>
  //   <h2>And a fancy subtitle</h2>
  // </App>

  // <Canvas
  //   style={{ background: 'black' }}
  //   camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6], zoom: 100 }}
  //   orthographic
  // >
  <Canvas
    // can clamp pixel ratio to 1 for performance
    //dpr={1}
    // can set pixel ratio to 2 for retina
    dpr={[1, 2]}
    //style={{ background: 'black' }}
    camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}
    // By default, R3F sets the toneMapping to ACESFilmicToneMapping flat to turn off
    //flat
    gl={{
      antialias: true,
      // add different toneMapping
      //toneMapping: THREE.CineonToneMapping,
      toneMapping: THREE.ACESFilmicToneMapping,
      // We usually want to output colors as sRGBEncoding, but we can change it to LinearEncoding if needed:
      //encoding: THREE.LinearEncoding,
      //SRGBEncoding is the default
      outputEncoding: THREE.sRGBEncoding,
      // We can also change the default gammaFactor to 2.2 if we want to:
      //gammaFactor: 2.2,
    }}
    //We can get the same result by adding the linear attribute to the <Canvas>:
    // linear
  >
    <Experience />
    {/* <OrbitControls /> */}
  </Canvas>
)
