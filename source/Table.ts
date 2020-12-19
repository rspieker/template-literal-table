import { Literal } from './Literal';
import { Value } from './Value';
import { Character } from './Character';
import { Row } from './Row';
import { Cell } from './Cell';

//  EOL (End of Line) token
const EOL = Character.from('\n');
//  Cell separator token
const separator = Character.from('|');

/**
 * Represent the table as a whole
 *
 * @export
 * @class Table
 */
export class Table {
	// template literals
	private readonly strings: Literal[];
	// template values
	private readonly values: Value[];

	/**
	 * Creates an instance of Table
	 *
	 * @param {TemplateStringsArray} strings
	 * @param {...unknown[]} values
	 * @memberof Table
	 */
	constructor(strings: TemplateStringsArray, ...values: unknown[]) {
		this.strings = strings.map((value) => new Literal(value));
		this.values = values.map((value) => Value.from(value));
	}

	/**
	 * Get the inleaved template literals and types
	 *
	 * @readonly
	 * @type {Value[]}
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
	 * Obtain all the rows from the table
	 *
	 * @readonly
	 * @type {Row[]}
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
	 * Obtain all the records from the table
	 *
	 * @param {...((value: unknown[]) => boolean)[]} filters
	 * @returns
	 * @memberof Table
	 */
	records(...filters: ((value: unknown[]) => boolean)[]): { [key: string]: unknown }[] {
		const [header, ...rows] = this.rows.map((row) => row.compact());

		return rows
			.filter((row) => filters.every((call) => call(row)))
			.map((row) =>
				header.reduce(
					(carry: object, key, index) =>
						({ ...carry, [key as string]: (row as unknown[])[index] }),
					{}
				)
			);
	}
}
