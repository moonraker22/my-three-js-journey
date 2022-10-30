import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

export default function CustomGeometry() {
  const geoRef = useRef()

  const verticesCount = 10 * 3
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3)

    for (let i = 0; i < verticesCount * 3; i++)
      positions[i] = (Math.random() - 0.5) * 3

    return positions
  })

  useEffect(() => {
    geoRef.current.computeVertexNormals()
    console.log(geoRef.current.attributes.position.array)
    console.log(geoRef)
  }, [positions])

  //   useEffect(() => {
  //     const geo = geoRef.current
  //     const { vertices } = geo
  //     for (let i = 0; i < vertices.length; i++) {
  //       const v = vertices[i]
  //       v.x += (Math.random() - 0.5) * 0.5
  //       v.y += (Math.random() - 0.5) * 0.5
  //       v.z += (Math.random() - 0.5) * 0.5
  //     }
  //     geo.verticesNeedUpdate = true
  //     geo.computeVertexNormals()
  //   }, [positions])

  //   const geometry = useMemo(() => {
  //     return new BufferGeometry().setFromPoints(positions)
  //   }, [positions])

  return (
    <mesh>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      {/* <meshBasicMaterial color="red" side={THREE.DoubleSide} /> */}
      <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  )
}
