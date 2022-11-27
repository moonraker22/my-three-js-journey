import { OrbitControls } from '@react-three/drei'
import { Physics, Debug } from '@react-three/rapier'

import Lights from './Lights.js'
import { Level } from './Level.js'
import Player from './Player.js'

export const blockCount = 10

export default function Experience() {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}

      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blockCount} />
        <Player />
      </Physics>
    </>
  )
}
