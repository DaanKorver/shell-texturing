import { Mesh, Scene } from 'three'
import ShellGrass from '@scene/objects/ShellGrass/ShellGrass'
import Experience from '@core/Experience'
import FurBall from '@scene/objects/FurBall/FurBall'

export default class MainScene {
	meshes: Mesh[]
	experience: Experience
	scene: Scene

	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.meshes = []

		const grass = new ShellGrass()
		// this.meshes.push(grass.mesh)

		const ball = new FurBall()
		this.meshes.push(ball.mesh)

		this.add()
	}

	add() {
		this.meshes.forEach(mesh => {
			this.scene.add(mesh)
		})
	}
}
