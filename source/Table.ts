import { Literal } from './Literal';
import { Value } from './Value';
import { Character } from './Character';
import { Row } from './Row';
import { Cell } from './Cell';

const EOL = Character.from('\n');
const separator = Character.from('|');

export class Table {
	// template literals
	private readonly strings: Literal[];
	// template values
	private readonly values: Value[];
	/**
	 * Creates an instance of Table.
	 * @param    {array} strings
	 * @param    {array} values
	 * @memberof Table
	 */
	constructor(strings: TemplateStringsArray, ...values: unknown[]) {
		this.strings = strings.map((value) => new Literal(value));
		this.values = values.map((value) => Value.from(value));
	}

	/**
	 * Obtain the interleaved strings and values provided during construction
	 *
	 * @readonly
	 * @memberof Table
	 */
	get interleave(): Value[] {
		const { strings, values } = this;

		return strings.reduce(
			(carry: Value[], { items }: Literal, index: number) =>
				carry.concat(
					items,
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
	get rows(): Row[] {
		return this.interleave.reduce((carry: Row[], value: Value) => {
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
	records(...filters: ((value: unknown[]) => boolean)[]) {
		const [header, ...rows] = this.rows.map((row) => row.compact());

		return rows
			.reduce((carry, row) => {
				const preserve = filters.every((call) => call(row));

				return carry.concat(preserve ? [row] : []);
			}, [])
			.map((row) =>
				header.reduce(
					(carry: object, key, index) =>
						({ ...carry, [key as string]: (row as unknown[])[index] }),
					{}
				)
			);
	}
}
