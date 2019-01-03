const storage = new WeakMap();

/**
 * Basic collection
 *
 * @class Record
 */
class Record {
	/**
	 * Creates an instance of Record
	 *
	 * @memberof Record
	 */
	constructor() {
		storage.set(this, { items: [] });
	}

	/**
	 * Obtain all recorded items
	 *
	 * @readonly
	 * @memberof Record
	 */
	get items() {
		const { items } = storage.get(this);

		return items;
	}

	/**
	 * Obtain the last recorded item
	 *
	 * @readonly
	 * @memberof Record
	 */
	get last() {
		const { items } = this;

		return items[items.length - 1];
	}

	/**
	 * Add the item to the record
	 *
	 * @param    {*} item
	 * @returns  {*} item
	 * @memberof Record
	 */
	append(item) {
		const { items } = this;

		items.push(item);

		return item;
	}
}

module.exports = Record;
