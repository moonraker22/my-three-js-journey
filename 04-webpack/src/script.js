import './style.css'

import './style.css'
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 0, 10)

const box2 = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff })
const mesh2 = new THREE.Mesh(box2, material2)
mesh2.position.set(1, 0, 0)

scene.add(mesh2)

scene.add(light)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 1
scene.add(camera)

console.log(document.querySelector('canvas.webgl'))
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl'),
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
