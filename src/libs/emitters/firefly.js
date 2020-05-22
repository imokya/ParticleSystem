import Emitter from '../emitter'
import Tween from '../tween'
import { Shape } from '../const'

class FireflyEmitter extends Emitter {

  constructor() {

    super({
      positionShape: Shape.CUBE,
      position: new THREE.Vector3(0, 100, 0),
      positionRange: new THREE.Vector3(400, 200, 400),

      velocityShape: Shape.CUBE,
      velocity: new THREE.Vector3(0, 0, 0),
      velocityRange: new THREE.Vector3(60, 20, 60), 
      
      texture: new THREE.TextureLoader().load('img/spark.png'),

      size: 30.0,
      sizeRange: 2.0,
      opacityTween: new Tween([0.0, 1.0, 1.1, 2.0, 2.1, 3.0, 3.1, 4.0, 4.1, 5.0, 5.1, 6.0, 6.1],[0.2, 0.2, 1.0, 1.0, 0.2, 0.2, 1.0, 1.0, 0.2, 0.2, 1.0, 1.0, 0.2]),				
      color: new THREE.Vector3(0.30, 1.0, 0.6), 
      colorRange: new THREE.Vector3(0.3, 0.0, 0.0),
      particlesPerSecond: 20,
      particleDeathAge: 6.1,		
      deathAge: 600
    })
  }

}

export default FireflyEmitter