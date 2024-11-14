export default class EventEmitter {
	events: string[]
	callbacks: { [key: string]: (() => void)[] }

	constructor() {
		this.events = []
		this.callbacks = {}
	}

	on(event: string, callback: () => void) {
		if (!this.callbacks[event]) {
			this.callbacks[event] = []
		}
		this.callbacks[event].push(callback)
	}

	off(event: string, callback: () => void) {
		if (this.callbacks[event]) {
			this.callbacks[event] = this.callbacks[event].filter(
				cb => cb !== callback
			)
		}
	}

	trigger(event: string) {
		this.callbacks[event]?.forEach(cb => {
			cb?.()
		})
	}
}
