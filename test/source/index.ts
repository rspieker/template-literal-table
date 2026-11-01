import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as Table from '../../source';

test('exports', () => {
	assert.deepStrictEqual(
		Object.keys(Table).sort(),
		['create', 'empty', 'mapper', 'table'],
		'exports only "create", "empty", "table" and "mapper"',
	);

	assert.ok(typeof Table.create === 'function', 'exports "create" function');
	assert.ok(typeof Table.table === 'function', 'exports "table" function');
	assert.ok(typeof Table.mapper === 'function', 'exports "mapper" function');
	assert.ok(typeof Table.empty === 'function', 'exports "empty" function');
});

const { table: tag } = Table;

test('default - parses full variable tables', () => {
	const table = tag`
			letter  | index
			${'a'}  | ${1}
			${'b'}  | ${2}
			${'c'}  | ${3}
			${'d'}  | ${4}
			${'e'}  | ${5}
		`;

	assert.ok(Array.isArray(table), 'is an array');
	assert.equal(table.length, 5, 'has 5 items');

	assert.deepStrictEqual(
		table[0],
		{ letter: 'a', index: 1 },
		`matches { letter: 'a', index: 1 }, `,
	);
	assert.deepStrictEqual(
		table[1],
		{ letter: 'b', index: 2 },
		`matches { letter: 'b', index: 2 }, `,
	);
	assert.deepStrictEqual(
		table[2],
		{ letter: 'c', index: 3 },
		`matches { letter: 'c', index: 3 }, `,
	);
	assert.deepStrictEqual(
		table[3],
		{ letter: 'd', index: 4 },
		`matches { letter: 'd', index: 4 }, `,
	);
	assert.deepStrictEqual(
		table[4],
		{ letter: 'e', index: 5 },
		`matches { letter: 'e', index: 5 }, `,
	);
});

test('default - parses full static tables', () => {
	const table = tag`
			letter | index
			a      | 1
			b      | 2
			c      | 3
			d      | 4
			e      | 5
		`;

	assert.ok(Array.isArray(table), 'is an array');
	assert.equal(table.length, 5, 'has 5 items');

	assert.deepStrictEqual(
		table[0],
		{ letter: 'a', index: '1' },
		`matches { letter: 'a', index: '1' }`,
	);
	assert.deepStrictEqual(
		table[1],
		{ letter: 'b', index: '2' },
		`matches { letter: 'b', index: '2' }`,
	);
	assert.deepStrictEqual(
		table[2],
		{ letter: 'c', index: '3' },
		`matches { letter: 'c', index: '3' }`,
	);
	assert.deepStrictEqual(
		table[3],
		{ letter: 'd', index: '4' },
		`matches { letter: 'd', index: '4' }`,
	);
	assert.deepStrictEqual(
		table[4],
		{ letter: 'e', index: '5' },
		`matches { letter: 'e', index: '5' }`,
	);
});

test('default - parses mixed variable and static tables', () => {
	const table = tag`
			letter  | index
			a       | 1
			${'b'}  | ${2}
			c       | 3
			${'d'}  | ${4}
			${'e'}  | ${5}
		`;

	assert.ok(Array.isArray(table), 'is an array');
	assert.equal(table.length, 5, 'has 5 items');

	assert.deepStrictEqual(
		table[0],
		{ letter: 'a', index: '1' },
		`matches { letter: 'a', index: '1' }`,
	);
	assert.deepStrictEqual(
		table[1],
		{ letter: 'b', index: 2 },
		`matches { letter: 'b', index: 2 }`,
	);
	assert.deepStrictEqual(
		table[2],
		{ letter: 'c', index: '3' },
		`matches { letter: 'c', index: '3' }`,
	);
	assert.deepStrictEqual(
		table[3],
		{ letter: 'd', index: 4 },
		`matches { letter: 'd', index: 4 }`,
	);
	assert.deepStrictEqual(
		table[4],
		{ letter: 'e', index: 5 },
		`matches { letter: 'e', index: 5 }`,
	);
});

test('default - stringifies cells', () => {
	const table = tag`
			letter        | index
			a b           | 1
			${'b'} c      | ${true} ${false}
			c d           | ${false}
			d ${'e'}      | ${true}
			${'e'} ${'f'} | ${5} ${7}
		`;

	assert.ok(Array.isArray(table), 'is an array');
	assert.equal(table.length, 5, 'has 5 items');

	assert.deepStrictEqual(
		table[0],
		{ letter: 'a b', index: '1' },
		`matches { letter: 'a b', index: '1' }`,
	);
	assert.deepStrictEqual(
		table[1],
		{ letter: 'b c', index: 'true false' },
		`matches { letter: 'b c', index: 'true false' }`,
	);
	assert.deepStrictEqual(
		table[2],
		{ letter: 'c d', index: false },
		`matches { letter: 'c d', index: false }`,
	);
	assert.deepStrictEqual(
		table[3],
		{ letter: 'd e', index: true },
		`matches { letter: 'd e', index: true }`,
	);
	assert.deepStrictEqual(
		table[4],
		{ letter: 'e f', index: '5 7' },
		`matches { letter: 'e f', index: '5 7' }`,
	);
});

test('default - ignores divider rows', () => {
	const table = tag`
			letter  | index
			--------|-------
			a       | 1
			${'b'}  | ${2}
			c       | 3
			${'d'}  | ${4}
			${'e'}  | ${5}
		`;

	assert.ok(Array.isArray(table), 'is an array');
	assert.equal(table.length, 5, 'has 5 items');

	assert.deepStrictEqual(
		table[0],
		{ letter: 'a', index: '1' },
		`matches { letter: 'a', index: '1' }`,
	);
	assert.deepStrictEqual(
		table[1],
		{ letter: 'b', index: 2 },
		`matches { letter: 'b', index: 2 }`,
	);
	assert.deepStrictEqual(
		table[2],
		{ letter: 'c', index: '3' },
		`matches { letter: 'c', index: '3' }`,
	);
	assert.deepStrictEqual(
		table[3],
		{ letter: 'd', index: 4 },
		`matches { letter: 'd', index: 4 }`,
	);
	assert.deepStrictEqual(
		table[4],
		{ letter: 'e', index: 5 },
		`matches { letter: 'e', index: 5 }`,
	);
});

test('default - does not need to start with a newline', () => {
	const table = tag`	foo    | bar    | baz    | qux
	                    ${'a'} | ${'b'} | ${'c'} | ${'d'}
	                 `;

	assert.ok(Array.isArray(table), 'is an array');
	assert.equal(table.length, 1, 'has 1 item');

	assert.deepStrictEqual(
		table[0],
		{ foo: 'a', bar: 'b', baz: 'c', qux: 'd' },
		`matches { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }`,
	);
});

test('default - does not need to end with a newline', () => {
	const table = tag`
	              foo    | bar    | baz    | qux
	              ${'a'} | ${'b'} | ${'c'} | ${'d'}`;

	assert.ok(Array.isArray(table), 'is an array');
	assert.equal(table.length, 1, 'has 1 item');

	assert.deepStrictEqual(
		table[0],
		{ foo: 'a', bar: 'b', baz: 'c', qux: 'd' },
		`matches { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }`,
	);
});

test('default - does not need to start nor end with a newline', () => {
	const table = tag`	foo    | bar    | baz    | qux
	                    ${'a'} | ${'b'} | ${'c'} | ${'d'}`;

	assert.ok(Array.isArray(table), 'is an array');
	assert.equal(table.length, 1, 'has 1 item');

	assert.deepStrictEqual(
		table[0],
		{ foo: 'a', bar: 'b', baz: 'c', qux: 'd' },
		`matches { foo: 'a', bar: 'b', baz: 'c', qux: 'd' }`,
	);
});

test('default - treats empty cells as undefined, empty rows are ignored', () => {
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

	assert.ok(Array.isArray(table), 'is an array');
	assert.equal(table.length, 5, 'has 5 items');

	assert.deepStrictEqual(
		table[0],
		{ foo: und, bar: '2', baz: '3', qux: '4' },
		`matches { foo: undefined, bar: '2', baz: '3', qux: '4' }`,
	);
	assert.deepStrictEqual(
		table[1],
		{ foo: '1', bar: und, baz: '3', qux: '4' },
		`matches { foo: '1', bar: undefined, baz: '3', qux: '4' }`,
	);
	assert.deepStrictEqual(
		table[2],
		{ foo: '1', bar: '2', baz: und, qux: '4' },
		`matches { foo: '1', bar: '2', baz: undefined, qux: '4' }`,
	);
	assert.deepStrictEqual(
		table[3],
		{ foo: '1', bar: '2', baz: '3', qux: und },
		`matches { foo: '1', bar: '2', baz: '3', qux: undefined }`,
	);
	assert.deepStrictEqual(
		table[4],
		{ foo: '1', bar: '2', baz: '3', qux: '4' },
		`matches { foo: '1', bar: '2', baz: '3', qux: '4' }`,
	);
});

test('empty - treats empty cells as undefined, preserves empty rows', () => {
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

	assert.ok(Array.isArray(table), 'is an array');
	assert.equal(table.length, 8, 'has 8 items');

	assert.deepStrictEqual(
		table[0],
		{ foo: und, bar: 2, baz: 3, qux: 4 },
		`matches { foo: undefined, bar: 2, baz: 3, qux: 4 }`,
	);
	assert.deepStrictEqual(
		table[1],
		{ foo: 1, bar: und, baz: 3, qux: 4 },
		`matches { foo: 1, bar: undefined, baz: 3, qux: 4 }`,
	);
	assert.deepStrictEqual(
		table[2],
		{ foo: 1, bar: 2, baz: und, qux: 4 },
		`matches { foo: 1, bar: 2, baz: undefined, qux: 4 }`,
	);
	assert.deepStrictEqual(
		table[3],
		{ foo: 1, bar: 2, baz: 3, qux: und },
		`matches { foo: 1, bar: 2, baz: 3, qux: undefined }`,
	);
	assert.deepStrictEqual(
		table[4],
		{ foo: 1, bar: 2, baz: 3, qux: 4 },
		`matches { foo: 1, bar: 2, baz: 3, qux: 4 }`,
	);
	assert.deepStrictEqual(
		table[5],
		{ foo: und, bar: und, baz: und, qux: und },
		`matches { foo: undefined, bar: undefined, baz: undefined, qux: undefined }`,
	);
	assert.deepStrictEqual(
		table[6],
		{ foo: und, bar: und, baz: und, qux: und },
		`matches { foo: undefined, bar: undefined, baz: undefined, qux: undefined }`,
	);
	assert.deepStrictEqual(
		table[7],
		{ foo: und, bar: und, baz: und, qux: und },
		`matches { foo: undefined, bar: undefined, baz: undefined, qux: undefined }`,
	);
});

test('default - preserves types as provided', () => {
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
		assert.strictEqual(value, input, String(description));
	});
});

test('default - distinguishes negative zero from zero', () => {
	const [negative] = tag`
			value
			-----
			${-0}
		`;
	const [positive] = tag`
			value
			-----
			${0}
		`;

	assert.ok(Object.is(negative.value, -0), 'keeps -0');
	assert.ok(Object.is(positive.value, 0), 'does not turn 0 into -0');
});

test('default - interpolated syntax characters are values', () => {
	const [row] = tag`
			value | description
			------|------------
			${'|'} | pipe
		`;

	assert.deepStrictEqual(
		row,
		{ value: '|', description: 'pipe' },
		'does not treat an interpolated pipe as a delimiter',
	);
});

test('map - casts values', () => {
	const map = Table.mapper<{ foo: number; bar: boolean; baz: Array<string> }>(
		{
			foo: Number,
			bar: (v): boolean => Boolean(Number(v)),
			baz: (v) => [String(v)],
		},
	);
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

	assert.deepStrictEqual(records, expected, 'maps every record');
});

test('create - no filters', () => {
	const all = Table.create();
	const table = all`
		one | two
		----|-----
			|
		1   |
			| 2
		1   | 2
	`;

	assert.equal(table.length, 6, 'has 6 items');
	assert.deepStrictEqual(table[0], { one: '----', two: '-----' });
	assert.deepStrictEqual(table[1], { one: undefined, two: undefined });
	assert.deepStrictEqual(table[2], { one: '1', two: undefined });
	assert.deepStrictEqual(table[3], { one: undefined, two: '2' });
	assert.deepStrictEqual(table[4], { one: '1', two: '2' });
	assert.deepStrictEqual(table[5], { one: undefined, two: undefined });
});

test('create - custom filter', () => {
	const none = Table.create(() => false);
	const table = none`
		one | two
		----|-----
			|
		1   |
			| 2
		1   | 2
	`;

	assert.equal(table.length, 0, 'has 0 items');
});

test('create - fourth (readme example)', () => {
	const fourth = Table.create(
		(...values: Array<unknown>) =>
			Boolean(values[3]) && !/^--+$/.test(String(values[3])),
	);
	const table = fourth`
		one | two | three | four
		----|-----|-------|------
		1   | 2   | 3     | 4
		1   | 2   | 3     |
		1   | 2   |       | 4
		1   |     | 3     | 4
			| 2   | 3     | 4
	`;

	assert.equal(table.length, 4, 'has 4 items');
	assert.deepStrictEqual(table[0], { one: '1', two: '2', three: '3', four: '4' });
	assert.deepStrictEqual(table[1], { one: '1', two: '2', three: undefined, four: '4' });
	assert.deepStrictEqual(table[2], { one: '1', two: undefined, three: '3', four: '4' });
	assert.deepStrictEqual(table[3], { one: undefined, two: '2', three: '3', four: '4' });
});

test('mapper - readme example', () => {
	const { mapper } = Table;
	const mapping = {
		number: (value: unknown) => (value ? Number(value) : undefined),
		boolean: (value: unknown) => value === 'yes',
		array: (value: unknown) =>
			value ? String(value).split(/\s*,\s*/) : [],
	};
	const mapped = mapper<{
		string: string;
		number?: number;
		boolean: boolean;
		array: Array<string>;
	}>(mapping);
	const records = mapped`
	 string | number | boolean | array
	 -------|--------|---------|--------
	 foo    | 1      | yes     | a, b
	 bar    |        | no      | b, c, d
	 baz    | 7      |         |
	 `;
	const expected = [
		{ string: 'foo', number: 1, boolean: true, array: ['a', 'b'] },
		{
			string: 'bar',
			number: undefined,
			boolean: false,
			array: ['b', 'c', 'd'],
		},
		{ string: 'baz', number: 7, boolean: false, array: [] },
	];

	assert.deepStrictEqual(records, expected, 'maps the values');
});

test('parser - does not hang on escape characters', async () => {
	const expected = [
		{ foo: '[AZ]', bar: 'B', baz: '1' },
		{ foo: '[A Z]', bar: 'B', baz: '2' },
		{ foo: '[A\\tZ]', bar: 'B', baz: '3' },
		{ foo: '[A\\ Z]', bar: 'B', baz: '4' },
		{ foo: '[A\\\\tZ]', bar: 'B', baz: '5' },
		{ foo: '[A\\\\ Z]', bar: 'B', baz: '6' },
		{ foo: '[A\\\\\\tZ]', bar: 'B', baz: '7' },
	];
	const result = await Promise.race([
		new Promise((resolve) => setTimeout(resolve, 1000, 'timeout')),
		tag`
			foo         | bar | baz
			------------|-----|-----
			[AZ]        | B   | 1
			[A\tZ]      | B   | 2
			[A\\tZ]     | B   | 3
			[A\\\tZ]    | B   | 4
			[A\\\\tZ]   | B   | 5
			[A\\\\\tZ]  | B   | 6
			[A\\\\\\tZ] | B   | 7
		`,
	]);

	assert.deepStrictEqual(result, expected, 'parses the defined table');
});
