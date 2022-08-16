import { Dictionary, LoggerProvider, NoopLoggerProvider } from '@artisan-framework/core';

class TaggedLoggerProvider implements LoggerProvider {
	constructor(private _tag: string, private _meta?: Dictionary) {}

	error(message: string, meta?: Dictionary) {
		this._log('error', message, meta);
	}

	warn(message: string, meta?: Dictionary) {
		this._log('warn', message, meta);
	}

	info(message: string, meta?: Dictionary) {
		this._log('info', message, meta);
	}

	debug(message: string, meta?: Dictionary) {
		this._log('debug', message, meta);
	}

	protected _log(level: string, message: string, meta?: Dictionary) {
		const args = this._meta || meta ? [{ ...this._meta, ...meta }] : [];
		(console as any)[level](`[${this._tag}] ${message}`, ...args);
	}

	with(meta: Dictionary): LoggerProvider {
		return new TaggedLoggerProvider(this._tag, { ...this._meta, ...meta });
	}
}

export function createLogger(tag: string): LoggerProvider {
	if (typeof console === 'undefined') {
		return new NoopLoggerProvider();
	}

	return new TaggedLoggerProvider(tag);
}

export function formatErrorMessage(error: any) {
	return error ? error.message || error : 'Error';
}
