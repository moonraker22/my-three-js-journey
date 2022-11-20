import { useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {
  InstancedRigidBodies,
  CylinderCollider,
  BallCollider,
  CuboidCollider,
  Debug,
  RigidBody,
  Physics,
} from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useMemo, useEffect, useState, useRef } from 'react'
import * as THREE from 'three'

export default function Experience() {
  const torusRef = useRef()
  console.log(
    '🚀 ~ file: Experience.js ~ line 9 ~ Experience ~ torusRef',
    torusRef.current
  )
  const cube = useRef()
  const cubes = useRef()
  const sphere = useRef()
  const twister = useRef()

  const cubesCount = 2000
  const cubeTransforms = useMemo(() => {
    const positions = []
    const rotations = []
    const scales = []

    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ])
      rotations.push([Math.random(), Math.random(), Math.random()])

      const scale = 0.2 + Math.random() * 0.8
      scales.push([scale, scale, scale])
    }

    return { positions, rotations, scales }
  }, [])
  console.log(
    '🚀 ~ file: Experience.js ~ line 41 ~ cubeTransforms ~ cubeTransforms',
    cubeTransforms
  )

  const [hitSound] = useState(() => new Audio('./hit.mp3'))
  const hamburger = useGLTF('./hamburger.glb')

  const cubeJump = () => {
    console.log(cube.current)
    // cube.current.applyImpulse({ x: 0, y: 2, z: 0 })
    // cube.current.applyTorqueImpulse({ x: 3, y: 3, z: 0 })

    const mass = cube.current.mass()
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
    console.log(mass)
  }

  const sphereJump = () => {
    console.log(sphere.current)
    sphere.current.applyImpulse({ x: 0, y: 50, z: 0 })
    // sphere.current.applyTorqueImpulse({ x: 3, y: 3, z: 0 })

    const mass = sphere.current.mass()
    console.log(mass)
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // console.log(state)
    const eulerRotation = new THREE.Euler(0, 15 * time, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)

    // works on mesh ref not on rigid body ref
    // twister.current.quaternion.copy(quaternionRotation)

    twister.current.setNextKinematicRotation(quaternionRotation)
    // twister.current.setNextKinematicTranslation({
    //   x: 0,
    //   y: Math.sin(time) * 2,
    //   z: 0,
    // })
    const angle = time * 0.5
    const x = Math.cos(angle) * 2
    const z = Math.sin(angle) * 2
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z })
  })

  const collisionEnter = () => {
    console.log('collision!')
    hitSound.currentTime = 0
    hitSound.volume = Math.random()
    hitSound.play()
  }

  // Doesn't work with instanced rigid bodies
  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new THREE.Matrix4()
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     )
  //     cubes.current.setMatrixAt(i, matrix)
  //   }
  //   cubes.current.instanceMatrix.needsUpdate = true
  // }, [])
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.81, 0]}>
        {/* <Debug /> */}

        <InstancedRigidBodies
          positions={cubeTransforms.positions}
          rotations={cubeTransforms.rotations}
          scales={cubeTransforms.scales}
        >
          <instancedMesh
            castShadow
            receiveShadow
            ref={cubes}
            args={[null, null, cubesCount]}
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>

        <RigidBody colliders={false}>
          <primitive object={hamburger.scene} scale={0.2} />
          <CylinderCollider args={[0.5, 1]} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
          {/* <CuboidCollider args={[5, 0.5, 5]} position={[0, 2.5, 0]} /> */}
        </RigidBody>

        {/* <RigidBody colliders="ball">
          <mesh castShadow position={[0, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody> */}

        {/* <RigidBody>
          <mesh castShadow position={[2, 2, 0]}>
            <boxGeometry args={[3, 2, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        {/* <RigidBody
          colliders={false}
          position={[0, 1, -0.25]}
          rotation={[Math.PI * 0.1, 0, 0]}
        >
          <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider
            args={[0.25, 1, 0.25]}
            position={[0, 0, 1]}
            rotation={[-Math.PI * 0.35, 0, 0]}
          />
          <BallCollider args={[1.5]} />
          <mesh
            ref={torusRef}
            castShadow
            position={[0, 1, -0.25]}
            rotation={[Math.PI * 0.1, 0, 0]}
          >
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        <RigidBody colliders={false} position={[-1.5, 2, 0]} ref={sphere}>
          <mesh castShadow onClick={sphereJump}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
          <BallCollider mass={3.5} args={[1]} />
        </RigidBody>

        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          gravityScale={0.9}
          restitution={0}
          friction={0.7}
          mass={0.9}
          colliders={false}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={0.5} />
        </RigidBody>

        <RigidBody
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
          mass={10}
          // onCollisionEnter={collisionEnter}
          // onCollisionExit={() => {
          //   console.log('exit')
          // }}
          // onSleep={() => {
          //   console.log('sleep')
          // }}
          // onWake={() => {
          //   console.log('wake')
          // }}
        >
          <mesh castShadow scale={[0.4, 0.6, 6]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" restitution={1} friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  )
}
