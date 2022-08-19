/**
 * @type {THREE.Scene}
 *
 */

import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, {
  duration: 1,
  delay: 2,
  x: 0,
  onComplete: () => console.log('onComplete'),
})
gsap
  .to(mesh.rotation, { duration: 1, delay: 1, y: Math.PI * 0.25 })
  .then(() => {
    mesh.rotation.y = 0
    return gsap.to(mesh.rotation, { duration: 1, delay: 1, y: Math.PI * 0.5 })
  })
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
/**
 * Animate with requestAnimationFrame
 */
let time = Date.now()
const clock = new THREE.Clock()
let colors = [0xff0000, 0x00ff00, 0x0000ff]
const tick = () => {
  // Update objects
  // mesh.rotation.y += 0.01
  // const currentTime = Date.now()
  // const deltaTime = currentTime - time
  // time = currentTime
  // //   // Update objects
  // mesh.rotation.y += 0.001 * deltaTime
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  // mesh.rotation.y = elapsedTime
  // mesh.position.x = Math.cos(elapsedTime * 0.5)
  // mesh.position.y = Math.sin(elapsedTime)
  // mesh.position.z = Math.sin(elapsedTime * 0.5)
  // mesh.rotation.y += 0.01
  // mesh.rotation.x += 0.01
  // mesh.rotation.z += 0.01
  // mesh.scale.x = Math.sin(elapsedTime)
  // mesh.scale.y = Math.sin(elapsedTime)
  // mesh.scale.z = Math.sin(elapsedTime)
  // mesh.material.color.set(colors[Math.floor(elapsedTime) % 3])
  // mesh.material.color.setHSL(elapsedTime % 1, 1, 0.5)

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

/**
 * Animate with time
 */
// let time = Date.now()

// const tick = () => {
//   // Time
//   const currentTime = Date.now()
//   const deltaTime = currentTime - time
//   time = currentTime

//   // Update objects
//   mesh.rotation.y += 0.01 * deltaTime

//   // ...
// }

// tick()
