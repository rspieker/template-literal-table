import { Collection } from './Collection';
import { Character } from './Character';
import { Value } from './Value';

const space = Character.from(' ');

export class Cell extends Collection<Value> {
	trim(): Cell {
		const { items } = this;
		let first = 0;

		while (items[items.length - 1] === space) {
			items.length -= 1;
		}

		if (items.length) {
			while (items[first] === space) {
				++first;
			}

			items.splice(0, first);
		}

		return this;
	}

	compact() {
		const { items } = this.trim();

		if (items.length <= 1) {
			return items.length ? items[0].value : undefined;
		}

		return items.map((token) => token.value).join('');
	}
}
