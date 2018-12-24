const Table = require('./Table.js');

module.exports = (template, ...data) => {
	const table = new Table(template, ...data);

	return table.records;
};
