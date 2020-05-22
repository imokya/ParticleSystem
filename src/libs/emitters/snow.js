import Emitter from '../emitter'
import Tween from '../tween'
import { Shape } from '../const'

class SnowEmitter extends Emitter {

  constructor() {

    super({
      positionShape: Shape.CUBE,
      position: new THREE.Vector3(0, 200, 0),
      positionRange: new THREE.Vector3(500, 0, 500),
      
      velocity: Shape.CUBE,
      velocity: new THREE.Vector3(0, -60, 0),
      velocityRange: new THREE.Vector3(50, 20, 50), 
      acceleration: new THREE.Vector3 (0, -10,0),
      
      angle: 0,
      angleRange: 720,
      angleVelocity: 0,
      angleVelocityRange: 60,
      
      texture : new THREE.TextureLoader().load( 'img/snowflake.png' ),
        
      sizeTween: new Tween([0, 0.25], [1, 10] ),
      colorBase: new THREE.Vector3(0.66, 1.0, 0.9), 
      opacityTween: new Tween([2, 3], [0.8, 0]),
  
      particlesPerSecond: 200,
      particleDeathAge: 4.0,		
      deathAge    : 60
    })
  }

}

export default SnowEmitter