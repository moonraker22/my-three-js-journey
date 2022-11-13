import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Experience from './Experience.js'

const root = ReactDOM.createRoot(document.querySelector('#root'))

// different ways to set color of background
// const created = ({ gl, scene }) => {
//   //   gl.setClearColor('#ff0000', 0.5)
//   //alpha is the second param
//   scene.background = new THREE.Color('#ff0000')
//   console.log(gl, scene)
// }

root.render(
  <Canvas
    // shadows
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
    // onCreated={created}
  >
    {/* // can also set background color here or any direct child of Canvas */}
    {/* <color attach="background" args={['ivory']} /> */}
    <Experience />
  </Canvas>
)
