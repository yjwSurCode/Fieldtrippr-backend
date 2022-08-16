export type NestedMiddleware<C> = (ctx: C, next: () => Promise<void>) => Promise<void>;

export function compose<T1, T2>(middleware: [NestedMiddleware<T1>, NestedMiddleware<T2>]): NestedMiddleware<T1 & T2>;
export function compose<T1, T2, T3>(
	middleware: [NestedMiddleware<T1>, NestedMiddleware<T2>, NestedMiddleware<T3>],
): NestedMiddleware<T1 & T2 & T3>;
export function compose<T1, T2, T3, T4>(
	middleware: [NestedMiddleware<T1> & NestedMiddleware<T2> & NestedMiddleware<T3> & NestedMiddleware<T4>],
): NestedMiddleware<T1 & T2 & T3 & T4>;
export function compose<T1, T2, T3, T4, T5>(
	middleware: [
		NestedMiddleware<T1> &
			NestedMiddleware<T2> &
			NestedMiddleware<T3> &
			NestedMiddleware<T4> &
			NestedMiddleware<T5>,
	],
): NestedMiddleware<T1 & T2 & T3 & T4 & T5>;
export function compose<T1, T2, T3, T4, T5, T6>(
	middleware: [
		NestedMiddleware<T1> &
			NestedMiddleware<T2> &
			NestedMiddleware<T3> &
			NestedMiddleware<T4> &
			NestedMiddleware<T5> &
			NestedMiddleware<T6>,
	],
): NestedMiddleware<T1 & T2 & T3 & T4 & T5 & T6>;
export function compose<T1, T2, T3, T4, T5, T6, T7>(
	middleware: [
		NestedMiddleware<T1> &
			NestedMiddleware<T2> &
			NestedMiddleware<T3> &
			NestedMiddleware<T4> &
			NestedMiddleware<T5> &
			NestedMiddleware<T6> &
			NestedMiddleware<T7>,
	],
): NestedMiddleware<T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function compose<T1, T2, T3, T4, T5, T6, T7, T8>(
	middleware: [
		NestedMiddleware<T1> &
			NestedMiddleware<T2> &
			NestedMiddleware<T3> &
			NestedMiddleware<T4> &
			NestedMiddleware<T5> &
			NestedMiddleware<T6> &
			NestedMiddleware<T7> &
			NestedMiddleware<T8>,
	],
): NestedMiddleware<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function compose<T>(middleware: Array<NestedMiddleware<T>>): NestedMiddleware<T> {
	if (!Array.isArray(middleware)) throw new TypeError('Middleware must be an array!');

	const middlewareLen = middleware.length;
	for (let i = 0; i < middlewareLen; i++) {
		if (typeof middleware[i] !== 'function') {
			throw new TypeError('Middleware must be composed of function');
		}
	}

	return function wrappedMiddleware(params, next) {
		let index = -1;

		function dispatch(i: number): Promise<void> {
			if (i <= index) {
				return Promise.reject(new Error('next() should not be called multiple times in one middleware!'));
			}
			index = i;
			const fn = middleware[i] || next;
			if (!fn) return Promise.resolve();
			try {
				return Promise.resolve(fn(params, () => dispatch(i + 1)));
			} catch (err) {
				return Promise.reject(err);
			}
		}

		return dispatch(0);
	};
}
