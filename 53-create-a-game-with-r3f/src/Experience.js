import { OrbitControls } from '@react-three/drei'
import { Physics, Debug } from '@react-three/rapier'

import Lights from './Lights.js'
import { Level } from './Level.js'
import Player from './Player.js'
import useGame from './stores/useGame.js'

// // export const blockCount = 10

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount)
  const setBlocksCount = useGame((state) => state.setBlocksCount)
  return (
    <>
      {/* <OrbitControls makeDefault /> */}

      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} />
        <Player />
      </Physics>
    </>
  )
}
