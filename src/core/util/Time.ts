import { Clock } from 'three'
import EventEmitter from './EventEmitter'

export default class Time extends EventEmitter {
	clock: Clock

	constructor() {
		super()
		this.clock = new Clock()
		requestAnimationFrame(() => {
			this.tick()
		})
	}

	tick() {
		this.trigger('tick')
		requestAnimationFrame(() => {
			this.tick()
		})
	}
}
