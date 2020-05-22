import FlameEmitter from './libs/emitters/flame'
import TunnelEmitter from './libs/emitters/tunnel'
import FireFlyEmitter from './libs/emitters/firefly'
import ExplodeEmitter from './libs/emitters/explode'
import SnowEmitter from './libs/emitters/snow'
import ParticleSystem from './libs/system'
import { Shape } from './libs/const'
import Tween from './libs/tween'

class App {

  constructor() {
    this.init()
  }

  init() {
    this.clock = new THREE.Clock()
    const w = window.innerWidth
    const h = window.innerHeight
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 10000)
    this.camera.position.set(0, 50, 200)
    this.camera.lookAt(new THREE.Vector3())
    document.body.appendChild(this.renderer.domElement)

    const light = new THREE.PointLight(0xffffff, 2, 100)
    light.position.set(0, 30, 10)
    this.scene.add(light)

    const floorGeo = new THREE.PlaneBufferGeometry(1000, 1000, 10)
    const floorMat = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('img/plane.png'),
      side: THREE.DoubleSide
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.position.set(0, -50, 0)
    floor.rotation.x = -Math.PI / 2
    this.scene.add(floor)

    const boxGeo = new THREE.BoxBufferGeometry(10, 10, 10)
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xff0000
    })
    const box = new THREE.Mesh(boxGeo, boxMat)
    box.position.set(0, -30, 0)
    this.scene.add(box)

    const controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    window.addEventListener('resize', this.setSize.bind(this), false)
    this.initParticles()
    this.setSize()
    this.render()

    this.initGui()
  }

  initGui() {
    const gui = new dat.GUI()
	  const parameters = {
      firefly: () => {
        this.ps.destroy()
        this.ps.emitter = new FireFlyEmitter()
        this.scene.add(this.ps.mesh)
        this.ps.start()
      },
      star: () => {
        this.ps.destroy()
        this.ps.emitter = new TunnelEmitter()
        this.scene.add(this.ps.mesh)
        this.ps.start()
      },
      flame: ()=> {
        this.ps.destroy()
        this.ps.emitter = new FlameEmitter()
        this.scene.add(this.ps.mesh)
        this.ps.start()
      },
		  snow: ()=> {
        this.ps.destroy()
        this.ps.emitter = new SnowEmitter()
        this.scene.add(this.ps.mesh)
        this.ps.start()
      },
      explode: ()=> {
        this.ps.destroy()
        this.ps.emitter = new ExplodeEmitter()
        this.scene.add(this.ps.mesh)
        this.ps.start()
      }		
    }
    gui.add(parameters, 'star').name('星星 star tunnel')
    gui.add(parameters, 'flame').name('火焰 flame')
    gui.add(parameters, 'firefly').name('萤火虫 firefly')
    gui.add(parameters, 'snow').name('雪花 snow')
    gui.add(parameters, 'explode').name('爆炸 explode')
    gui.open()
  }

  initParticles() {
    this.ps = new ParticleSystem({
      emitter: new TunnelEmitter()
    })
    this.scene.add(this.ps.mesh)
    this.ps.start()
  }

  render() {
    this.stats.update()
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }

  setSize() {
    const w = window.innerWidth
    const h = window.innerHeight
    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

}

const app = new App()
