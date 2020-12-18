/**
 * Value
 * Representation of a single value
 *
 * @export
 * @class Value
 */
export class Value {
	// storage containing each class (and extend) unique value instances
	private static storage: WeakMap<typeof Value, unknown> = new WeakMap();

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
		if (!this.storage.has(this)) {
			this.storage.set(this, new Map());
		}
		const cache = this.storage.get(this) as Map<unknown, Value>;

		if (!cache.has(value)) {
			cache.set(value, new this(value));
		}

		return cache.get(value) as Value;
	}
}
