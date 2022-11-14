import { forwardRef } from 'react'
import DrunkEffect from './DrunkEffect.js'

export default forwardRef(function Drunk(props, ref) {
  console.log(props)
  const effect = new DrunkEffect(props, ref)

  return <primitive ref={ref} object={effect} />
})
