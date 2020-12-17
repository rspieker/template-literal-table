export class Value {
	private static storage: WeakMap<typeof Value, unknown> = new WeakMap();

	constructor(public readonly value: unknown) { }

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
