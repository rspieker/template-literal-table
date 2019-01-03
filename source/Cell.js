const Record = require('./Record.js');
const Character = require('./Character.js');
const { whitespace } = require('./prepared.js');

/**
 * Table cell representation
 *
 * @class Cell
 * @extends {Record}
 */
class Cell extends Record {
	/**
	 * Remove leading and trailing whitespace
	 *
	 * @returns  Cell
	 * @memberof Cell
	 */
	trim() {
		const { items } = this;
		let first = 0;

		while (items[items.length - 1] === whitespace) {
			items.length -= 1;
		}

		if (items.length) {
			while (items[first] === whitespace) {
				++first;
			}

			items.splice(0, first);
		}

		return this;
	}

	/**
	 * Compact a cell by trimming whitespace and combining character data
	 *
	 * @returns  {*}
	 * @memberof Cell
	 */
	compact() {
		const { items } = this.trim();
		const merge =
			items.filter((token) => token instanceof Character).length > 0;

		if (items.length <= 1) {
			return items.length ? items[0].value : undefined;
		}

		return items.map((token) => token.value).join('');
	}
}

module.exports = Cell;
