import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1
// scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
scene.add(camera)

console.log(mesh.position.length())
console.log(mesh.position.distanceTo(camera.position))
console.log(mesh.position.normalize())
console.log(mesh, camera)
// mesh.position.set(0.7, -0.6, 1)
// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// camera.lookAt(new THREE.Vector3(0, -1, 0))
/**
 * Objects
 */
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = -1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5
group.add(cube3)
/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  group.rotation.y += 0.01
  cube1.rotation.y += 0.01
  cube2.rotation.y += 0.01
  cube3.rotation.y += 0.01
}

animate()
