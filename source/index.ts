import { interleave } from './Collection';
import { records } from './Table';
import { divider, defined } from './Filters';

/**
 * create a new template literal function parsing tables with a custom set of filters
 *
 * @export
 * @param {...((...args: unknown[]) => boolean)[]} filters
 * @returns {(...args: Parameters<typeof interleave>) => { [key: string]: unknown }[]}
 */
export function create(...filters: ((...args: unknown[]) => boolean)[]): (...args: Parameters<typeof interleave>) => { [key: string]: unknown }[] {
	return <T extends { [key: string]: unknown }>(...args: Parameters<typeof interleave>) =>
		records<T>(interleave(...args), ...filters) as T[];
}

/**
 * Table template literal parser, exludes any divider ro, preserves rows
 * consisting of only undefined values
 *
 *
 * @template T
 * @param {TemplateStringsArray} strings
 * @param {...unknown[]} values
 * @returns {T[]}
 */
export const empty = create(divider);

/**
 * Table template literal parser, exludes both any divider row and
 * rows that contain only undefined values
 *
 * @template T
 * @param {TemplateStringsArray} strings
 * @param {...unknown[]} values
 * @returns {T[]}
 */
export const table = Object.assign(create(divider, defined), { empty });
export default table;
