import { delay, raf, setCssVal } from "./utils";

const getEachRect = (parentEl: HTMLElement) => {
	// 初始化rectList，包含一个空数组以存放最外层元素的边界信息
	let rectList: any[] = [[]]
	const getRect = (els: HTMLCollection, sublistIndex: number) => {
		Array.from(els).forEach((el, index) => {
			rectList[sublistIndex].push(el.getBoundingClientRect()); // 将当前元素的边界信息添加到对应层级的子列表中

			// 如果当前元素有子元素，则为其创建新的子列表，并递归处理子元素
			if (el.children.length !== 0) {
				if (!rectList[sublistIndex + 1]) { // 确保下一层级的数组存在
					rectList.push([]);
				}
				getRect(el.children, sublistIndex + 1);
			}
		});
	};

	getRect(parentEl.children, 0); // 从父元素的子元素开始处理
	return rectList;
}

const getAndSetInvStyle = (
	els: HTMLCollection,
	fRect: any[],
	changeFn?: Function,
) => {
	changeFn?.() ////
	const elList = Array.from(els)

	elList.forEach((el, i) => {
		const elH = el as HTMLElement
		elH.style.width = `${fRect[i].width}px`
		elH.style.height = `${fRect[i].height}px`
	})

	const lRect = elList.map((el) => el.getBoundingClientRect())

	elList.forEach((el, i) => {
		const elH = el as HTMLElement
		elH.style.transform = `
			translate(
				${fRect[i].left - lRect[i].left}px, 
				${fRect[i].top - lRect[i].top}px
			)
		`
	})
}


/**
 * 平滑过渡Filp动画，支持位移和缩放
 * @param targetEl 元素
 * @param changeFn 
 */
export function smoothTransition(
	targetEl: HTMLElement,
	changeFn?: Function,
	exceptEl?: HTMLElement | HTMLElement[],
) {

	// Init
	const duration = 0.8
	if (exceptEl) {
		if (!Array.isArray(exceptEl)) {
			exceptEl = [exceptEl]
		}
	}
	// -- set transitionOrigin[css]
	targetEl.parentNode!.querySelectorAll("*")
		.forEach((el) => {
			let elH = el as HTMLElement
			elH.style.transformOrigin = "left top";
			elH.style.transition = '';
		})


	// -- get and classify elements
	const siblings = targetEl.parentNode!.children
	// const siblings = [...targetEl.parentNode!.children].map((el) => {
	// 	exceptEl?.forEach((exEl) => {
	// 		if (el !== exEl) {
	// 		  return el
	// 		}
	// 	})
	// })

	//First
	const eachChildRects = getEachRect(targetEl)
	const siblingsFirstRects = [...siblings]
		.map((el) => el.getBoundingClientRect())

	//Last and Invest
	getAndSetInvStyle(siblings, siblingsFirstRects, changeFn)

	// -- childs recursion
	// let tempChildEls
	let index = 0
	let allChildEls: any[] = []
	const childsInvRecursion = (el: HTMLElement, index: number) => {
		allChildEls.push(el)
		if (el.children.length !== 0) {
			const tempChildEls = [...el.children] as HTMLElement[]
			getAndSetInvStyle(el.children, eachChildRects[index])
			index++
			// - 问题出在这，无法全部循环
			// + 问题已解决， 见到 91， 85 行，定义局部变量
			for (let i = 0; i < tempChildEls.length; i++) {
				childsInvRecursion(tempChildEls[i], index)
			}
		}
	}
	childsInvRecursion(targetEl, index)

	// Force reflow
	void targetEl.offsetWidth;

	// play
	raf(() => {
		// All Relative Elements
		[...siblings, ...allChildEls].forEach((el) => {
			el.style = ''
			el.style.transition = `all ${duration}s`
		});
		targetEl.style.zIndex = '999'
	})

	// 动画完成后恢复原始属性, 除了z-undex
	setTimeout(() => {
		[...siblings, ...allChildEls, targetEl].forEach((el) => {
			const oZIndex = el.style.zIndex
			el.removeAttribute('style')
			el.style.zIndex = oZIndex
		})
	}, duration * 1000)
}


/**
 * 获得灵活grid布局Dom内部元素排列情况
 * @param {HTMLCollection} queryItemList 查询元素字段
 * @returns {object} { rowCount, columnCount} 返回列和行
 */
export function getRowAndColumn(queryItemList: HTMLCollectionOf<any>) {
	const itemElLeft = Array
		.from(queryItemList)
		.map((el) => el.getBoundingClientRect().left
		)
	const num = itemElLeft.length

	// 判断itemElLeft: Array 有几个相同的值
	let count = itemElLeft
		.filter((el) => el === itemElLeft[0])
		.length
	const rowCount = count
	const columnCount = Math.round(num / count) // 算上正在动画的一个

	return { rowCount, columnCount }
}
