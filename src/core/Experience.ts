import { Scene } from 'three'
import Sizes from '@util/Sizes'
import MainScene from '@scene/MainScene'
import Time from '@util/Time'
import Mouse from '@util/Mouse'
import Viewport from '@util/Viewport'
import { Camera } from '@render/Camera'
import { Renderer } from '@render/Renderer'

let instance: Experience | null = null
export default class Experience {
	canvas!: HTMLCanvasElement
	sizes!: Sizes
	scene!: Scene
	camera!: Camera
	renderer!: Renderer
	mainScene!: MainScene
	time!: Time
	mouse!: Mouse
	viewport!: Viewport

	constructor(canvas?: HTMLCanvasElement) {
		if (canvas && !instance) {
			this.canvas = canvas
		}

		if (!canvas && !instance) {
			throw new Error('No canvas provided')
		}

		// Singleton
		if (instance) {
			return instance
		}
		instance = this

		// Setup
		this.sizes = new Sizes()
		this.scene = new Scene()
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.mouse = new Mouse()
		this.time = new Time()
		this.viewport = new Viewport()
		this.mainScene = new MainScene()

		this.time.on('tick', () => {
			this.update()
		})

		this.sizes.on('resize', () => {
			this.resize()
		})
		this.resize()
	}

	resize() {
		this.camera.resize()
		this.renderer.resize()
		this.viewport.resize()
	}

	update() {
		this.mouse.update()
		this.camera.update()
		this.renderer.update()
	}
}
