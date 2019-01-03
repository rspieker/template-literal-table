const Record = require('./Record.js');
const Character = require('./Character.js');
const { whitespace } = require('./symbols.js');

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

		if (items.length === 1) {
			return items[0].value;
		}

		return items.reduce(
			(carry, token) => carry + token.value,
			merge ? '' : undefined
		);
	}
}

module.exports = Cell;
