const Value = require('./Value.js');

module.exports = {
	separator: Value.from('|'),
	divider: Value.from('-'),
	whitespace: Value.from(' '),
	EOL: Value.from('\n')
};
