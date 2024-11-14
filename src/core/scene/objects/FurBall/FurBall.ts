import {
	Color,
	InstancedMesh,
	Mesh,
	Scene,
	ShaderMaterial,
	SphereGeometry,
	Uniform,
	Vector3,
} from 'three'

import Experience from '@core/Experience'
import fShader from './fragment.glsl'
import vShader from './vertex.glsl'
import Viewport from '@util/Viewport'
import Mouse from '@util/Mouse'

export default class FurBall {
	experience: Experience
	scene: Scene
	mesh: Mesh
	uniforms: { [key: string]: Uniform }
	shells: number
	direction: Vector3
	position: Vector3
	viewport: Viewport
	mouse: Mouse

	constructor() {
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.direction = new Vector3(0, 0, 0)
		this.position = new Vector3(0, 0, 0)
		this.viewport = this.experience.viewport

		this.shells = 68

		this.uniforms = {
			uDistance: new Uniform(0.004),
			uShells: new Uniform(this.shells),
			uColor: new Uniform(new Color('#e9d0f2')),
			uDirection: new Uniform(new Vector3(0, 0, 0)),
			uPosition: new Uniform(new Vector3(0, 0, 0)),
		}

		this.mouse.on('mouse', () => {
			const x = this.mouse.x
			const y = this.mouse.y

			this.direction.set(x * -1, y, 0)

			const vw = this.viewport.viewport.width
			const vh = this.viewport.viewport.height

			this.position.set(x * vw, -y * vh, 0)
		})

		this.experience.time.on('tick', () => {
			this.direction.set(-this.mouse.direction.x, this.mouse.direction.y, 0)
			this.uniforms.uDirection.value.lerp(this.direction, 0.08)
			this.uniforms.uPosition.value.lerp(this.position, 0.08)
		})

		this.mesh = this.create()
	}

	create() {
		const object = new SphereGeometry(1, 32, 32, 0, Math.PI * 2)
		const uniforms = this.uniforms

		const material = new ShaderMaterial({
			vertexShader: vShader,
			fragmentShader: fShader,
			uniforms: uniforms,
			transparent: true,
		})
		const mesh = new InstancedMesh(object, material, this.shells)

		return mesh
	}
}
