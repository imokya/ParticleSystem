import Emitter from '../emitter'
import Tween from '../tween'
import { Shape } from '../const'

class FlameEmitter extends Emitter {

  constructor() {

    super({
      positionShape: Shape.SPHERE,
      position: new THREE.Vector3(0, -20, 0),
      positionRadius: 2,
      velocityShape: Shape.CUBE,
      velocity: new THREE.Vector3(0, 100, 0),
      velocityRange: new THREE.Vector3(20, 0, 20),
      texture: new THREE.TextureLoader().load('img/smoke.png'),
      sizeTween: new Tween( [0, 0.3, 1.2], [20, 150, 1] ),
      opacityTween: new Tween( [0.9, 1.5], [1, 0] ),
      colorTween : new Tween( [0.5, 1.0], [new THREE.Vector3(0.02, 1, 0.5), new THREE.Vector3(0.05, 1, 0)] ),
      blendMode : THREE.AdditiveBlending,
      particlesPerSecond: 60
    })
  }

}

export default FlameEmitter