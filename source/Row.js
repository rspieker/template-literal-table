const Record = require('./Record.js');

/**
 * Table row representation
 *
 * @class Row
 * @extends {Record}
 */
class Row extends Record {
	/**
	 * Obtain the compacted cells
	 *
	 * @returns  {array}
	 * @memberof Row
	 */
	compact() {
		const { items } = this;

		return items.map((cell) => cell.compact());
	}
}

module.exports = Row;
