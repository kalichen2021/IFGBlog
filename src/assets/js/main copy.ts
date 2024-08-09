import { delay, raf, setCssVal } from "./utils";


/**
 * 平滑过渡Filp动画，支持位移和缩放
 * @param el 元素
 * @param lastStatusFn 
 * @param initStatusFn 
 * @param elTransitionStyle 
 */
export function smoothTransition(
	el: HTMLElement,
	initStatusFn?: (...args: any[]) => void | null,
	lastStatusFn?: (...args: any[]) => void | null,
	elTransitionStyle: string = 'transform 0.5s ease-in-out'
){
	// init and save original style
	let elChildrenOriStyle: string
	const oriStyle = el.style.transition
	initStatusFn?.()
	el.style.removeProperty('transition')
	el.style.transformOrigin = 'left top'
	
	// first
	const forRect = el.getBoundingClientRect()

	// last
	lastStatusFn?.()
	const curRect = el.getBoundingClientRect()

	// invest
	const translateStyle = {
		X: forRect.left - curRect.left,
		Y: forRect.top - curRect.top
	}
	const scaleStyle = {
		X: forRect.width / curRect.width,
		Y: forRect.height / curRect.height
	}

	el.style.transform = `translate(
				${translateStyle.X}px, 
				${translateStyle.Y}px
			)
			scale(
				${scaleStyle.X},
				${scaleStyle.Y}
		)`
	el.style.borderRadius = `
			${10 * scaleStyle.X ** -1}px /
			${10 * scaleStyle.Y ** -1}px
		`

		// 子元素的复位
	const elChildrens = Array.from(el.children)
	for (const elChildren of elChildrens as HTMLElement[]) {
		// init
		elChildrenOriStyle = elChildren.style.transition
		elChildren.style.removeProperty('transition')
		elChildren.style.transformOrigin = 'left top'
		// invest
		elChildren.style.transform = `scale(
					${(scaleStyle.X) ** -1},
					${(scaleStyle.Y) ** -1}
			)`
	}

	// play
	raf(() => {
		el.style.transition = elTransitionStyle
		const elBorderRadius = setCssVal(el, '--border-radius')
		el.style.borderRadius = `${elBorderRadius}px / ${elBorderRadius}px`
		el.style.removeProperty('transform')

		// 子元素的复位
		for (const elChildren of
			elChildrens as HTMLElement[]
		) {
			elChildren.style.transition =
				`transform 0.5s ease-in-out`
			elChildren.style.removeProperty('transform')
		}
	})

	// 复原original style
	setTimeout(() => {
		el.style.transition = oriStyle
		console.log({ el }, el.style.transition, oriStyle)
		for (const elChildren of
			elChildrens as HTMLElement[]
		) {
			elChildren.style.transition = elChildrenOriStyle
		}
	}, 500);
}
