const { expect } = require('code');
const { after, before, describe, it } = (exports.lab = require('lab').script());

const tag = require('../source/tag.js');

describe('Table', () => {
	it('parses full variable tables', () => {
		const table = tag`
			letter  | index
			${'a'}  | ${1}
			${'b'}  | ${2}
			${'c'}  | ${3}
			${'d'}  | ${4}
			${'e'}  | ${5}
		`;

		expect(table).to.be.array();
		expect(table).to.have.length(5);

		expect(table[0]).to.equal({ letter: 'a', index: 1 });
		expect(table[1]).to.equal({ letter: 'b', index: 2 });
		expect(table[2]).to.equal({ letter: 'c', index: 3 });
		expect(table[3]).to.equal({ letter: 'd', index: 4 });
		expect(table[4]).to.equal({ letter: 'e', index: 5 });
	});

	it('parses full static tables', () => {
		const table = tag`
			letter | index
			a      | 1
			b      | 2
			c      | 3
			d      | 4
			e      | 5
		`;

		expect(table).to.be.array();
		expect(table).to.have.length(5);

		expect(table[0]).to.equal({ letter: 'a', index: '1' });
		expect(table[1]).to.equal({ letter: 'b', index: '2' });
		expect(table[2]).to.equal({ letter: 'c', index: '3' });
		expect(table[3]).to.equal({ letter: 'd', index: '4' });
		expect(table[4]).to.equal({ letter: 'e', index: '5' });
	});

	it('parses mixed variable and static tables', () => {
		const table = tag`
			letter  | index
			a       | 1
			${'b'}  | ${2}
			c       | 3
			${'d'}  | ${4}
			${'e'}  | ${5}
		`;

		expect(table).to.be.array();
		expect(table).to.have.length(5);

		expect(table[0]).to.equal({ letter: 'a', index: '1' });
		expect(table[1]).to.equal({ letter: 'b', index: 2 });
		expect(table[2]).to.equal({ letter: 'c', index: '3' });
		expect(table[3]).to.equal({ letter: 'd', index: 4 });
		expect(table[4]).to.equal({ letter: 'e', index: 5 });
	});

	it('ignores divider rows', () => {
		const table = tag`
			letter  | index
			--------|-------
			a       | 1
			${'b'}  | ${2}
			c       | 3
			${'d'}  | ${4}
			${'e'}  | ${5}
		`;

		expect(table).to.be.array();
		expect(table).to.have.length(5);

		expect(table[0]).to.equal({ letter: 'a', index: '1' });
		expect(table[1]).to.equal({ letter: 'b', index: 2 });
		expect(table[2]).to.equal({ letter: 'c', index: '3' });
		expect(table[3]).to.equal({ letter: 'd', index: 4 });
		expect(table[4]).to.equal({ letter: 'e', index: 5 });
	});

	it('does not need to start with a newline', () => {
		const table = tag`	foo    | bar    | baz    | qux
							${'a'} | ${'b'} | ${'c'} | ${'d'}
						 `;

		expect(table).to.be.array();
		expect(table).to.have.length(1);

		expect(table[0]).to.equal({ foo: 'a', bar: 'b', baz: 'c', qux: 'd' });
	});

	it('does not need to end with a newline', () => {
		const table = tag`
			foo    | bar    | baz    | qux
			${'a'} | ${'b'} | ${'c'} | ${'d'}`;

		expect(table).to.be.array();
		expect(table).to.have.length(1);

		expect(table[0]).to.equal({ foo: 'a', bar: 'b', baz: 'c', qux: 'd' });
	});

	it('does not need to start nor end with a newline', () => {
		const table = tag`	foo    | bar    | baz    | qux
							${'a'} | ${'b'} | ${'c'} | ${'d'}`;

		expect(table).to.be.array();
		expect(table).to.have.length(1);

		expect(table[0]).to.equal({ foo: 'a', bar: 'b', baz: 'c', qux: 'd' });
	});

	it('treats empty cells as undefined, empty rows are ignored', () => {
		const und = ((u) => u)();
		const table = tag`
			foo | bar | baz | qux
				| 2   | 3   | 4
			1   |     | 3   | 4
			1   | 2   |     | 4
			1   | 2   | 3
			1   | 2   | 3   | 4
				|     |     |
				|     |
				|`;

		expect(table).to.be.array();
		expect(table).to.have.length(5);

		expect(table[0]).to.equal({ foo: und, bar: '2', baz: '3', qux: '4' });
		expect(table[1]).to.equal({ foo: '1', bar: und, baz: '3', qux: '4' });
		expect(table[2]).to.equal({ foo: '1', bar: '2', baz: und, qux: '4' });
		expect(table[3]).to.equal({ foo: '1', bar: '2', baz: '3', qux: und });
		expect(table[4]).to.equal({ foo: '1', bar: '2', baz: '3', qux: '4' });
	});

	it('treats empty cells as undefined, preserves empty rows', () => {
		const u = ((u) => u)();
		const table = tag.empty`
			foo  | bar  | baz | qux
				 | ${2} | ${3} | ${4}
			${1} |      | ${3} | ${4}
			${1} | ${2} |      | ${4}
			${1} | ${2} | ${3}
			${1} | ${2} | ${3} | ${4}
				 |      |      |
				 |      |
				 |`;

		expect(table).to.be.array();
		expect(table).to.have.length(8);

		expect(table[0]).to.equal({ foo: u, bar: 2, baz: 3, qux: 4 });
		expect(table[1]).to.equal({ foo: 1, bar: u, baz: 3, qux: 4 });
		expect(table[2]).to.equal({ foo: 1, bar: 2, baz: u, qux: 4 });
		expect(table[3]).to.equal({ foo: 1, bar: 2, baz: 3, qux: u });
		expect(table[4]).to.equal({ foo: 1, bar: 2, baz: 3, qux: 4 });
		expect(table[5]).to.equal({ foo: u, bar: u, baz: u, qux: u });
		expect(table[6]).to.equal({ foo: u, bar: u, baz: u, qux: u });
		expect(table[7]).to.equal({ foo: u, bar: u, baz: u, qux: u });
	});
});
