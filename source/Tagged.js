const Value = require('./Value.js');
const Character = require('./Character.js');

const storage = new WeakMap();

/**
 * Object representing a tagged template string
 *
 * @class Tagged
 * @extends {Value}
 */
class Tagged extends Value {
	/**
	 * Obtain the tokenized representation of the template string components
	 *
	 * @readonly
	 * @memberof Tagged
	 */
	get tokenized() {
		if (!storage.has(this)) {
			const tokens = this.value
				.split('')
				.map((char) => Character.from(char));

			storage.set(this, tokens);
		}

		return storage.get(this);
	}
}

module.exports = Tagged;
