import * as THREE from 'three'

import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.environment = new Environment()

    this.resources = this.experience.resources

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      this.floor = new Floor()
      this.fox = new Fox()
      this.environment = new Environment()
    })

    // Test mesh
    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshStandardMaterial()
    // )
    // this.scene.add(testMesh)
  }

  update() {
    if (this.fox) this.fox.update()
  }
}
