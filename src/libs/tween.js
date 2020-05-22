class Tween {

  constructor(times, values) {
    this.times = times || []
    this.values = values || []
  }

  lerp(t) {
    if(this.times.length == 0) return
    let i = 0, n = this.times.length
    while(i < n && t > this.times[i]) i++
    if(i == 0) return this.values[0]
    if(i == n) return this.values[n-1]
    const ratio = (t - this.times[i-1]) / (this.times[i] - this.times[i-1])
    if(this.values[0] instanceof THREE.Vector3) {
      return this.values[i-1].clone().lerp(this.values[i], ratio)
    } else {
      return this.values[i-1] + ratio * (this.values[i] - this.values[i-1])
    }
    
  }

}

export default Tween