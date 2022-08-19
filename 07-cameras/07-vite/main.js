import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
  // new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  // new THREE.SphereGeometry(0.5, 32, 32),
  // new THREE.TorusGeometry(0.7, 0.2, 16, 100),
  // new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16),
  // new THREE.IcosahedronGeometry(0.5, 1),
  // new THREE.TetrahedronGeometry(0.5, 1),
  // new THREE.OctahedronGeometry(0.5, 1),
  // new THREE.DodecahedronGeometry(0.5, 1),
  // new THREE.ConeGeometry(0.5, 1, 32),
  // new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
  // new THREE.PlaneGeometry(1, 1, 100, 100),
  // new THREE.CircleGeometry(0.5, 32),
  // new THREE.RingGeometry(0.5, 1, 32),
  new THREE.TorusGeometry(0.7, 0.2, 16, 100),

  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
)
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// )
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

// Cursor
const cursor = {
  x: 0,
  y: 0,
}

// window.addEventListener('mousemove', (event) => {
//   // console.log(event.clientX , event.clientY)

//   // look at camera
//   // cursor.x = -(event.clientX / sizes.width - 0.5)
//   // cursor.y = event.clientY / sizes.height - 0.5

//   // look away from camera
//   cursor.x = event.clientX / sizes.width - 0.5
//   cursor.y = -(event.clientY / sizes.height - 0.5)

//   // camera.position.x = cursor.x * 3
//   // camera.position.y = cursor.y * 3

//   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
//   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
//   camera.position.y = cursor.y * 5

//   camera.lookAt(mesh.position)
//   console.log(cursor.x, cursor.y)
// })

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
console.log('camera', camera)
console.log('controls', controls)

const tick = () => {
  // const elapsedTime = clock.getElapsedTime()

  // // Update objects
  // mesh.rotation.y = elapsedTime
  // // console.log('elapsedTime', elapsedTime)
  // Render
  controls.update()

  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
