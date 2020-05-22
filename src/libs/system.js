class ParticleSystem {

  constructor(params) {
    Object.assign(this, params)
  }

  get emitter() {
    return this._emitter
  }

  set emitter(val) {
    this._emitter = val
    this.mesh = this._emitter.mesh
  }

  update() {
    const now = +new Date
    const dt = (now - this._startTime) / 1000
    this._emitter.update(dt*0.5)
    this._startTime = now
    this.id = requestAnimationFrame(this.update.bind(this))
  }

  start() {
    this._startTime = +new Date
    this.update()
  }

  stop() {
    cancelAnimationFrame(this.id)
  }

  destroy() {
    this.stop()
    this.mesh.parent.remove(this.mesh)
  }

}

export default ParticleSystem