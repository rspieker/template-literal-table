export class Collection<T extends unknown> {
	constructor(public readonly items: T[] = []) { }

	get last(): T {
		const { items } = this;

		return items[items.length - 1];
	}

	append(item: T): T {
		const { items } = this;

		items.push(item);

		return item;
	}
}
