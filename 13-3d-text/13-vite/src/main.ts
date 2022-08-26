import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { Material } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureNumber = 3

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load(
  `/textures/matcaps/${textureNumber}.png`
)
/**
 * Materials and Geometry
 */
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('MooNRakeR', {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  })
  //center geometry ALMOST
  textGeometry.computeBoundingBox()
  // textGeometry.translate(
  //   -textGeometry.boundingBox.max.x * 0.5,
  //   -textGeometry.boundingBox.max.y * 0.5,
  //   -textGeometry.boundingBox.max.z * 0.5
  // )
  // center geometry with bevel
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
  //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
  //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5 // Subtract bevel thickness
  // )
  // center for real
  textGeometry.center()
  // const textMaterial = new THREE.MeshBasicMaterial({
  //   wireframe: true,
  //   opacity: 0.8,
  // })
  // textMaterial.color = new THREE.Color(0xdddddd)
  const text = new THREE.Mesh(textGeometry, material)
  scene.add(text)
  console.log(textGeometry.boundingBox)
})
/**
 * Donuts
 */
for (let i = 0; i < 100; i++) {
  // const donutMaterial = material
  const donut = new THREE.Mesh(donutGeometry, material)
  donut.position.x = (Math.random() - 0.5) * 10
  donut.position.y = (Math.random() - 0.5) * 10
  donut.position.z = (Math.random() - 0.5) * 10
  donut.rotation.x = Math.random() * Math.PI
  donut.rotation.y = Math.random() * Math.PI
  const scale = Math.random()
  donut.scale.set(scale, scale, scale)
  scene.add(donut)
}
console.log(scene)
/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

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
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas as HTMLElement)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
