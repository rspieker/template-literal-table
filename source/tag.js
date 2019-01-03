const Table = require('./Table.js');

/**
 * filter divider rows
 *
 * @param   {array} row
 * @returns bool
 */
function divider(row) {
	return row.filter((cell) => !/^-{2,}$/.test(cell)).length;
}

/**
 * filter rows consisting of only undefined values
 *
 * @param   {array} row
 * @returns bool
 */
function defined(row) {
	return row.filter((cell) => typeof cell !== 'undefined').length;
}

/**
 * The main string literal template
 *
 * @param {*} args
 * @returns
 */
function tag(...args) {
	return new Table(...args).records(divider, defined);
}

/**
 * The nested string literal template presering fully undefined records
 *
 * @param {*} args
 * @returns
 */
tag.empty = (...args) => {
	return new Table(...args).records(divider);
};

module.exports = tag;
