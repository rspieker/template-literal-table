import { Table } from './Table';

/**
 * filter divider rows
 *
 * @param   {array} row
 * @returns bool
 */
function divider(row: unknown[]): boolean {
	return row.some((cell) => !/^-{2,}$/.test(String(cell)));
}

/**
 * filter rows consisting of only undefined values
 *
 * @param   {array} row
 * @returns bool
 */
function defined(row: unknown[]): boolean {
	return row.some((cell) => typeof cell !== 'undefined');
}

/**
 * The main string literal template
 *
 * @param {*} args
 * @returns
 */
export function tag(strings: TemplateStringsArray, ...args: unknown[]): { [key: string]: unknown }[] {
	return new Table(strings, ...args).records(divider, defined);
}

/**
 * The nested string literal template presering fully undefined records
 *
 * @param {*} args
 * @returns
 */
export function empty(strings: TemplateStringsArray, ...args: unknown[]): { [key: string]: unknown }[] {
	return new Table(strings, ...args).records(divider);
};

tag.empty = empty;

export default tag;
