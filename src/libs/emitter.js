import { vertexShader, fragmentShader } from './shaders'
import Tween from './tween'
import Particle from './particle'
import utils from '@/utils'
import { Shape } from './const'


class ParticleEmitter {

  constructor(params) {

    this.particles = []
    this.particlesPerSecond = 100
    this.particleDeathAge = 1.0

    this.age = 0
    this.alive = true
    this.deathAge = 60
    this.loop = true
    
    this.particleCount = this.particlesPerSecond * Math.min(this.particleDeathAge, this.age)
    
    this.position = new THREE.Vector3()
    this.positionShape = Shape.CUBE
    this.positionRange = new THREE.Vector3()
    this.positionRadius = 0

    this.velocity = new THREE.Vector3()
    this.velocityShape = Shape.CUBE
    this.velocityRange = new THREE.Vector3()

    this.speed = 0
    this.speedRange = 0

    this.acceleration = new THREE.Vector3()
    this.accelerationRange = new THREE.Vector3()

    this.angle = 0
    this.angleRange = 0
    this.angleVelocity = 0
    this.angleVelocityRange = 0
    this.angleAcceleration = 0
    this.angleAccelerationRange = 0

    this.size = 0.0
    this.sizeRange = 0.0

    this.color = new THREE.Vector3(1.0, 1.0, 1.0)
    this.colorRange = new THREE.Vector3(0.0, 0.0, 0.0)
    this.colorTween = new Tween()

    this.opacity = 1.0
    this.opacityRange = 0.0

    this.blendMode = THREE.NormalBlending

    this.setParameters(params)
    this.createParticles()
  }

  createParticles() {
    const count = this.particleCount 
    const positionArray = new Float32Array(count * 3)
    const colorArray = new Float32Array(count * 3)

    const sizeArray = new Float32Array(count)
    const angleArray = new Float32Array(count)
    const opacityArray = new Float32Array(count)
    const visibleArray = new Float32Array(count)
    
    for(let i = 0; i < count; i++) {
      const particle = this.createParticle()
      positionArray[i*3] = particle.position.x
      positionArray[i*3+1] = particle.position.y
      positionArray[i*3+2] = particle.position.z
      colorArray[i*3] = particle.color.r
      colorArray[i*3+1] = particle.color.g
      colorArray[i*3+2] = particle.color.b
      sizeArray[i] = particle.size
      angleArray[i] = particle.angel
      opacityArray[i] = particle.opacity
      visibleArray[i] = particle.alive
      this.particles[i] = particle
    }
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
    this.geometry.setAttribute('angle', new THREE.BufferAttribute(angleArray, 1))
    this.geometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1))
    this.geometry.setAttribute('visible', new THREE.BufferAttribute(visibleArray, 1))
    this.geometry.setAttribute('opacity', new THREE.BufferAttribute(opacityArray, 1))

    this.material.blending = this.blendMode
	  if(this.blendMode != THREE.NormalBlending) {
      this.material.depthTest = false
    }
    this.mesh = new THREE.Points(this.geometry, this.material)
  }

  setParameters(params) {

    this.sizeTween = new Tween()
    this.colorTween = new Tween()
    this.opacityTween = new Tween()

    Object.assign(this, params)

    this.particles = []
    this.age = 0.0
    this.alive = true
    this.particleCount = this.particlesPerSecond * Math.min(this.particleDeathAge, this.deathAge)

    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        texture: { value: this.texture }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      alphaTest: 0.5,
      depthTest: false,
      blending: THREE.AdditiveBlending
    })
  
    this.mesh = new THREE.Points(this.geometry, this.material)

  }

  createParticle() {

    const particle = new Particle()
    particle.sizeTween = this.sizeTween
    particle.colorTween = this.colorTween
    particle.opacityTween = this.opacityTween
    

    if(this.positionShape == Shape.CUBE) {
      particle.position = utils.randomVector3(this.position, this.positionRange)
    }

    if(this.positionShape == Shape.SPHERE) {
      const z = 2 * Math.random() - 1
      const t = Math.PI * 2 * Math.random()
      const r = Math.sqrt(1 - z*z)
      const vec3 = new THREE.Vector3(r * Math.cos(t), r * Math.sin(t), z)
      particle.position = new THREE.Vector3().addVectors(this.position, vec3.multiplyScalar(this.positionRadius))
    }

    if(this.velocityShape == Shape.CUBE) {
      particle.velocity = utils.randomVector3(this.velocity, this.velocityRange)
    }

    if(this.velocityShape == Shape.SPHERE) {
      const direction = new THREE.Vector3().subVectors(particle.position, this.position)
      const speed = utils.randomValue(this.speed, this.speedRange)
      particle.velocity = direction.normalize().multiplyScalar(speed)
    }

    particle.acceleration = utils.randomVector3(this.acceleration, this.accelerationRange)
    
    particle.angle = utils.randomValue(this.angle, this.angleRange)
    particle.angleVelocity = utils.randomValue(this.angleVelocity, this.angleVelocityRange)
    particle.angleAcceleration = utils.randomValue(this.angleAcceleration, this.angleAccelerationRange)

    particle.size = utils.randomValue(this.size, this.sizeRange)

    const color = utils.randomVector3(this.color, this.colorRange)
    particle.color = new THREE.Color().setHSL(color.x, color.y, color.z)

    particle.opacity = utils.randomValue(this.opacity, this.opacityRange)
    particle.age = 0

    return particle
  }

  update(dt) {

    const recycleIndices = []
    const positionArray = this.geometry.attributes.position.array
    const opacityArray = this.geometry.attributes.opacity.array
    const visibleArray = this.geometry.attributes.visible.array
    const colorArray = this.geometry.attributes.color.array
    const angleArray = this.geometry.attributes.angle.array
    const sizeArray = this.geometry.attributes.size.array

    for(let i = 0; i < this.particleCount; i++) {
      const particle = this.particles[i]
      if(particle.alive) {
        particle.update(dt)
        if(particle.age > this.particleDeathAge) {
				  particle.alive = 0.0
				  recycleIndices.push(i)
        }
        positionArray[i*3] = particle.position.x
        positionArray[i*3+1] = particle.position.y
        positionArray[i*3+2] = particle.position.z
        colorArray[i*3] = particle.color.r
        colorArray[i*3+1] = particle.color.g
        colorArray[i*3+2] = particle.color.b
        visibleArray[i] = particle.alive
        opacityArray[i] = particle.opacity
        angleArray[i] = particle.angle
        sizeArray[i] = particle.size
      }
    }
    
    this.geometry.attributes.size.needsUpdate = true
    this.geometry.attributes.color.needsUpdate = true
    this.geometry.attributes.angle.needsUpdate = true
    this.geometry.attributes.visible.needsUpdate = true
    this.geometry.attributes.opacity.needsUpdate = true
    this.geometry.attributes.position.needsUpdate = true

    if(!this.alive) return

    if(this.age < this.particleDeathAge) {
      let startIndex = Math.round(this.particlesPerSecond * (this.age + 0))
      let endIndex = Math.round(this.particlesPerSecond * (this.age + dt))
      if(endIndex > this.particleCount) {
        endIndex = this.particleCount
      }
      for(let i = startIndex; i < endIndex; i++) {
        this.particles[i].alive = 1.0
      }
    }

    for(let j = 0;j < recycleIndices.length; j++) {
      let i = recycleIndices[j]
      this.particles[i] = this.createParticle()
      this.particles[i].alive = 1.0
      positionArray[i*3] = this.particles[i].position.x
      positionArray[i*3+1] = this.particles[i].position.y
      positionArray[i*3+2] = this.particles[i].position.z
    }
    this.geometry.attributes.position.needsUpdate = true

    this.age += dt

    if(this.age > this.deathAge && !this.loop) {
      this.alive = false
    }

  }


}

export default ParticleEmitter