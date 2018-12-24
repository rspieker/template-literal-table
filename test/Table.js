const { expect } = require('code');
const { after, before, describe, it } = exports.lab = require('lab').script();

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
});
