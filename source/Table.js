const Tagged = require('./Tagged.js');
const Value = require('./Value.js');
const Row = require('./Row.js');
const Cell = require('./Cell.js');

const { EOL, separator } = require('./symbols.js');
const storage = new WeakMap();

class Table {
	/**
	 * Creates an instance of Table.
	 * @param    {array} strings
	 * @param    {array} values
	 * @memberof Table
	 */
	constructor(strings, ...values) {
		storage.set(this, {
			strings: strings.map((value) => Tagged.from(value)),
			values: values.map((value) => Value.from(value))
		});
	}

	/**
	 * Obtain the interleaved strings and values provided during construction
	 *
	 * @readonly
	 * @memberof Table
	 */
	get interleave() {
		const { strings, values } = storage.get(this);

		return strings.reduce(
			(carry, value, index) =>
				carry.concat(
					value.tokenized,
					values.length > index ? values[index] : []
				),
			[]
		);
	}

	/**
	 * Obtain the Rows (and its Cells)
	 *
	 * @readonly
	 * @memberof Table
	 */
	get rows() {
		return this.interleave.reduce((carry, value) => {
			if (value === EOL) {
				return carry.concat(new Row());
			}
			if (!carry.length) {
				carry.push(new Row());
			}
			const record = carry[carry.length - 1];

			if (value === separator) {
				record.append(new Cell());
			} else {
				const field = record.last || record.append(new Cell());

				field.append(value);
			}

			return carry;
		}, []);
	}

	/**
	 * Map the Rows/Cells into a basic object (optionally filtering rows)
	 *
	 * @param    {...function} filters
	 * @returns  {array}
	 * @memberof Table
	 */
	records(...filters) {
		const [header, ...rows] = this.rows.map((row) => row.compact());

		return rows
			.reduce((carry, row) => {
				const preserve = filters.filter((call) => call(row));
				const append = preserve.length === filters.length ? [row] : [];

				return carry.concat(append);
			}, [])
			.map((row) =>
				header.reduce(
					(carry, key, index) =>
						Object.assign(carry, { [key]: row[index] }),
					{}
				)
			);
	}
}

module.exports = Table;
