import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import firefliesVertexShader from './shaders/fireflies/vert.glsl'
import firefliesFragmentShader from './shaders/fireflies/frag.glsl'
import portalVertexShader from './shaders/portal/vert.glsl'
import portalFragmentShader from './shaders/portal/frag.glsl'

/**
 * Base
 */
// Debug
const debugObject = {}
const gui = new dat.GUI({
  width: 400,
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// const light = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(light)

// const spotlight = new THREE.SpotLight(0xffffff, 0.5)
// spotlight.position.set(0, 10, 0)
// scene.add(spotlight)

/**
 * Materials
 */
// Pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

// Portal light material
// const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
debugObject.portalColorInner = '#6e6cd5'
debugObject.portalColorOuter = '#e6a2d8'

const portalLightMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorInner: { value: new THREE.Color(debugObject.portalColorInner) },
    uColorOuter: { value: new THREE.Color(debugObject.portalColorOuter) },
  },
  vertexShader: portalVertexShader,
  fragmentShader: portalFragmentShader,
})

gui.addColor(debugObject, 'portalColorInner').onChange(() => {
  portalLightMaterial.uniforms.uColorInner.value.set(
    debugObject.portalColorInner
  )
})

gui.addColor(debugObject, 'portalColorOuter').onChange(() => {
  portalLightMaterial.uniforms.uColorOuter.value.set(
    debugObject.portalColorOuter
  )
})

// Baked material

const bakedTexture = textureLoader.load('resources/portal_baked_psd.jpg')
// const normalMap = textureLoader.load('resources/portal_comp_normal.jpg')
// const aoMap = textureLoader.load('resources/portal_ambient_occlusion.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding
// bakedTexture.anisotropy = 16
// bakedTexture.repeat.set(1, 1)
// bakedTexture.wrapS = THREE.RepeatWrapping
// bakedTexture.wrapT = THREE.RepeatWrapping

const bakedMaterial = new THREE.MeshBasicMaterial({
  map: bakedTexture,
  // normalMap: normalMap,
  // aoMap: aoMap,
})

/**
 * Model
 */
gltfLoader.load('resources/portal.glb', (gltf) => {
  // gltf.scene.traverse((child) => {
  //   child.material = bakedMaterial
  //   console.log(child)
  // })
  scene.add(gltf.scene)

  // Get each object
  const bakedMesh = gltf.scene.children.find((child) => child.name === 'Plane')

  const portalLightMesh = gltf.scene.children.find(
    (child) => child.name === 'PortalLight'
  )
  const poleLightAMesh = gltf.scene.children.find(
    (child) => child.name === 'PoleLightA'
  )
  const poleLightBMesh = gltf.scene.children.find(
    (child) => child.name === 'PoleLightB'
  )

  // Apply materials
  poleLightAMesh.material = poleLightMaterial
  poleLightBMesh.material = poleLightMaterial
  portalLightMesh.material = portalLightMaterial
  bakedMesh.material = bakedMaterial

  // console.log(portalLightMesh)
  // console.log(poleLightAMesh)
  // console.log(poleLightBMesh)
})

/**
 * Fireflies
 */
//Geometry
const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 30
const positionArray = new Float32Array(firefliesCount * 3)
const scaleArray = new Float32Array(firefliesCount)

for (let i = 0; i < firefliesCount; i++) {
  // positionArray[i * 3 + 0] = Math.random() * 4 - 2
  // positionArray[i * 3 + 1] = Math.random() * 2 + 1
  // positionArray[i * 3 + 2] = Math.random() * 4 - 2
  positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
  positionArray[i * 3 + 1] = Math.random() * 2
  positionArray[i * 3 + 2] = (Math.random() - 0.5) * 5
  scaleArray[i] = Math.random()
}
firefliesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positionArray, 3)
)

firefliesGeometry.setAttribute(
  'aScale',
  new THREE.BufferAttribute(scaleArray, 1)
)
// Fireflies material
// const firefliesMaterial = new THREE.PointsMaterial({
//   size: 0.1,
//   sizeAttenuation: true,
// })
const firefliesMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uSize: { value: 200 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uColor: { value: new THREE.Color('white') },
  },
  vertexShader: firefliesVertexShader,
  fragmentShader: firefliesFragmentShader,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
})

// Fireflies debug
gui
  .add(firefliesMaterial.uniforms.uSize, 'value')
  .min(0)
  .max(500)
  .step(1)
  .name('firefliesSize')

// Points
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
scene.add(fireflies)
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

  // Update fireflies
  firefliesMaterial.uniforms.uPixelRatio.value = Math.min(
    window.devicePixelRatio,
    2
  )
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

// Clear color
debugObject.clearColor = '#432749'
renderer.setClearColor(debugObject.clearColor)
gui.addColor(debugObject, 'clearColor').onChange(() => {
  renderer.setClearColor(debugObject.clearColor)
})

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

  // Update materials
  firefliesMaterial.uniforms.uTime.value = elapsedTime
  portalLightMaterial.uniforms.uTime.value = elapsedTime

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
