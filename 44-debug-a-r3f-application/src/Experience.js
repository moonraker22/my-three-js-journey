import { OrbitControls } from '@react-three/drei'
import { monitor, button, useControls } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience() {
  const { color, position, visible, rotation } = useControls('sphere', {
    color: { value: '#ff0000', label: 'Color' },
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
      joystick: 'invertY',
      label: 'Position',
    },
    rotation: { value: [0, 0, 0], label: 'Rotation' },
    visible: { value: true, label: 'Visible' },
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 5],
      label: 'Interval',
    },
    myButton: button(() => {
      console.log('Button clicked')
    }),
    choice: { options: ['a', 'b', 'c'] },
  })
  const { scale } = useControls('cube', {
    scale: {
      value: 1.5,
      step: 0.01,
      min: 0,
      max: 5,
    },
  })
  const { perfVisible } = useControls({
    perfVisible: true,
  })
  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[position.x, position.y, 0]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-x={2} scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  )
}
