export function delay(duration = 1000) {
	const start = Date.now();
	while (Date.now() - start < duration) { }
}

export function raf(callback: (time: number) => void) {
	requestAnimationFrame(() => {
		requestAnimationFrame(callback);
	})
}

export function debounce<T extends unknown>
	(fn: (this: T, ...args: any[]) => void, delay = 1000) {
	let timerId: any;
	return function (...args: any[]) {
		clearTimeout(timerId!)
		timerId = setTimeout(() => {
			fn.apply(this,args)
		}, delay) 
	} as (this: T, ...args: any[]) => void;
}

export function setCssVal(el: HTMLElement, valName: string, val?: any) {
	val
		? window.getComputedStyle(el).setProperty(valName, val)
		: null

	return window.getComputedStyle(el)
		.getPropertyValue(valName)
}
