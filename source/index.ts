import { interleave } from './Collection';
import { TableRecord, records } from './Table';
import { FilterFunction, divider, defined } from './Filters';


export type TemplateLiteralTable = (strings: TemplateStringsArray, ...values: unknown[]) => TableRecord[];

/**
 * create a new template literal function parsing tables with a custom set of filters
 *
 * @export
 * @param {...FilterFunction[]} filters
 * @returns {TemplateLiteralTable}
 */
export function create(...filters: FilterFunction[]): TemplateLiteralTable {
	return <T extends TableRecord>(strings: TemplateStringsArray, ...values: unknown[]) =>
		records<T>(interleave(strings, ...values), ...filters) as T[];
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
