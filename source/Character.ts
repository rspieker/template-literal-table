import { Value } from './Value';

/**
 * Character
 * Represents a single string character (originating from the template string itself)
 *
 * @export
 * @class Character
 * @extends {Value}
 */
export class Character extends Value {
	/**
	 * from
	 * Create a character instance based on the input value.
	 * Normalizes all whitespace into a single space
	 *
	 * @static
	 * @param {string} value
	 * @returns {Character}
	 * @memberof Character
	 */
	static from(value: string): Character {
		const normal = /^[^\S\n]+$/.test(value) ? ' ' : value;

		return super.from(normal) as Character;
	}
}
