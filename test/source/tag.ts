import test from 'tape';
import tag from '../../source/tag';

test('parses full variable tables', (t) => {
	const table = tag`
			letter  | index
			${'a'}  | ${1}
			${'b'}  | ${2}
			${'c'}  | ${3}
			${'d'}  | ${4}
			${'e'}  | ${5}
		`;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 5, 'has 5 items')

	t.deepEqual(table[0], { letter: 'a', index: 1 }, `matches { letter: 'a', index: 1 }, `);
	t.deepEqual(table[1], { letter: 'b', index: 2 }, `matches { letter: 'b', index: 2 }, `);
	t.deepEqual(table[2], { letter: 'c', index: 3 }, `matches { letter: 'c', index: 3 }, `);
	t.deepEqual(table[3], { letter: 'd', index: 4 }, `matches { letter: 'd', index: 4 }, `);
	t.deepEqual(table[4], { letter: 'e', index: 5 }, `matches { letter: 'e', index: 5 }, `);

	t.end();
});

test('parses full static tables', (t) => {
	const table = tag`
			letter | index
			a      | 1
			b      | 2
			c      | 3
			d      | 4
			e      | 5
		`;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 5, 'has 5 items')

	t.deepEqual(table[0], { letter: 'a', index: '1' }, `matches { letter: 'a', index: '1' }`);
	t.deepEqual(table[1], { letter: 'b', index: '2' }, `matches { letter: 'b', index: '2' }`);
	t.deepEqual(table[2], { letter: 'c', index: '3' }, `matches { letter: 'c', index: '3' }`);
	t.deepEqual(table[3], { letter: 'd', index: '4' }, `matches { letter: 'd', index: '4' }`);
	t.deepEqual(table[4], { letter: 'e', index: '5' }, `matches { letter: 'e', index: '5' }`);

	t.end();
});

test('parses mixed variable and static tables', (t) => {
	const table = tag`
			letter  | index
			a       | 1
			${'b'}  | ${2}
			c       | 3
			${'d'}  | ${4}
			${'e'}  | ${5}
		`;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 5, 'has 5 items')

	t.deepEqual(table[0], { letter: 'a', index: '1' }, `matches { letter: 'a', index: '1' }`);
	t.deepEqual(table[1], { letter: 'b', index: 2 }, `matches { letter: 'b', index: 2 }`);
	t.deepEqual(table[2], { letter: 'c', index: '3' }, `matches { letter: 'c', index: '3' }`);
	t.deepEqual(table[3], { letter: 'd', index: 4 }, `matches { letter: 'd', index: 4 }`);
	t.deepEqual(table[4], { letter: 'e', index: 5 }, `matches { letter: 'e', index: 5 }`);

	t.end();
});

test('stringifies cells', (t) => {
	const table = tag`
			letter        | index
			a b           | 1
			${'b'} c      | ${true} ${false}
			c d           | ${false}
			d ${'e'}      | ${true}
			${'e'} ${'f'} | ${5} ${7}
		`;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 5, 'has 5 items')

	t.deepEqual(table[0], { letter: 'a b', index: '1' }, `matches { letter: 'a b', index: '1' }`);
	t.deepEqual(table[1], { letter: 'b c', index: 'true false' }, `matches { letter: 'b c', index: 'true false' }`);
	t.deepEqual(table[2], { letter: 'c d', index: false }, `matches { letter: 'c d', index: false }`);
	t.deepEqual(table[3], { letter: 'd e', index: true }, `matches { letter: 'd e', index: true }`);
	t.deepEqual(table[4], { letter: 'e f', index: '5 7' }, `matches { letter: 'e f', index: '5 7' }`);

	t.end();
});

test('ignores divider rows', (t) => {
	const table = tag`
			letter  | index
			--------|-------
			a       | 1
			${'b'}  | ${2}
			c       | 3
			${'d'}  | ${4}
			${'e'}  | ${5}
		`;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 5, 'has 5 items')

	t.deepEqual(table[0], { letter: 'a', index: '1' }, `matches { letter: 'a', index: '1' }`);
	t.deepEqual(table[1], { letter: 'b', index: 2 }, `matches { letter: 'b', index: 2 }`);
	t.deepEqual(table[2], { letter: 'c', index: '3' }, `matches { letter: 'c', index: '3' }`);
	t.deepEqual(table[3], { letter: 'd', index: 4 }, `matches { letter: 'd', index: 4 }`);
	t.deepEqual(table[4], { letter: 'e', index: 5 }, `matches { letter: 'e', index: 5 }`);

	t.end();
});

test('does not need to start with a newline', (t) => {
	const table = tag`	foo    | bar    | baz    | qux
	                    ${'a'} | ${'b'} | ${'c'} | ${'d'}
	                 `;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 1, 'has 1 item')

	t.deepEqual(table[0], { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }, `matches { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }`);

	t.end();
});

test('does not need to end with a newline', (t) => {
	const table = tag`
	              foo    | bar    | baz    | qux
	              ${'a'} | ${'b'} | ${'c'} | ${'d'}`;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 1, 'has 1 item')

	t.deepEqual(table[0], { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }, `matches { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }`);

	t.end();
});

test('does not need to start nor end with a newline', (t) => {
	const table = tag`	foo    | bar    | baz    | qux
	                    ${'a'} | ${'b'} | ${'c'} | ${'d'}`;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 1, 'has 1 item')

	t.deepEqual(table[0], { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }, `matches { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }`);

	t.end();
});

test('treats empty cells as undefined, empty rows are ignored', (t) => {
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

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 5, 'has 5 items')

	t.deepEqual(table[0], { foo: und, bar: '2', baz: '3', qux: '4' }, `matches { foo: undefined, bar: '2', baz: '3', qux: '4' }`);
	t.deepEqual(table[1], { foo: '1', bar: und, baz: '3', qux: '4' }, `matches { foo: '1', bar: undefined, baz: '3', qux: '4' }`);
	t.deepEqual(table[2], { foo: '1', bar: '2', baz: und, qux: '4' }, `matches { foo: '1', bar: '2', baz: undefined, qux: '4' }`);
	t.deepEqual(table[3], { foo: '1', bar: '2', baz: '3', qux: und }, `matches { foo: '1', bar: '2', baz: '3', qux: undefined }`);
	t.deepEqual(table[4], { foo: '1', bar: '2', baz: '3', qux: '4' }, `matches { foo: '1', bar: '2', baz: '3', qux: '4' }`);

	t.end();
});

test('treats empty cells as undefined, preserves empty rows', (t) => {
	const und = ((u) => u)();
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

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 8, 'has 8 items')

	t.deepEqual(table[0], { foo: und, bar: 2, baz: 3, qux: 4 }, `matches { foo: undefined, bar: 2, baz: 3, qux: 4 }`);
	t.deepEqual(table[1], { foo: 1, bar: und, baz: 3, qux: 4 }, `matches { foo: 1, bar: undefined, baz: 3, qux: 4 }`);
	t.deepEqual(table[2], { foo: 1, bar: 2, baz: und, qux: 4 }, `matches { foo: 1, bar: 2, baz: undefined, qux: 4 }`);
	t.deepEqual(table[3], { foo: 1, bar: 2, baz: 3, qux: und }, `matches { foo: 1, bar: 2, baz: 3, qux: undefined }`);
	t.deepEqual(table[4], { foo: 1, bar: 2, baz: 3, qux: 4 }, `matches { foo: 1, bar: 2, baz: 3, qux: 4 }`);
	t.deepEqual(table[5], { foo: und, bar: und, baz: und, qux: und }, `matches { foo: undefined, bar: undefined, baz: undefined, qux: undefined }`);
	t.deepEqual(table[6], { foo: und, bar: und, baz: und, qux: und }, `matches { foo: undefined, bar: undefined, baz: undefined, qux: undefined }`);
	t.deepEqual(table[7], { foo: und, bar: und, baz: und, qux: und }, `matches { foo: undefined, bar: undefined, baz: undefined, qux: undefined }`);

	t.end();
});
