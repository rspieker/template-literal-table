export type FilterFunction = (...args: Array<unknown>) => boolean;

/**
 * Determines whether not all values consist of '-' (with a minimum of two)
 *
 * @export
 * @param {...Array<unknown>} values
 * @returns {boolean}
 */
export function divider(...values: Array<unknown>): boolean {
	return values.every((value) => !/^(?:-{2,}|:-+:?|:?-+:)$/.test(String(value)));
}

/**
 * Determines whether not all values are undefined
 *
 * @export
 * @param {...Array<unknown>} values
 * @returns {boolean}
 */
export function defined(...values: Array<unknown>): boolean {
	return values.some((cell) => typeof cell !== 'undefined');
}
