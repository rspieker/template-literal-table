# Template literal - Table
Tagged template literal mapping markdown style tables into objects.

Inspired by the [Jest `test.each`](https://jestjs.io/docs/en/api#2-testeach-table-name-fn-timeout) syntax.


## Installation
```
$ npm install --save template-literal-table
```

## Exports
The following functions are exported

| name      | description                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
| `default` | The `default` export, this is `table`                                                                                 |
| `table`   | Table parser, skips divider rows (cell only containing two or more `-` characters) and rows consisting of empty cells |
| `empty`   | Table parser, skips divider rows, preserves rows consisting of empty cells                                            |
| `create`  | Table parser creator, creates a new partser function with custom row filter functions                                 |
| `mapper`  | Table parser creator, creates a new partser function which maps specific property values                              |

## Usage
The template literal syntax allows for a lot of flexibility, as any type of value can be formatted without losing the actual value by providing the `${value}` syntax. For fixed strings, you don't have to use the placeholder syntax if you don't care about its type (e.g. you cast it "manually" afterwards or its type is `string` anyway, which is what will be provided as).

```js
const table = require('template-literal-table');

const records = table`
	foo  | bar  | baz 
	-----|------|-----
	${1} | ${2} | ${4}
	${2} | ${4} | ${8}
	4    | 8    | 16  
`;

//  records = [
//    { foo: 1, bar: 2, baz: 4},
//    { foo: 2, bar: 4, baz: 8},
//    { foo: '4', bar: '8', baz: '16'},
//  ]
```

## API

### `table` (`default`)
The `table` function is the recommended use, as it parses table structures as most likely intended

```js
import { table } from('template-literal-table');

const records = table`
	foo  | bar   | baz
	-----|-------|-----
	     |
	one
	     | two
	     |       | three
	${1} | ${2}  | ${4}
	${2} | ${4}  | ${8}
	4    | 8     | 16
`;

//  records = [
//    { foo: 'one', bar: undefined, baz: undefined},
//    { foo: undefined, bar: 'two', baz: undefined},
//    { foo: undefined, bar: undefined, baz: 'three'},
//    { foo: 1, bar: 2, baz: 4},
//    { foo: 2, bar: 4, baz: 8},
//    { foo: '4', bar: '8', baz: '16'},
//  ]
```

### `empty`
Like the `table` function, with the difference that empty lines will be preserved, do note that any newline in the table structure will become a new "row", regardless of the intention. This means that a trailing newline (as show below) will also result in a record with undefined values.

```js
import { empty } from('template-literal-table');

const records = empty`
	foo  | bar   | baz
	-----|-------|-----
	     |
	one
	     | two
	     |       | three
	${1} | ${2}  | ${4}
	${2} | ${4}  | ${8}
	4    | 8     | 16
`;

//  records = [
//    { foo: undefined, bar: undefined, baz: undefined},
//    { foo: 'one', bar: undefined, baz: undefined},
//    { foo: undefined, bar: 'two', baz: undefined},
//    { foo: undefined, bar: undefined, baz: 'three'},
//    { foo: 1, bar: 2, baz: 4},
//    { foo: 2, bar: 4, baz: 8},
//    { foo: '4', bar: '8', baz: '16'},
//    { foo: undefined, bar: undefined, baz: undefined},
//  ]
```

### `create`
The `table` and `empty` function should cover most scenarios, though sometimes one needs different filters to be applied to the records passed in. For this purpose the `create` function exists, it allows any number of filters to be specified, which will be applied _before_ the records are created from the values, meaning the filter functions will receive all values as argument.

The filter function signature is `(...cells: Array<unknown>) => boolean`

```js
import { create } from 'template-literal-table';

// if the fourth column contains a value that is not a divider we want it to be present
const fourth = create((...values: Array<unknown>) => Boolean(values[3]) && !/^--+$/.test(String(values[3])) );
const records = fourth`
 | one | two | three | four |
 | --- | --- | ----- | ---- |
 | 1   | 2   | 3     | 4    |
 | 1   | 2   | 3     |
 | 1   | 2   |       | 4    |
 | 1   |     | 3     | 4    |
 | 2   | 3   | 4     |
`;

//  records = [
//    { one: '1', two: '2', three: '3', four: '4' },
//    { one: '1', two: '2', three: undefined, four: '4' },
//    { one: '1', two: undefined, three: '3', four: '4' },
//    { one: undefined, two: '2', three: '3', four: '4' },
//  ]
```

### `mapper`
It can be convenient to simplify a table and then mapping the values into a specific type or format. For this purpose the `mapper` function exists, it receives a mapper object defining all the properties with a mapping function as value. The mappings will be applied _after_ the records are created from the values, meaning the mapping functions will receive only the value of records that were preserved during filtering.

```js
import { mapper } from 'template-literal-table';

// define the mapping
const mapping = {
	// we can skip the string conversion, as all values are strings by default
	number: (value) => value.length ? Number(value): undefined,
	boolean: (value) => value === 'yes',
	array: (value) => value.split(/\s*,\s*/),
};
const mapped = mapper();
const records = mapped`
 string | number | boolean | array  
 ------ | ------ | ------- | -------
 foo    | 1      | yes     | a, b   
 bar    |        | no      | b, c, d
 baz    | 7      |         |        
 `;

//  records = [
//    { string: 'foo', number: 1, boolean: true, array: ['a', 'b'] },
//    { string: 'bar', number: undefined, boolean: false, array: ['b', 'c', 'd'] },
//    { string: 'baz', number: 7, boolean: false, array: [] },
//  ]
```

### Filters

Filters provided to the `create` function are applied after the "cell" values have been normalized and before the values are turned into the record objects.

This means that every cells' value has been trimmed of whitespace and the raw values are restored or merged if there's more than one.
This process consists of the following steps:

- remove trailing and leading space from the cell
- restore the original value
- if there's more than one value in a cell, merge it (this will _always_ result in a string value)

In the table below some samples are shown:

```md
 input         | typeof    | output             
---------------|-----------|--------------------
 1             | string    | (string) `'1'`     
 ${1}          | number    | (number) `1`       
---------------|-----------|--------------------
 true          | string    | (string) `'true'`  
 ${true}       | boolean   | (boolean) `true`   
 false         | string    | (string) `'false'` 
 ${false}      | boolean   | (boolean) `false`  
---------------|-----------|--------------------
 1 2           | string    | (string) `'1 2'`   
 ${1} 2        | string    | (string) `'1 2'`   
 1 ${2}        | string    | (string) `'1 2'`   
 ${1} ${2}     | string    | (string) `'1 2'`   
 ```

## Tips

### Prettier
_This tip was suggested by @LucasSegersFabro_
If you want prettier to format your tables automatically, you can trick it into thinking it is looking at the Jest each syntax (which unfortunatly a hardcoded pattern within prettier).

```js
// for formatting purposes
const it = {
  each: table,
};

const test = suite('Common processor tests');

const Table = it.each`
  your   | table | here
  -------|-------|------
  thanks | to    | @LucasSegersFabro
`;
```

# License

MIT License Copyright (c) 2018-2021 Rogier Spieker

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
