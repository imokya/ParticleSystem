# ParticleSystem
Three.js Particle System devries from stemkoski's ParticleEngine.  
基于three.js的粒子系统，内置火焰，雪花，星轨，萤火虫，爆炸等特效，可以根据自己需要调整参数。  

### Usage
`
const particleSystem = new ParticleSystem()
particleSystem.emitter = new FlameEmitter()
particleSystem.start()
scene.add(particleSystem.mesh)
`
