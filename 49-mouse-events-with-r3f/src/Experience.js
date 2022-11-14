import { useFrame } from '@react-three/fiber'
import { meshBounds, useGLTF, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience() {
  const cube = useRef()
  const sphere = useRef()

  const hamburger = useGLTF('./hamburger.glb')

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2
  })

  const eventHandler = (event) => {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    cube.current.rotation.set(
      Math.random() * 2,
      Math.random() * 2,
      Math.random() * 2
    )
    cube.current.position.set(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    )
    console.log(cube.current.scale)
    console.log('the event occured', event)

    console.log('---')
    console.log('distance', event.distance) // Distance between camera and hit point
    console.log('point', event.point) // Hit point coordinates (in 3D)
    console.log('uv', event.uv) // UV coordinates on the geometry (in 2D)
    console.log('object', event.object) // The object that triggered the event
    console.log('eventObject', event.eventObject) // The object that was listening to the event (useful where there is objects in objects)

    console.log('---')
    console.log('x', event.x) // 2D screen coordinates of the pointer
    console.log('y', event.y) // 2D screen coordinates of the pointer

    console.log('---')
    console.log('shiftKey', event.shiftKey) // If the SHIFT key was pressed
    console.log('ctrlKey', event.ctrlKey) // If the CTRL key was pressed
    console.log('metaKey', event.metaKey)
    cube.current.scale.set(1.5, 1.5, 1.5)
    event.stopPropagation()
    sphere.current.scale.set(
      Math.random() * 2,
      Math.random() * 2,
      Math.random() * 2
    )
    cube.current.scale.set(1, 1, 1)
  }

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh
        position-x={-2}
        onClick={(event) => event.stopPropagation()}
        onPointerEnter={(event) => event.stopPropagation()}
        ref={sphere}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        position-x={2}
        scale={1.5}
        onClick={eventHandler}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default'
        }}
        raycast={meshBounds}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(event) => {
          console.log(event.object)
          event.stopPropagation()
        }}
      />
    </>
  )
}
