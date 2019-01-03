const Value = require('./Value.js');
const { EOL, separator, whitespace } = require('./prepared.js');

class Character extends Value {
	static from(value) {
		if (value === '\n') return EOL;
		if (value === '|') return separator;
		if (/^\s+$/.test(value)) return whitespace;

		return super.from(value);
	}
}

module.exports = Character;
