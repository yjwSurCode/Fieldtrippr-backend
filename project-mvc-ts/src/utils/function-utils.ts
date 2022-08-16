import { cancelRaf, raf } from './dom-utils';

interface DebouncedFunc<T extends (...args: any[]) => any> {
	(...args: Parameters<T>): ReturnType<T> | undefined;
	cancel(): void;
	flush(): ReturnType<T> | undefined;
}

export function debounce<T extends (...args: any) => any>(
	func: T,
	_wait?: number,
	options?: { leading?: boolean; trailing?: boolean; maxWait?: number },
): DebouncedFunc<T> {
	const maxWait = options?.maxWait ?? 0;
	const leading = options?.leading ?? false;
	const trailing = options?.trailing ?? true;
	const wait = _wait || 0;
	const maxing = maxWait > 0;

	let lastArgs: any, lastThis: any, result: any, timerId: any;

	let lastCallTime = 0;
	let lastInvokeTime = 0;

	function invokeFunc(time: number) {
		const args = lastArgs,
			thisArg = lastThis;

		lastArgs = lastThis = undefined;
		lastInvokeTime = time;
		result = (func as any).apply(thisArg, args);
		return result;
	}

	function startTimer(pendingFunc: () => void): number {
		cancelRaf(timerId);
		return raf(pendingFunc);
	}

	function cancelTimer(id: number) {
		return cancelRaf(id);
	}

	function leadingEdge(time: number) {
		// Reset any `maxWait` timer.
		lastInvokeTime = time;
		// Start the timer for the trailing edge.
		timerId = setTimeout(timerExpired, wait);
		// Invoke the leading edge.
		return leading ? invokeFunc(time) : result;
	}

	function remainingWait(time: number) {
		const timeSinceLastCall = time - lastCallTime,
			timeSinceLastInvoke = time - lastInvokeTime,
			result = wait - timeSinceLastCall;

		return maxing ? Math.min(result, maxWait - timeSinceLastInvoke) : result;
	}

	function shouldInvoke(time: number) {
		const timeSinceLastCall = time - lastCallTime,
			timeSinceLastInvoke = time - lastInvokeTime;
		// Either this is the first call, activity has stopped and we're at the trailing
		// edge, the system time has gone backwards and we're treating it as the
		// trailing edge, or we've hit the `maxWait` limit.
		return (
			lastCallTime === undefined ||
			timeSinceLastCall >= wait ||
			timeSinceLastCall < 0 ||
			(maxing && timeSinceLastInvoke >= maxWait)
		);
	}

	function timerExpired() {
		const time = Date.now();
		if (shouldInvoke(time)) {
			return trailingEdge(time);
		}
		// Restart the timer.
		timerId = setTimeout(timerExpired, remainingWait(time));
	}

	function trailingEdge(time: number) {
		timerId = undefined;

		// Only invoke if we have `lastArgs` which means `func` has been debounced at
		// least once.
		if (trailing && lastArgs) {
			return invokeFunc(time);
		}
		lastArgs = lastThis = undefined;
		return result;
	}

	function cancel() {
		if (timerId !== undefined) {
			cancelTimer(timerId);
		}
		lastInvokeTime = 0;
		lastCallTime = 0;
		lastArgs = lastThis = timerId = undefined;
	}

	function flush() {
		return timerId === undefined ? result : trailingEdge(Date.now());
	}

	function pending() {
		return timerId !== undefined;
	}

	function debounced(...rest: any[]) {
		const time = Date.now();
		const isInvoking = shouldInvoke(time);

		lastArgs = rest;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		lastThis = this;
		lastCallTime = time;

		if (isInvoking) {
			if (timerId === undefined) {
				return leadingEdge(lastCallTime);
			}

			if (maxing) {
				// Handle invocations in a tight loop.
				timerId = startTimer(timerExpired);
				return invokeFunc(lastCallTime);
			}
		}

		if (timerId === undefined) {
			timerId = startTimer(timerExpired);
		}
		return result;
	}

	debounced.cancel = cancel;
	debounced.flush = flush;
	debounced.pending = pending;
	return debounced;
}

export function throttle<T extends (...args: any) => any>(
	func: T,
	wait?: number,
	options?: { leading?: boolean; trailing?: boolean },
): DebouncedFunc<T> {
	return debounce<T>(func, wait, {
		leading: options?.leading,
		maxWait: wait,
		trailing: options?.trailing,
	});
}
