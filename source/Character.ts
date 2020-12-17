import { Value } from './Value';

export class Character extends Value {
	static from(value: string): Character {
		const normal = /^[^\S\n]+$/.test(value) ? ' ' : value;

		return super.from(normal) as Character;
	}
}
