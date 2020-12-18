import { Collection } from './Collection';
import { Character } from './Character';
import { Value } from './Value';

// space token
const space = Character.from(' ');

/**
 * Cell
 * A single cell within a table row
 *
 * @export
 * @class Cell
 * @extends {Collection<Value>}
 */
export class Cell extends Collection<Value> {
	/**
	 * trim
	 * Removes all edge (leading/trailing) spacing from the cell
	 *
	 * @returns {Cell}
	 * @memberof Cell
	 */
	trim(): Cell {
		const { items } = this;
		let first = 0;

		//  determine the last sequential space token from the start
		while (items[first] === space) {
			++first;
		}
		//  remove the leading space tokens
		items.splice(0, first);

		//  while the last Character is a space token, reduce the items by one
		while (items[items.length - 1] === space) {
			items.length -= 1;
		}

		return this;
	}

	/**
	 * compact
	 * Rebuild the cell contents into the desired shape, either consisting of
	 * a single type or a string (if the trimmed input consist of multiple concetanated types)
	 *
	 * @returns
	 * @memberof Cell
	 */
	compact() {
		const { items } = this.trim();

		if (items.length > 1) {
			return items.map((token) => token.value).join('');
		}

		return items.length ? items[0].value : undefined;
	}
}
