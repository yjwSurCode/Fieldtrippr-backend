import { Dictionary } from '@artisan-framework/core';
import 'url-search-params-polyfill';
import { PROJECT_ROUTE_BASE } from '../core/config';

export function getRoutePath(path: string): string {
	return PROJECT_ROUTE_BASE + path;
}

export function parseSearchParams(search: string | null | undefined): Dictionary<string | undefined> {
	const query: Dictionary<string | undefined> = {};

	for (const [key, value] of new URLSearchParams((search || '').replace(/^\?/, ''))) {
		if (value) {
			query[key] = value;
		}
	}

	return query;
}

export function stringifySearchParams(search: Dictionary): string {
	const output: Dictionary = {};

	for (const key of Object.keys(search)) {
		const value = search[key];

		if (value != null) {
			output[key] = value;
		}
	}

	return new URLSearchParams(output).toString();
}

export function appendSearchParams(url: string, searchParams: string | Dictionary): string {
	const search = typeof searchParams === 'string' ? searchParams : stringifySearchParams(searchParams);

	if (search) {
		const urlSign = url.indexOf('?') !== -1 ? '&' : '?';
		return `${url}${urlSign}${search}`;
	}

	return url;
}
