import { Value } from './Value';
import { Character } from './Character';

/**
 * split a list of Value instances on every token
 *
 * @export
 * @param {Value[]} list
 * @param {...Value[]} tokens
 * @returns {Value[][]}
 */
export function split(list: Value[], ...tokens: Value[]): Value[][] {
	return list.reduce((carry: Value[][], value: Value) => {
		const match = tokens.includes(value);
		const pos = carry.length - Number(!(match || !carry.length));

		carry[pos] = (carry[pos] || []).concat(match ? [] : value);

		return carry;
	}, []);
}

/**
 * trim leading and trailing tokens from a list of Value instances
 *
 * @export
 * @param {Value[]} list
 * @param {...Value[]} tokens
 * @returns {Value[]}
 */
export function trim(list: Value[], ...tokens: Value[]): Value[] {
	let before: number = 0;
	let after: number = list.length;

	while (tokens.includes(list[before]) && ++before);
	while (tokens.includes(list[after - 1]) && --after);

	return list.slice(before, after);
}

/**
 * interleave TemplateLiteral arguments into a single list of Value instances
 *
 * @export
 * @param {TemplateStringsArray} strings
 * @param {...unknown[]} values
 * @returns {Value[]}
 */
export function interleave(strings: TemplateStringsArray, ...values: unknown[]): Value[] {
	return strings.reduce(
		(carry, value, index) =>
			carry.concat(
				Array.from(value, (c) => Character.from(c)),
				index < values.length ? Value.from(values[index]) : []
			),
		[] as Value[]
	);
}
