import { Dictionary } from '@artisan-framework/core';
import { Bitwise, PageQuery } from '../core/interfaces';

export const RE_DATE = /^\d{4}\-\d{2}\-\d{2}$/;
export const RE_DATE_TIME = /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/;

// http://www.regular-expressions.info/email.html
export const RE_EMAIL =
	/^[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+(?:\.[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/i;

export const RE_PASSWORD = /^[\w\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\|\;\:\'\"\,\<\.\>\/\?]+$/;

// https://gist.github.com/dperini/729294
export const RE_URL =
	/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;

export const RE_ID = /^\d+$/;

export const RE_ALPHA_NUM = /^[a-zA-Z0-9]+$/;
export const RE_ALPHA_NUM_DASH = /^[a-zA-Z0-9/_/-]+$/;
export const RE_ID_CARD =
	/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
export const RE_CHS_MOBILE = /^1[3-9][0-9]\d{8}$/;

export const IS_CHROME = navigator.userAgent.indexOf('Chrome') >= 0;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export function clamp(num: number, min: number, max: number): number {
	return Math.min(Math.max(num, min), max);
}

export function padZero(num: number | string, targetLength = 2): string {
	let str = num + '';

	while (str.length < targetLength) {
		str = '0' + str;
	}

	return str;
}

/**
 * 创建 BIT 值构建器
 *
 * @export
 * @param idx BIT 索引
 * @returns
 */
export function createBitwise(idx: number): () => Bitwise {
	let pos = 1;

	return (): Bitwise => {
		const output = { idx, pos };
		if (pos >= 52) {
			// 2 的 53 次方为 javascript 安全数值
			idx++;
			pos = 1;
		} else {
			pos++;
		}

		return output;
	};
}

export function stripEmptyFields<T extends Dictionary = Dictionary>(fields?: T): T {
	const result: any = {};

	for (const key of Object.keys(fields || {})) {
		let value = fields && fields[key];

		if (typeof value === 'string') {
			value = value.trim();

			if (value) {
				result[key] = value;
			}
		} else if (value != null) {
			result[key] = value;
		}
	}

	return result;
}

export function getProperty(target: any, key: string | string[]): any {
	if (key == null) {
		return;
	}

	const path = Array.isArray(key) ? key : [key];

	let index = 0;
	const length = path.length;

	while (target != null && index < length) {
		target = target[path[index++]];
	}

	return index && index == length ? target : undefined;
}

export function convertPageQuery(query: PageQuery): { pageNum: number; pageSize: number } {
	return {
		pageNum: Math.round(query.limit / query.offset) + 1,
		pageSize: query.offset,
	};
}
