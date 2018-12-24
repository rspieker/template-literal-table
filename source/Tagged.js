const { EOL, separator, divider } = require('./Symbols.js');

class Tagged {
	constructor(value) {
		this.template = value;
	}

	get value() {
		return this.template;
	}

	tokenize() {
		const { value } = this;

		if (value.trim() === '|') {
			return separator;
		}

		return value.split('')
			.map((char) => char === '\n' ? EOL : char)
			.map((char) => char === '|' ? separator : char)
			.reduce((carry, char) => {
				const prev = carry.length - 1;

				if (typeof char === 'string' && typeof carry[prev] === 'string') {
					carry[prev] += char;
				}
				else {
					carry.push(char);
				}

				return carry;
			}, [])
			.map((value) => typeof value === 'string' ? value.trim() : value)
			.map((value) => typeof value === 'string' && /^-{2,}$/.test(value) ? divider : value);
	}
}

module.exports = Tagged;
