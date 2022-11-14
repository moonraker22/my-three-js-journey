import { useRef, useEffect, useState } from 'react'
import {
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
} from '@react-three/drei'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
// const material = new THREE.MeshMatcapMaterial()

export default function Experience() {
  const [matcapTexture] = useMatcapTexture('613F04_D68C04_A45F04_1F0F04', 256)
  //   console.log(matcapTexture)

  const [torusGeometry, setTorusGeometry] = useState()
  const [sphereGeometry, setSphereGeometry] = useState()
  const [material, setMaterial] = useState()

  //   useEffect(() => {
  //     matcapTexture.encoding = THREE.sRGBEncoding
  //     matcapTexture.needsUpdate = true

  //     material.matcap = matcapTexture
  //     material.needsUpdate = true
  //   }, [])

  //   useFrame((state, delta) => {
  //     for (const donut of donutsGroup.current.children) {
  //       donut.rotation.y += delta * 0.2
  //     }
  //   })
  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.2
    }
  })

  const tourusRef = (
    <torusGeometry args={[1, 0.6, 16, 32]} ref={setTorusGeometry} />
  )
  const sphereRef = (
    <sphereGeometry args={[1, 32, 32]} ref={setSphereGeometry} />
  )

  const boxRef = <boxGeometry args={[1, 1, 1]} ref={setSphereGeometry} />

  //   const donutsGroup = useRef()
  const donuts = useRef([])
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <mesh scale={1.5}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
      {/* <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}
      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.04}
          bevelOffset={0}
          bevelSegments={5}
        >
          MooNRakeR
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
      {/* <group ref={donutsGroup}> */}
      {[...Array(100)].map((_, i) => (
        <mesh
          ref={(element) => (donuts.current[i] = element)}
          scale={0.2 + Math.random() * 0.2}
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          {i < 50 ? tourusRef : boxRef}
          {/* {console.log(i)}
          <torusGeometry args={[1, 0.6, 16, 32]} /> */}
          <meshMatcapMaterial matcap={matcapTexture} />
        </mesh>
      ))}
      {/* </group> */}
    </>
  )
}
