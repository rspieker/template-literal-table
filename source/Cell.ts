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
	 * compact
	 * Rebuild the cell contents into the cleaned up result, either consisting
	 * of a single type (as provided) or a string (if the trimmed input consist
	 * of multiple concetanated types)
	 *
	 * @returns
	 * @memberof Cell
	 */
	compact() {
		const { items: work } = this;
		let before = 0;
		let after = work.length;

		while (work[before] === space) ++before;
		while (work[after - 1] === space) --after;

		const slice = work.slice(before, after).map(({ value }) => value)

		return slice.length > 1 ? slice.join('') : slice[0];
	}
}
