import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import CANNON from 'cannon'

// Pmndrs updated cannon-es
// import * as CANNON from 'cannon-es'

// console.log(CANNON)
/**
 * Physics
 */
const world = new CANNON.World()

// Set gravity
world.gravity.set(0, -9.82, 0)
world.broadphase = new CANNON.SAPBroadphase(world)
world.solver.iterations = 20
world.allowSleep = true

/**
 * Sounds
 */
const hitSound = new Audio('/sounds/hit.mp3')

// const playHitSound = () => {
//   hitSound.play()
// }

const playHitSound = (collision) => {
  // hitSound.currentTime = 0
  // hitSound.play()
  // console.log(collision)
  // console.log(collision.contact.getImpactVelocityAlongNormal())
  const impactStrength = collision.contact.getImpactVelocityAlongNormal()

  if (impactStrength > 1.5) {
    hitSound.volume = Math.random()
    hitSound.currentTime = 0
    hitSound.play()
  }
}
// const concreteMaterial = new CANNON.Material('concrete')
// const plasticMaterial = new CANNON.Material('plastic')

// const concretePlasticContactMaterial = new CANNON.ContactMaterial(
//   concreteMaterial,
//   plasticMaterial,
//   {
//     friction: 0.1,
//     restitution: 0.7,
//   }
// )
// world.addContactMaterial(concretePlasticContactMaterial)

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  }
)
// world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial
// Create a sphere
// const sphereShape = new CANNON.Sphere(0.5)
// const sphereBody = new CANNON.Body({
//   mass: 1,
//   shape: sphereShape,
//   // material: plasticMaterial,
//   // material: defaultMaterial,
// })
// sphereBody.position.set(0, 3, 0)
// // sphereBody.velocity.set(0, 0, 0)
// // sphereBody.angularVelocity.set(0, 0, 0)
// // sphereBody.angularDamping = 0.5
// // sphereBody.linearDamping = 0.5
// sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0))
// world.addBody(sphereBody)

const planeShape = new CANNON.Plane()
const planeBody = new CANNON.Body()
// planeBody.material = concreteMaterial
// planeBody.material = defaultMaterial
planeBody.mass = 0
planeBody.addShape(planeShape)
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
world.addBody(planeBody)

/**
 * Debug
 */
const gui = new dat.GUI()
const debugObject = {}
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
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.png',
  '/textures/environmentMaps/0/nx.png',
  '/textures/environmentMaps/0/py.png',
  '/textures/environmentMaps/0/ny.png',
  '/textures/environmentMaps/0/pz.png',
  '/textures/environmentMaps/0/nz.png',
])

/**
 * Test sphere
 */
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 32, 32),
//   new THREE.MeshStandardMaterial({
//     metalness: 0.3,
//     roughness: 0.4,
//     envMap: environmentMapTexture,
//     envMapIntensity: 0.5,
//   })
// )
// sphere.castShadow = true
// sphere.position.y = 0.5
// scene.add(sphere)

/**
 * Function to create both three js and cannon js objects
 */

let objectsToUpdate = []

// Three.js mesh
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
  envMapIntensity: 0.5,
})
const createSphere = (radius, position) => {
  // Three.js mesh
  const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
  mesh.castShadow = true
  mesh.scale.set(radius, radius, radius)
  mesh.position.copy(position)
  scene.add(mesh)

  // Cannon.js body
  const shape = new CANNON.Sphere(radius)

  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: shape,
    material: defaultMaterial,
  })
  body.position.copy(position)
  world.addBody(body)

  // Save in objects to update
  objectsToUpdate.push({ mesh, body })

  body.addEventListener('collide', playHitSound)
}

// createSphere(0.5, { x: 0, y: 3, z: 0 })

// add to dat gui
debugObject.createSphere = () => {
  // createSphere(0.5, { x: 0, y: 3, z: 0 })
  createSphere(Math.random() * 0.5, {
    x: (Math.random() - 0.5) * 3,
    y: 3,
    z: (Math.random() - 0.5) * 3,
  })
}
gui.add(debugObject, 'createSphere')

/**
 * Boxes
 */

// Create box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
  envMapIntensity: 0.5,
})
const createBox = (width, height, depth, position) => {
  // Three.js mesh
  const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
  mesh.scale.set(width, height, depth)
  mesh.castShadow = true
  mesh.position.copy(position)
  scene.add(mesh)

  // Cannon.js body
  const shape = new CANNON.Box(
    new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5)
  )

  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: shape,
    material: defaultMaterial,
  })
  body.position.copy(position)
  world.addBody(body)

  // Save in objects
  objectsToUpdate.push({ mesh, body })

  body.addEventListener('collide', playHitSound)
}

createBox(1, 1.5, 2, { x: 0, y: 3, z: 0 })

debugObject.createBox = () => {
  createBox(Math.random(), Math.random(), Math.random(), {
    x: (Math.random() - 0.5) * 3,
    y: 3,
    z: (Math.random() - 0.5) * 3,
  })
}
gui.add(debugObject, 'createBox')
// Create a plane
/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: '#777777',
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
  })
)
floor.receiveShadow = true
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
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
camera.position.set(-3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Reset
debugObject.reset = () => {
  for (const object of objectsToUpdate) {
    // Remove body
    object.body.removeEventListener('collide', playHitSound)
    world.removeBody(object.body)

    // Remove mesh
    scene.remove(object.mesh)
  }

  // Remove event listener
  document.body.removeEventListener('collide', playHitSound)

  // Reset arrays
  objectsToUpdate = []
  // objectsToUpdate.splice(0, objectsToUpdate.length)

  // Reset cannon world
  // world = new CANNON.World()
  // world.broadphase = new CANNON.NaiveBroadphase()
  // world.solver.iterations = 10
  // world.gravity.set(0, -9.82, 0)
  // world.defaultContactMaterial.contactEquationStiffness = 1e9
  // world.defaultContactMaterial.contactEquationRelaxation = 4
  // world.defaultContactMaterial.frictionEquationStiffness = 1e9
  // world.defaultContactMaterial.frictionEquationRegularizationTime = 4
}
gui.add(debugObject, 'reset')

/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime

  // Update controls
  controls.update()

  // Update physics
  // sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position)
  world.step(1 / 60, deltaTime, 3)
  for (const object of objectsToUpdate) {
    object.mesh.position.copy(object.body.position)
    object.mesh.quaternion.copy(object.body.quaternion)
  }

  // Update sphere

  // sphere.position.x = sphereBody.position.x
  // sphere.position.y = sphereBody.position.y
  // sphere.position.z = sphereBody.position.z

  // or  use copy
  // sphere.position.copy(sphereBody.position)
  // sphere.quaternion.copy(sphereBody.quaternion)

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
