import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10,
      setBlocksCount: (count) => set({ blocksCount: count }),

      /**
       * Phases
       */
      phase: 'ready',
      start: () => {
        set((state) => {
          if (state.phase === 'ready') return { phase: 'playing' }
          return {}
        })
      },
      restart: () => {
        set((state) => {
          if (state.phase === 'playing' || state.phase === 'ended')
            return { phase: 'ready' }

          return {}
        })
      },

      end: () => {
        set((state) => {
          if (state.phase === 'playing') return { phase: 'ended' }

          return {}
        })
      },
    }
  })
)
