import { Value } from './Value';
import { Character } from './Character';
import { divider, defined } from './Filters';

function split(list: Value[], token: Value): Value[][] {
	return list.reduce((carry: Value[][], value: Value) => {
		const match = value === token;
		const pos = carry.length - Number(!(match || !carry.length));

		carry[pos] = (carry[pos] || []).concat(match ? [] : value);

		return carry;
	}, []);
}

function trim(list: Value[], token: Value): Value[] {
	let before: number = 0;
	let after: number = list.length;

	while (list[before] === token && ++before);
	while (list[after - 1] === token && --after);

	return list.slice(before, after);
}

function interleave(strings: TemplateStringsArray, ...values: unknown[]): Value[] {
	return strings.reduce(
		(carry, value, index) =>
			carry.concat(
				Array.from(value, (c) => Character.from(c)),
				index < values.length ? Value.from(values[index]) : []
			),
		[] as Value[]
	);
}

function cells(values: Value[]): unknown[] {
	return split(values, Character.from('|'))
		.map((cell) => trim(cell, Character.from(' ')))
		.map((cell) => cell.map(({ value }) => value))
		.map((cell) => cell.length > 1 ? cell.join('') : cell[0])
}

function rows(values: Value[], ...filters: ((...args: unknown[]) => boolean)[]): unknown[][] {
	return split(values, Character.from('\n'))
		.map(cells)
		.filter((row) => filters.every((filter) => filter(...row)));
}

function records<T>([header, ...rows]: unknown[][]): T[] {
	return rows.map((row) =>
		header.reduce((carry: T, name: unknown, index: number) => ({ ...carry, [`${name}`]: row[index] }), {} as T)
	);
}

type FilterFunction = (...args: unknown[]) => boolean;
type TableRecord = { [key: string]: unknown };
type TemplateLiteralTable = (strings: TemplateStringsArray, ...values: unknown[]) => TableRecord[];

export function create(...filters: FilterFunction[]): TemplateLiteralTable {
	return <T extends TableRecord>(strings: TemplateStringsArray, ...values: unknown[]) =>
		records(rows(interleave(strings, ...values), ...filters)) as T[];
}

export const empty = create(divider);
export const tag = Object.assign(create(divider, defined), { empty });

export default tag;
