import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, -1)
directionalLight.castShadow = true
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(directionalLight)
console.log(directionalLight.shadow)
// Render size
// directionalLight.shadow.mapSize.width = 1024
// directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.mapSize.set(2048, 2048)
// Amplitude
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.bottom = -2
// Near and far
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
// Blur
directionalLight.shadow.radius = 10

gui.add(directionalLight.shadow.camera, 'near').min(0).max(10).step(0.001)
gui.add(directionalLight.shadow.camera, 'far').min(0).max(10).step(0.001)

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
)
scene.add(directionalLightCameraHelper)
/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.castShadow = true

// const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
// plane.rotation.x = -Math.PI * 0.5
// plane.position.y = -0.5
// plane.receiveShadow = true
// scene.add(sphere, plane)
// const plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(5, 5),
//   new THREE.MeshBasicMaterial({
//     map: bakedShadow,
//   })
// )
// plane.rotation.x = -Math.PI * 0.5
// plane.position.y = -0.5
// plane.receiveShadow = false
// scene.add(sphere, plane)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.5
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  })
)
sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

scene.add(sphere, sphereShadow, plane)
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Update the sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5
  sphere.position.z = Math.sin(elapsedTime) * 1.5
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

  // Update the shadow
  sphereShadow.position.x = sphere.position.x
  sphereShadow.position.z = sphere.position.z
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
