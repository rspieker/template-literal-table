import { Value } from './Value';
import { Character } from './Character';

export class Tagged extends Value {
	readonly tokenized: Character[];

	constructor(value: string) {
		super(value);

		this.tokenized = Array.from(value, (char: string) => Character.from(char) as Character);
	}

	static from(value: string): Tagged {
		return super.from(value) as Tagged;
	}
}
