export class Record<T extends unknown> {
	readonly items: T[] = [];

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
