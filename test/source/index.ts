import test from 'tape';
import * as Table from '../../source';

test('exports', (t) => {
	t.deepEqual(Object.keys(Table), ['create', 'empty', 'table', 'mapper', 'default'], 'exports only "create", "empty", "table", "mapper" and "default"');

	t.true(typeof Table.create === 'function', 'exports "create" function');
	t.true(typeof Table.table === 'function', 'exports "table" function');
	t.true(typeof Table.mapper === 'function', 'exports "mapper" function');
	t.true(typeof Table.empty === 'function', 'exports "empty" function');

	t.true(typeof Table.default === 'function', 'exports "default" function');
	t.equal(Table.default, Table.table, 'exported "default" is the "table" function');

	t.end();
});

const { default: tag } = Table;

test('default - parses full variable tables', (t) => {
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

test('default - parses full static tables', (t) => {
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

test('default - parses mixed variable and static tables', (t) => {
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

test('default - stringifies cells', (t) => {
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

test('default - ignores divider rows', (t) => {
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

test('default - does not need to start with a newline', (t) => {
	const table = tag`	foo    | bar    | baz    | qux
	                    ${'a'} | ${'b'} | ${'c'} | ${'d'}
	                 `;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 1, 'has 1 item')

	t.deepEqual(table[0], { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }, `matches { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }`);

	t.end();
});

test('default - does not need to end with a newline', (t) => {
	const table = tag`
	              foo    | bar    | baz    | qux
	              ${'a'} | ${'b'} | ${'c'} | ${'d'}`;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 1, 'has 1 item')

	t.deepEqual(table[0], { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }, `matches { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }`);

	t.end();
});

test('default - does not need to start nor end with a newline', (t) => {
	const table = tag`	foo    | bar    | baz    | qux
	                    ${'a'} | ${'b'} | ${'c'} | ${'d'}`;

	t.true(Array.isArray(table), 'is an array');
	t.equal(table.length, 1, 'has 1 item')

	t.deepEqual(table[0], { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }, `matches { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }`);

	t.end();
});

test('default - treats empty cells as undefined, empty rows are ignored', (t) => {
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

test('empty - treats empty cells as undefined, preserves empty rows', (t) => {
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

test('default - preserves types as provided', (t) => {
	const array = [1, 2, 3];
	const object = { hello: 'world' };
	const date = new Date();
	const types = [array, object, date];
	const table = tag`
			value     | description
			----------|-------
			${array}  | array
			${object} | object
			${date}   | Date
	`;

	types.forEach((input, index) => {
		const { description, value } = table[index];
		t.strictEqual(value, input, String(description));
	});

	t.end();
});

test('map - casts values', (t) => {
	const map = Table.mapper<{ foo: number, bar: boolean, baz: Array<string> }>({ foo: Number, bar: (v): boolean => Boolean(Number(v)), baz: (v) => [String(v)] });
	const records = map`
		foo | bar | baz
		----|-----|-----
		7   | 1   | 3
		2   | 0   | 0
	`;
	const expected = [
		{ foo: 7, bar: true, baz: ['3'] },
		{ foo: 2, bar: false, baz: ['0'] },
	];

	t.deepEqual(records, expected, 'maps every record');

	t.end();
});

test('create - no filters', (t) => {
	const all = Table.create();
	const table = all`
		one | two
		----|-----
			|
		1   |
			| 2
		1   | 2
	`;

	t.equal(table.length, 6, 'has 6 items');
	t.deepEqual(table[0], { one: '----', two: '-----' });
	t.deepEqual(table[1], { one: undefined, two: undefined });
	t.deepEqual(table[2], { one: '1', two: undefined });
	t.deepEqual(table[3], { one: undefined, two: '2' });
	t.deepEqual(table[4], { one: '1', two: '2' });
	t.deepEqual(table[5], { one: undefined, two: undefined });

	t.end();
});

test('create - custom filter', (t) => {
	const none = Table.create(() => false);
	const table = none`
		one | two
		----|-----
			|
		1   |
			| 2
		1   | 2
	`;

	t.equal(table.length, 0, 'has 0 items');

	t.end();
});

test('create - fourth (readme example)', (t) => {
	const fourth = Table.create((...values: unknown[]) => Boolean(values[3]) && !/^--+$/.test(String(values[3])));
	const table = fourth`
		one | two | three | four
		----|-----|-------|------
		1   | 2   | 3     | 4
		1   | 2   | 3     |
		1   | 2   |       | 4
		1   |     | 3     | 4
			| 2   | 3     | 4
	`;

	t.equal(table.length, 4, 'has 4 items');
	t.deepEqual(table[0], { one: '1', two: '2', three: '3', four: '4' });
	t.deepEqual(table[1], { one: '1', two: '2', three: undefined, four: '4' });
	t.deepEqual(table[2], { one: '1', two: undefined, three: '3', four: '4' });
	t.deepEqual(table[3], { one: undefined, two: '2', three: '3', four: '4' });

	t.end();
});

test('mapper - readme example', (t) => {
	const { mapper } = Table;
	const mapping = {
		number: (value: unknown) => value ? Number(value) : undefined,
		boolean: (value: unknown) => value === 'yes',
		array: (value: unknown) => value ? String(value).split(/\s*,\s*/) : [],
	};
	const mapped = mapper<{ string: string, number?: number, boolean: boolean, array: Array<string> }>(mapping);
	const records = mapped`
	 string | number | boolean | array  
	 ------ | ------ | ------- | -------
	 foo    | 1      | yes     | a, b   
	 bar    |        | no      | b, c, d
	 baz    | 7      |         |        
	 `;
	const expected = [
		{ string: 'foo', number: 1, boolean: true, array: ['a', 'b'] },
		{ string: 'bar', number: undefined, boolean: false, array: ['b', 'c', 'd'] },
		{ string: 'baz', number: 7, boolean: false, array: [] },
	]

	t.deepEqual(records, expected, 'maps the values');

	t.end();
});
