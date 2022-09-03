import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'

import Experience from './Experience.js'

export default class Camera {
  constructor(experience) {
    // Different ways to access the experience class
    // this.experience = window.experience

    // Pass this to the constructor in the Experience class
    // this.experience = experience

    // Use singleton in the Experience class
    this.experience = new Experience()

    // Set up
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.setInstance()
    this.setControls()
  }

  // Instance of camera
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )
    this.instance.position.set(6, 4, 8)
    this.scene.add(this.instance)
  }

  // Instance of Controls
  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  // Resize
  resize() {
    console.log('A resize occurred')

    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  // Update
  update() {
    this.controls.update()
  }
}
