function zip<T extends any[][]>(...arrays: T): T[number][] {
	return arrays[0].map((_, i) => arrays.map(array => array[i]));
}

// 一定输入范围映射为一定输出范围
export function nonLineF(input: number, oMin: number = 0, oMax: number = 10, iRange: number = 10, step: number = 1): number {
	const oRange = oMax - oMin
	let o = (oRange / iRange) * input * step + oMin
	o >= oMax ? oMax : o
	return o
}

// 一定范围移动坐标变化，返回下一次移动坐标
export function randMove(
	range: number | Array<number>,
	step: number | Array<number> = 1,
	preVal: number | Array<number> = 0
): number[] | number {
	const rangeArray = Array.isArray(range) ? range : [range];
	const stepArray = Array.isArray(step) ? step : [step];
	const preValArray = Array.isArray(preVal) ? preVal : [preVal];
	
	let randValArray =  []
	for (const [ir, is, ip] of zip(rangeArray, stepArray, preValArray)) {
		let addVal = nonLineF(Math.random(), -1 * ir, ir, 1, 1) * is
		let ckRange = ip + addVal - ir
		let randVal = ckRange > 0 ? ip - addVal : ip + addVal

		randValArray.push(randVal)
		// console.log(randValArray)
		
	}
	let r: number | number[] = randValArray
	if (randValArray.length === 1) {
		r = randValArray[0] // 返回单个值，而非数组
	} 
	return r
}