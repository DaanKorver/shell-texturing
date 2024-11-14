import {
	InstancedMesh,
	Mesh,
	PlaneGeometry,
	Scene,
	ShaderMaterial,
	Uniform,
} from 'three'
import Experience from '@core/Experience'
import vShader from './vertex.glsl'
import fShader from './fragment.glsl'

export default class ShellGrass {
	experience: Experience
	scene: Scene
	mesh: Mesh

	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.mesh = this.create()
	}

	create() {
		const shells = 32

		const uniforms = {
			uDistance: new Uniform(0.02),
			uShells: new Uniform(16),
		}

		const object = new PlaneGeometry(4, 4, 1, 1)
		const material = new ShaderMaterial({
			vertexShader: vShader,
			fragmentShader: fShader,
			side: 2,
			uniforms,
			transparent: true,
		})
		const mesh = new InstancedMesh(object, material, shells)
		mesh.rotation.x = -Math.PI / 2.25

		return mesh
	}
}
