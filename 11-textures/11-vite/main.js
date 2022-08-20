import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
// import image1 from '/textures/door/color.jpg'
// console.log(image1)
/**
 * Native Javascript texture loader
 */
// const image = new Image()
// image.onload = () => {
//   console.log(image)
// }
// const texture = new THREE.Texture(image)
// image.addEventListener('load', () => {
//   texture.needsUpdate = true
// })
// image.src = '/textures/door/color.jpg'
// const url = new URL(import.meta.url)
// const path = url.pathname
// const dir = path.substring(0, path.lastIndexOf('/'))
// console.log(dir, path, url)
/**
 * THREE js texture loader
 */
// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load(
//   '/textures/door/color.jpg',
//   () => {
//     console.log('loading finished')
//   },
//   () => {
//     console.log('loading progressing')
//   },
//   () => {
//     console.log('loading error')
//   }
// )
// texture.repeat.x = 2
// texture.repeat.y = 3
// texture.wrapS = THREE.RepeatWrapping

/**
 * With Loading Manager
 */
// const loadingManager = new THREE.LoadingManager()
// const textureLoader = new THREE.TextureLoader(loadingManager)
/**
 * With callbacks
 */
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
  console.log('loading started')
}
loadingManager.onLoad = () => {
  console.log('loading finished')
}
loadingManager.onProgress = () => {
  console.log('loading progressing')
}
loadingManager.onError = () => {
  console.log('loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = textureLoader.load(
  '/textures/door/color.jpg',
  () => {
    console.log('loading finished')
  },
  () => {
    console.log('loading progressing')
  },
  () => {
    console.log('loading error')
  }
)
// ...

// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
const colorTexture = textureLoader.load('/textures/minecraft.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
)
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// ambientOcclusionTexture.repeat.x = 2
// ambientOcclusionTexture.repeat.y = 3
// ambientOcclusionTexture.wrapS = THREE.RepeatWrapping
// ambientOcclusionTexture.wrapT = THREE.MirroredRepeatWrapping
// ambientOcclusionTexture.offset.x = 0.5
// ambientOcclusionTexture.offset.y = 0.5
// ambientOcclusionTexture.rotation = Math.PI * 0.25
// ambientOcclusionTexture.center.x = 0.5

// ambientOcclusionTexture.minFilter = THREE.NearestFilter
/**
 * There are 6 possible values for minFilter and magfilter:

THREE.NearestFilter
THREE.LinearFilter
THREE.NearestMipmapNearestFilter
THREE.NearestMipmapLinearFilter
THREE.LinearMipmapNearestFilter
THREE.LinearMipmapLinearFilter
 */
// when using nearst filter don't need to use mipmaps
colorTexture.generateMipmaps = false
// when texture is too big, use nearest filter with mipmaps
// mipmaps store more pixels in the gpu
// colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

//Compress PNG images with https://tinypng.com/

// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load('/textures/door/color.jpg')
// console.log(texture)
// const texture = textureLoader.load(
//   'https://threejsfundamentals.org/threejs/resources/images/wall.jpg'
// )
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
// Or
// const geometry = new THREE.SphereGeometry(1, 32, 32)

// Or
// const geometry = new THREE.ConeGeometry(1, 1, 32)

// Or
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)
console.log(geometry.attributes)

// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const material = new THREE.MeshBasicMaterial({ map: texture })
const material = new THREE.MeshBasicMaterial({
  // map: roughnessTexture,
  // map: metalnessTexture,
  // map: ambientOcclusionTexture,
  // map: normalTexture,
  // map: heightTexture,
  // map: alphaTexture,
  map: colorTexture,
  transparent: true,
  // alphaMap: alphaTexture,
  // side: THREE.DoubleSide,
  // wireframe: true,
  // wireframeLinewidth: 10,
  // wireframeLinejoin: 'round',
  // wireframeLinecap: 'round',
  // wireframeLinewidth: 10,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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
