/**
 * Value
 * Representation of a single value
 *
 * @export
 * @class Value
 */
export class Value {
	// cache containing each unique value instance
	protected static cache: Map<unknown, Value> = new Map();

	/**
	 * Creates an instance of Value
	 *
	 * @param {unknown} value
	 * @memberof Value
	 */
	constructor(public readonly value: unknown) { }

	/**
	 * from
	 * Create (or re-use) a Value instance representing a value
	 *
	 * @static
	 * @param {unknown} value
	 * @returns {Value}
	 * @memberof Value
	 */
	static from(value: unknown): Value {
		if (!this.cache.has(value)) {
			this.cache.set(value, new this(value));
		}

		return this.cache.get(value) as Value;
	}
}
