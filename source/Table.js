const Tagged = require('./Tagged.js');
const Variable = require('./Variable.js');

const { EOL, separator, divider } = require('./Symbols.js');
const storage = new WeakMap();

class Table {
	constructor(template, ...data) {
		storage.set(this, {
			tagged: template.map((value) => new Tagged(value)),
			variable: data.map((value) => new Variable(value)),
		});
	}

	get interleave() {
		const { tagged, variable } = storage.get(this);

		return tagged
			.reduce((carry, value, index) => carry.concat(
				value,
				index < variable.length ? variable[index] : []
			), []);
	}

	get tokenized() {
		return this.interleave
			.reduce((carry, component) => carry.concat(component.tokenize()), [])
			.filter((component) => component && !(component === separator));
	}

	get components() {
		return this.tokenized
			.reduce((carry, component) => {
				if (component === EOL) {
					return carry.concat([[]]);
				}
				carry[carry.length - 1].push(component);

				return carry;
			}, [[]])
			.filter((list) => list.length && list.filter((value) => !(value === divider)).length);
	}

	get records() {
		const [header, ...records] = this.components;

		return records.map((list) => list
			.reduce((carry, value, index) => ({
				...carry,
				[header[index]]: value instanceof Variable ? value.value : value,
			}), {})
		);
	}
}

module.exports = Table;
