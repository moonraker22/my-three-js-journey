import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

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
 * Models
 */
const gltfLoader = new GLTFLoader()

// gltfLoader.load(
//   '/models/Duck/glTF/Duck.gltf',
//   (gltf) => {
//     console.log('success')
//     console.log(gltf)
//     // gltf.scene.scale.set(0.1, 0.1, 0.1)
//     // gltf.scene.position.set(0, -4, 0)
//     // scene.add(gltf.scene)
//     scene.add(gltf.scene.children[0])
//   },
//   (progress) => {
//     console.log('progress')
//     console.log(progress)
//   },
//   (error) => {
//     console.log('error')
//     console.log(error)
//   }
// )
// OR ----------------
//   gltfLoader.load(
//     '/models/Duck/glTF/Duck.gltf', // Default glTF

// // Or
// gltfLoader.load(
//     '/models/Duck/glTF-Binary/Duck.glb', // glTF-Binary

// // Or
// gltfLoader.load(
//     '/models/Duck/glTF-Embedded/Duck.gltf', // glTF-Embedded
// )

// Helmet
// gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
// scene.add(gltf.scene.children[0]) // only a part of the model
// for (const child of gltf.scene.children) {
//   scene.add(child) // some get overwritten
// }
// console.log(gltf)

// One way to get all the parts
// while (gltf.scene.children.length) {
//   scene.add(gltf.scene.children[0])
// }

// Another way to get all the parts
// const children = [...gltf.scene.children]
// for (const child of children) {
//   scene.add(child)
// }

// Another way to get all the parts
//   scene.add(gltf.scene)
// })

// Duck with Draco compression
// Copy the draco folder from node_modules/three/examples/js/libs/draco to public/draco
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('/draco/')
// gltfLoader.setDRACOLoader(dracoLoader)
// gltfLoader.load('/models/Duck/glTF-Draco/Duck.gltf', (gltf) => {
//   scene.add(gltf.scene.children[0])
// })

// Animations
let mixer = null

gltfLoader.load('/models/Fox/glTF/Fox.gltf', (gltf) => {
  gltf.scene.scale.set(0.03, 0.03, 0.03)
  scene.add(gltf.scene)

  mixer = new THREE.AnimationMixer(gltf.scene)
  const action = mixer.clipAction(gltf.animations[2])
  action.play()
})
/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: '#444444',
    metalness: 0,
    roughness: 0.5,
  })
)
floor.receiveShadow = true
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = -7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = -7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime

  // Update controls
  controls.update()

  // Update mixer
  if (mixer) {
    mixer.update(deltaTime)
  }

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
