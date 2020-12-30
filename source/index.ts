import { Table } from './Table';

/**
 * filter divider rows
 *
 * @param {unknown[]} row
 * @returns {boolean}
 */
function divider(row: unknown[]): boolean {
	return row.some((cell) => !/^-{2,}$/.test(String(cell)));
}

/**
 * filter rows consisting of only undefined values
 *
 * @param {unknown[]} row
 * @returns {boolean}
 */
function defined(row: unknown[]): boolean {
	return row.some((cell) => typeof cell !== 'undefined');
}

/**
 * The main string literal template
 *
 * @export
 * @param {TemplateStringsArray} strings
 * @param {...unknown[]} args
 */
export function tag(strings: TemplateStringsArray, ...args: unknown[]): { [key: string]: unknown }[] {
	return new Table(strings, ...args).records(divider, defined);
}

/**
 * The nested string literal template presering fully undefined records
 *
 * @export
 * @param {TemplateStringsArray} strings
 * @param {...unknown[]} args
 */
export function empty(strings: TemplateStringsArray, ...args: unknown[]): { [key: string]: unknown }[] {
	return new Table(strings, ...args).records(divider);
};

tag.empty = empty;

export default tag;
