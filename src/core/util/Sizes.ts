import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
	width: number
	height: number

	constructor() {
		super()

		this.width = window.innerWidth
		this.height = window.innerHeight

		window.addEventListener('resize', () => {
			this.width = window.innerWidth
			this.height = window.innerHeight

			this.trigger('resize')
		})
	}
}
