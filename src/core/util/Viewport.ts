import {
	Camera as ThreeCamera,
	OrthographicCamera,
	PerspectiveCamera,
	Vector3,
} from 'three'
import Experience from '@core/Experience'
import { Camera } from '@render/Camera'
import Sizes from './Sizes'

const position = new Vector3()
const defaultTarget = new Vector3()
const tempTarget = new Vector3()

const isOrthographicCamera = (def: ThreeCamera): def is OrthographicCamera =>
	def && (def as OrthographicCamera).isOrthographicCamera

type Size = {
	width: number
	height: number
	top: number
	left: number
}

type ViewportType = Size & {
	/** The initial pixel ratio */
	initialDpr: number
	/** Current pixel ratio */
	dpr: number
	/** size.width / viewport.width */
	factor: number
	/** Camera distance */
	distance: number
	/** Camera aspect ratio: width / height */
	aspect: number
}

export default class Viewport {
	viewport: Omit<ViewportType, 'dpr' | 'initialDpr'>
	experience: Experience
	camera: Camera
	sizes: Sizes

	constructor() {
		this.experience = new Experience()
		this.camera = this.experience.camera
		this.sizes = this.experience.sizes

		this.viewport = this.getCurrentViewport(this.camera.instance, undefined, {
			width: this.sizes.width,
			height: this.sizes.height,
			top: 0,
			left: 0,
		})
	}

	getCurrentViewport(
		camera: ThreeCamera,
		target: Vector3 = defaultTarget,
		size: Size
	): Omit<ViewportType, 'dpr' | 'initialDpr'> {
		const { width, height, top, left } = size
		const aspect = width / height
		if (target instanceof Vector3) tempTarget.copy(target)
		// @ts-ignore
		else tempTarget.set(target.x, target.y, target.z)
		const distance = camera.getWorldPosition(position).distanceTo(tempTarget)
		if (isOrthographicCamera(camera)) {
			return {
				width: width / camera.zoom,
				height: height / camera.zoom,
				top,
				left,
				factor: 1,
				distance,
				aspect,
			}
		} else {
			const fov = ((camera as PerspectiveCamera).fov * Math.PI) / 180 // convert vertical fov to radians
			const h = 2 * Math.tan(fov / 2) * distance // visible height
			const w = h * (width / height)
			return {
				width: w,
				height: h,
				top,
				left,
				factor: width / w,
				distance,
				aspect,
			}
		}
	}

	resize() {
		this.viewport = this.getCurrentViewport(this.camera.instance, undefined, {
			width: this.sizes.width,
			height: this.sizes.height,
			top: 0,
			left: 0,
		})
	}
}
