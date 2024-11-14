import { Scene, WebGLRenderer } from 'three'
import Experience from '@core/Experience'
import Sizes from '@util/Sizes'
import { Camera } from './Camera'

export class Renderer {
	experience: Experience
	sizes: Sizes
	scene: Scene
	canvas: HTMLCanvasElement
	instance!: WebGLRenderer
	camera: Camera

	constructor() {
		this.experience = new Experience()
		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera

		this.setInstance()
	}

	setInstance() {
		this.instance = new WebGLRenderer({
			antialias: true,
			canvas: this.canvas,
		})
		this.instance.setClearColor('#78839c')
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height)
	}

	update() {
		this.instance.render(this.scene, this.camera.instance)
	}
}
