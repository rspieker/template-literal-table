import { Collection } from './Collection';
import { Character } from './Character';

/**
 * Template literal string representated as list of Characters
 *
 * @export
 * @class Literal
 * @extends {Value}
 */
export class Literal extends Collection<Character> {
	/**
	 * Creates an instance of Literal
	 *
	 * @param {string} value
	 * @memberof Literal
	 */
	constructor(value: string) {
		super(Array.from(value, (char: string) => Character.from(char) as Character));
	}
}
