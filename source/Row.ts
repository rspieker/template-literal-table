import { Cell } from './Cell';
import { Collection } from './Collection';

/**
 * Represents a single table row consisting of Cell instances
 *
 * @export
 * @class Row
 * @extends {Collection<Cell>}
 */
export class Row extends Collection<Cell> {
	/**
	 * Compacts all the Cell instances within the row
	 *
	 * @returns {unknown[]}
	 * @memberof Row
	 */
	compact(): unknown[] {
		const { items } = this;

		return items.map((cell: Cell) => cell.compact());
	}
}
