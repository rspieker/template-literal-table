import { Cell } from './Cell';
import { Record } from './Record';

export class Row extends Record<Cell> {
	compact(): unknown[] {
		const { items } = this;

		return items.map((cell: any) => cell.compact());
	}
}
