import Experience from '@core/Experience'
import EventEmitter from './EventEmitter'

export default class Mouse extends EventEmitter {
	experience: Experience
	x!: number
	y!: number
	direction!: {
		x: number
		y: number
	}
	previous!: {
		x: number
		y: number
	}

	private latestMouse!: {
		x: number
		y: number
	}

	constructor() {
		super()

		this.experience = new Experience()

		this.x = 0
		this.y = 0
		this.direction = {
			x: 0,
			y: 0,
		}
		this.previous = {
			x: 0,
			y: 0,
		}
		this.latestMouse = {
			x: 0,
			y: 0,
		}

		window.addEventListener('mousemove', e => {
			const x = (e.clientX / this.experience.sizes.width) * 2 - 1
			const y = (e.clientY / this.experience.sizes.height) * 2 - 1

			this.latestMouse.x = x
			this.latestMouse.y = y
		})
	}

	update() {
		// Set direction for x
		if (this.latestMouse.x > this.previous.x) {
			this.direction.x = 1
		} else if (this.latestMouse.x < this.previous.x) {
			this.direction.x = -1
		} else {
			this.direction.x = 0
		}

		// Set direction for y
		if (this.latestMouse.y > this.previous.y) {
			this.direction.y = 1
		} else if (this.latestMouse.y < this.previous.y) {
			this.direction.y = -1
		} else {
			this.direction.y = 0
		}

		// Update positions
		this.x = this.latestMouse.x
		this.y = this.latestMouse.y

		// Store current position as previous for the next frame
		this.previous.x = this.x
		this.previous.y = this.y

		// Emit the event with the current data
		this.trigger('mouse')
	}
}
