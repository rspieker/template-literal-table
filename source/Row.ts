import { Cell } from './Cell';
import { Collection } from './Collection';

/**
 * Row
 * Represents a single table row consisting of Cell instances
 *
 * @export
 * @class Row
 * @extends {Collection<Cell>}
 */
export class Row extends Collection<Cell> {
	/**
	 * compact
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
