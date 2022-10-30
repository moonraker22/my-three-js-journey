import { useRef } from 'react'
import { useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import CustomGeometry from './CustomGeometry.js'

extend({ OrbitControls })

export default function Experience() {
  //   const three = useThree()
  //   console.log(three)

  const { camera, gl } = useThree()

  const cubeRef = useRef()
  const sphereRef = useRef()
  const groupRef = useRef()
  useFrame((state, delta) => {
    // console.log(delta)
    cubeRef.current.rotation.y += 0.01
    cubeRef.current.rotation.y += delta
    sphereRef.current.position.x = Math.sin(state.clock.getElapsedTime())
    sphereRef.current.position.z = Math.cos(state.clock.getElapsedTime())
    sphereRef.current.position.y = Math.sin(state.clock.getElapsedTime())
    sphereRef.current.scale.x = Math.abs(Math.sin(state.clock.getElapsedTime()))
    sphereRef.current.scale.y = Math.abs(Math.sin(state.clock.getElapsedTime()))
    sphereRef.current.scale.z = Math.abs(Math.sin(state.clock.getElapsedTime()))
    groupRef.current.rotation.y += delta

    const angle = state.clock.elapsedTime
    // console.log(angle)
    state.camera.position.x = Math.sin(angle) * 8
    state.camera.position.z = Math.cos(angle) * 8
    state.camera.position.y = Math.sin(angle) * 8
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      {/* <mesh>
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh> */}
      {/* <mesh scale={1.5} position-z={-2} rotation-y={Math.PI * 0.25}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <boxGeometry />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh> */}
      <orbitControls args={[camera, gl.domElement]} />
      {/* <directionalLight position={[1, 2, 3]} intensity={1.5} /> */}
      <directionalLight />
      <ambientLight intensity={0.5} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <group ref={groupRef}>
        <mesh position={[-2, 1, 0]} ref={sphereRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
        <mesh position={[2, 1, 0]} rotateX={Math.PI * 0.5} ref={cubeRef}>
          <boxGeometry />
          <meshStandardMaterial color="blue" />
        </mesh>
        <CustomGeometry />
      </group>
    </>
  )
}
