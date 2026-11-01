// Map keys use SameValueZero, which treats -0 and 0 as the same key
const NEGATIVE_ZERO = Symbol('negative-zero');

/**
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
	 * Create (or re-use) a Value instance representing a value
	 *
	 * @static
	 * @param {unknown} value
	 * @returns {Value}
	 * @memberof Value
	 */
	static from(value: unknown): Value {
		const key = Object.is(value, -0) ? NEGATIVE_ZERO : value;

		if (!this.cache.has(key)) {
			this.cache.set(key, new this(value));
		}

		return this.cache.get(key) as Value;
	}
}
