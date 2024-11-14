import { PerspectiveCamera, Scene } from 'three'
import Experience from '@core/Experience'
import EventEmitter from '@util/EventEmitter'
import Sizes from '@util/Sizes'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

export class Camera extends EventEmitter {
	experience: Experience
	sizes: Sizes
	scene: Scene
	canvas: HTMLCanvasElement
	instance!: PerspectiveCamera
	controls!: OrbitControls

	constructor() {
		super()
		this.experience = new Experience()

		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		this.instance = new PerspectiveCamera(
			30,
			this.sizes.width / this.sizes.height,
			0.1,
			1000
		)
		this.instance.position.set(0, 0, 5)
		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.minDistance = 10
		this.controls.maxDistance = 25
		// this.controls.autoRotate = true
		// this.controls.autoRotateSpeed = 0.15
		this.controls.enablePan = false
		this.controls.enableDamping = true
		this.controls.zoomSpeed = 0.5
		this.controls.enableZoom = true
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		this.controls.update()
	}
}
