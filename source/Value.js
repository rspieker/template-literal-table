const storage = new WeakMap();

/**
 * Cachable value representation
 *
 * @class Value
 */
class Value {
	/**
	 * Creates an instance of Value
	 *
	 * @param {*} value
	 * @memberof Value
	 */
	constructor(value) {
		storage.set(this, value);
	}

	/**
	 * Obtain the stored value
	 *
	 * @readonly
	 * @memberof Value
	 */
	get value() {
		return storage.get(this);
	}

	/**
	 * Obtain a Value instance by its original value
	 * (re-uses from cache if applicable)
	 *
	 * @static
	 * @param    {*} value
	 * @returns  {*}
	 * @memberof Value
	 */
	static from(value) {
		if (!storage.has(this)) {
			storage.set(this, new Map());
		}
		const cache = storage.get(this);

		if (!cache.has(value)) {
			cache.set(value, new this(value));
		}

		return cache.get(value);
	}
}

module.exports = Value;
