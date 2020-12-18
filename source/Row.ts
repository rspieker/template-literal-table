import { Cell } from './Cell';
import { Collection } from './Collection';

/**
export class Row extends Collection<Cell> {
	compact(): unknown[] {
		const { items } = this;

		return items.map((cell: any) => cell.compact());
	}
}
