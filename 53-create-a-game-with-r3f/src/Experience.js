import { OrbitControls } from '@react-three/drei'
import { Physics, Debug } from '@react-three/rapier'

import Lights from './Lights.js'
import { Level } from './Level.js'
import Player from './Player.js'
import useGame from './stores/useGame.js'
import Effects from './Effects.js'

// // export const blockCount = 10

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount)
  const blocksSeed = useGame((state) => state.blocksSeed)
  const setBlocksCount = useGame((state) => state.setBlocksCount)
  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      {/* <color args={['#bdedfc']} attach="background" /> */}
      <color args={['#252731']} attach="background" />
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
      <Effects />
    </>
  )
}
