import { Value } from './Value';
import { Character } from './Character';
import { ESCAPE, PIPE, ESCPIPE } from './Predefined';

/**
 * Convert a string into Characters and preserve escaped pipe symbols
 *
 * @param {string} input
 * @return {*}  {(Array<Value)}
 */
function characters(input: string): Array<Value> {
	const escaped = Array.from(input, (c) => Character.from(c)) as Array<Value>;
	let escape: number;

	while ((escape = escaped.indexOf(ESCAPE)) >= 0) {
		(escaped[escape + 1] === PIPE) && escaped.splice(escape, 2, ESCPIPE);
	}

	return escaped;
}

/**
 * split a list of Value instances on every token
 *
 * @export
 * @param {Array<Value>} list
 * @param {...Array<Value>} tokens
 * @returns {Array<Array<Value>>}
 */
export function split(list: Array<Value>, ...tokens: Array<Value>): Array<Array<Value>> {
	return list.reduce((carry: Array<Array<Value>>, value: Value) => {
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
 * @param {Array<Value>} list
 * @param {...Array<Value>} tokens
 * @returns {Array<Value>}
 */
export function trim(list: Array<Value>, ...tokens: Array<Value>): Array<Value> {
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
 * @param {...Array<unknown>} values
 * @returns {Array<Value>}
 */
export function interleave(strings: TemplateStringsArray, ...values: Array<unknown>): Array<Value> {
	return strings.reduce(
		(carry, value, index) =>
			carry.concat(
				characters(value),
				index < values.length ? Value.from(values[index]) : []
			),
		[] as Array<Value>
	);
}
