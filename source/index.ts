import { interleave } from './Collection';
import { records } from './Table';
import { divider, defined } from './Filters';

type Item = { [key: string]: unknown };
type MapperFunction<T = unknown> = (value: T | string | unknown) => T;
type Mapper<T extends Item> = { [K in keyof T]: MapperFunction<T[K]> };
type Params = Parameters<typeof interleave>;
type Table<T extends Item = Item> = { (...args: Params): Array<T> };

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
export const empty = <Table>create(divider);

/**
 * Table template literal parser, exludes both any divider row and
 * rows that contain only undefined values
 *
 * @template T
 * @param {TemplateStringsArray} strings
 * @param {...unknown[]} values
 * @returns {T[]}
 */
export const table = <Table & { empty: Table }>Object.assign(create(divider, defined), { empty });
export default table;

/**
 * Create a new table template literaral parser, mapping specified keys
 *
 * @export
 * @template T
 * @param {Mapper<T>} mapper
 * @return {Table<T>}
 */
export function mapper<T extends Item>(mapper: Mapper<T>): Table<T> {
	const mapping = <MapperFunction<T>>Object.keys(mapper).reduce((carry, key) => (item: T) => carry({ ...item, [key]: mapper[key](item[key]) }), (item: T): T => item);

	return (...args: Params): Array<T> => table(...args).map(mapping);
}
