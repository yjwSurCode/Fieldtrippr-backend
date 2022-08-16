import { DependencyList, PropsWithChildren, Ref } from 'react';

export type ForwardRefProps<T, R> = PropsWithChildren<T> & {
	ref?: Ref<R>;
};

/*
https://github.com/vitejs/vite/discussions/4583#discussioncomment-1802717

export const createForwardRef = <T, P = any>(
	displayName: string,
	render: ForwardRefRenderFunction<T, P>,
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> => {
	render.displayName = displayName;
	return forwardRef(render);
};

export const createFC = <P = any>(displayName: string, fc: FunctionComponent<P>): FunctionComponent<P> => {
	fc.displayName = displayName;
	return fc;
}; */

export function depsAreSame(oldDeps: DependencyList, deps: DependencyList): boolean {
	if (oldDeps === deps) return true;
	for (let i = 0; i < oldDeps.length; i++) {
		if (!Object.is(oldDeps[i], deps[i])) return false;
	}
	return true;
}
