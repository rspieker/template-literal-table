/**
 * Collection
 * Base Collection class, holding the same generic type
 *
 * @export
 * @class Collection
 * @template T
 */
export class Collection<T extends unknown> {
	/**
	 * Creates an instance of Collection
	 *
	 * @param {T[]} [items=[]]
	 * @memberof Collection
	 */
	constructor(public readonly items: T[] = []) { }

	/**
	 * last
	 * Get the last item within the collection
	 *
	 * @readonly
	 * @type {T}
	 * @memberof Collection
	 */
	get last(): T {
		const { items } = this;

		return items[items.length - 1];
	}

	/**
	 * append
	 * Append an item to the collection
	 *
	 * @param {T} item
	 * @returns {T}
	 * @memberof Collection
	 */
	append(item: T): T {
		const { items } = this;

		items.push(item);

		return item;
	}
}
