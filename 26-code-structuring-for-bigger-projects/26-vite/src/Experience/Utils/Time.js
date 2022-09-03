import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter {
  constructor() {
    super()

    // Tick start
    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  // Loop Tick Function
  tick() {
    // Update time
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.trigger('tick')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}
