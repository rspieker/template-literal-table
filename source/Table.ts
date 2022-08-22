import { Value } from './Value';
import { Character } from './Character';
import { split, trim } from './Collection';
import { FilterFunction } from './Filters';

const pipe = Character.from('|');
const line = Character.from('\n');
const space = Character.from(' ');

/**
 * split a list of Value instances into "cells" for every pipe character,
 * trim each value and extract the original value (if the original "cell" value
 * consisted of more than one Value, it will be joined as string)
 *
 * @param {Array<Value>} values
 * @returns {Array<unknown>}
 */
function cells(values: Array<Value>): Array<unknown> {
	return split(values, pipe)
		.map((cell) => trim(cell, space))
		.map((cell) => cell.map(({ value }) => value))
		.map((cell) => cell.length > 1 ? cell.join('') : cell[0])
}

/**
 * split a list of Value instance into "rows" for every newline character
 *
 * @param {Array<Value>} values
 * @param {...Array<FilterFunction>} filters
 * @returns {Array<Array<unknown>>}
 */
function rows(values: Array<Value>, ...filters: Array<FilterFunction>): Array<Array<unknown>> {
	return split(values, line)
		.map(cells)
		.filter((row) => filters.every((filter) => filter(...row)));
}

/**
 * turn a list of Value instances into a table structure (rows < cells) and turn
 * each row into a Record using the first row as key names
 *
 * @export
 * @template T
 * @param {Array<Value>} values
 * @param {...Array<FilterFunction>} filters
 * @returns {Array<T>}
 */
export function records<T extends { [key: string]: unknown }>(values: Array<Value>, ...filters: Array<FilterFunction>): Array<T> {
	const [header, ...lines] = rows(values, ...filters);

	return lines.map((line) =>
		header.reduce((carry: T, name: unknown, index: number) => ({ ...carry, [String(name)]: line[index] }), {} as T)
	) as Array<T>;
}
