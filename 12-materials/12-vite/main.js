import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
)
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/5.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/6.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
// const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
])

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial({
//   map: doorColorTexture,
// }) same as ->
// const material = new THREE.MeshBasicMaterial()

// const material = new THREE.MeshNormalMaterial()

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()
// material.color = new THREE.Color(0x00ff00)
// material.wireframe = true

// const material = new THREE.MeshToonMaterial()
// material.color = new THREE.Color(0x00ff00)
// material.gradientMap = gradientTexture

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.2
// material.roughness = 0.2
// material.map = doorColorTexture
// material.alphaMap = doorAlphaTexture
// material.transparent = true
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 10

// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.5

// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)

// material.metalnessMap = doorMetalnessTexture

// material.roughnessMap = doorRoughnessTexture

// material.alphaMap = doorAlphaTexture
// material.transparent = true

// material.side = THREE.DoubleSide
// material.side = THREE.BackSide

// material.flatShading = true

// material.wireframe = true

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.side = THREE.DoubleSide
material.envMap = environmentMapTexture

// const material = new THREE.MeshPhysicalMaterial()
// material.metalness = 0.7
// material.roughness = 0.2
// material.clearcoat = 0.1
// material.clearcoatRoughness = 0.1

// material.map = doorColorTexture
// can use any
// material.color = new THREE.Color('#ff0000')
// material.color = new THREE.Color('#f00')
// material.color = new THREE.Color('red')
// material.color = new THREE.Color('rgb(255, 0, 0)')
// material.color = new THREE.Color(0xff0000)
// material.color.set(0x00ff00)

// material.wireframe = true

// must use transparent true for alpha
// material.transparent = true
// material.opacity = 0.5

// material.alphaMap = doorAlphaTexture
// material.alphaMap = gradientTexture
// material.transparent = true

// material.side = THREE.DoubleSide
// material.side = THREE.BackSide

// material.flatShading = true

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.position.x = -1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
)
torus.position.x = 1.5

sphere.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)
plane.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)
torus.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

scene.add(sphere, plane, torus)

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
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
const lightHelper = new THREE.PointLightHelper(pointLight, 0.2)
const gridHelper = new THREE.GridHelper(200, 50)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// pointLight.intensity = 2
// pointLight.distance = 3
// pointLight.decay = 2
scene.add(gridHelper, ambientLight, pointLight, lightHelper)

/**
 * Debug
 */

const gui = new dat.GUI({ width: 400 })
gui.add(material, 'metalness').min(0).max(1).step(0.0001).name('metalness')
gui.add(material, 'roughness').min(0).max(1).step(0.0001).name('roughness')
gui
  .add(material, 'aoMapIntensity')
  .min(0)
  .max(10)
  .step(0.0001)
  .name('aoMapIntensity')
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)

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
  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  plane.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
