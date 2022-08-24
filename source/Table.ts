import { Value } from './Value';
import { split, trim } from './Collection';
import { FilterFunction } from './Filters';
import { NEWLINE, PIPE, SPACE } from './Predefined';

/**
 * split a list of Value instances into "cells" for every pipe character,
 * trim each value and extract the original value (if the original "cell" value
 * consisted of more than one Value, it will be joined as string)
 *
 * @param {Array<Value>} values
 * @returns {Array<unknown>}
 */
function cells(values: Array<Value>): Array<unknown> {
	return split(values, PIPE)
		.map((cell) => trim(cell, SPACE))
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
	return split(values, NEWLINE)
		.map(cells)
		.filter((row) => filters.every((filter) => filter(...row)));
}

/**
 * Populate a list of values
 *
 * @template T
 * @param {Array<unknown>} header
 * @param {Array<Array<unknown>>} list
 * @return {*}  {Array<T>}
 */
function populate<T>(header: Array<unknown>, list: Array<Array<unknown>>): Array<T> {
	return list.map((values) =>
		header.reduce((carry: T, name: unknown, index: number) => ({ ...carry, [String(name)]: values[index] }), Object.create(null) as T)
	) as Array<T>;
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
	const [header = [], ...lines] = rows(values, ...filters);
	const start = Number(typeof header[0] === 'undefined');
	const end = Number(typeof header[header.length - 1] === 'undefined') * -1;

	return (start || end)
		? populate<T>(header.slice(start, end), lines.map((line) => line.slice(start, end)))
		: populate<T>(header, lines);
}
