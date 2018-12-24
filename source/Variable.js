class Variable {
	constructor(value) {
		this.data = value;
	}

	get value() {
		return this.data;
	}

	tokenize() {
		return this;
	}
}

module.exports = Variable;
