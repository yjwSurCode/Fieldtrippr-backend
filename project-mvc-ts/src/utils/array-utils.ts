export function isEqualArrays<T = any>(
	arrA: T[] | undefined | null,
	arrB: T[] | undefined | null,
	comparator: (a: T, b: T) => boolean = (a, b) => a === b,
): boolean {
	if (arrA === arrB) {
		return true;
	}

	if (!arrA || !arrB) {
		return false;
	}

	const len = arrA.length;

	if (arrB.length !== len) {
		return false;
	}

	for (let i = 0; i < len; i++) {
		if (!comparator(arrA[i], arrB[i])) {
			return false;
		}
	}

	return true;
}
