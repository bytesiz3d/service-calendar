export {}

declare global {
	interface ArrayConstructor {
		firstN: (N: number) => Array<number>
	}
}

Array.firstN = function (N: Number): Array<number> {
	return Array.from(Array(N), (_, i) => i);
}