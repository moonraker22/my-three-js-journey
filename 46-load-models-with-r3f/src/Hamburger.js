import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Hamburger(props) {
  const { nodes, materials } = useGLTF('./hamburger.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottomBun.geometry}
        material={materials.BunMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.meat.geometry}
        material={materials.SteakMaterial}
        position={[0, 2.82, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cheese.geometry}
        material={materials.CheeseMaterial}
        position={[0, 3.04, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.topBun.geometry}
        material={materials.BunMaterial}
        // position={[0, 1.77, 0]}
        position={[0, 3.77, 0]}
      />
    </group>
  )
}

useGLTF.preload('./hamburger.glb')
