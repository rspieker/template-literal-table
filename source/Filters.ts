/**
 * Determines whether not all values consist of '-' (with a minimum of two)
 *
 * @export
 * @param {...unknown[]} values
 * @returns {boolean}
 */
export function divider(...values: unknown[]): boolean {
	return values.every((value) => !/^-{2,}$/.test(String(value)));
}

/**
 * Determines whether not all values are undefined
 *
 * @export
 * @param {...unknown[]} values
 * @returns {boolean}
 */
export function defined(...values: unknown[]): boolean {
	return values.some((cell) => typeof cell !== 'undefined');
}
