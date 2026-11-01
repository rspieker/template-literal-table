import { test } from 'node:test';
import assert from 'node:assert/strict';
import { table } from '../../source';

const expected = [
    { id: '1', name: 'Lovely | Ancient U-shaped Minute', rarity: 'common', discount: '15%' },
    { id: '2', name: 'Big Cooking `Book`', rarity: 'common', discount: '40%' },
    { id: '3', name: 'Lovely Metal Research', rarity: 'uncommon', discount: '5%' },
    { id: '4', name: 'Square Programming Thing', rarity: 'rare', discount: undefined },
];

test('Style - absolute minimum', () => {
    const parsed = table`
        id|name|rarity|discount
        1|Lovely \\| Ancient U-shaped Minute|common|15%
        2|Big Cooking \`Book\`|common|40%
        3|Lovely Metal Research|uncommon|5%
        4|Square Programming Thing|rare
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});

test('Style - minimal', () => {
    const parsed = table`
        id | name | rarity | discount
        1 | Lovely \\| Ancient U-shaped Minute | common | 15%
        2 | Big Cooking \`Book\` | common | 40%
        3 | Lovely Metal Research|uncommon | 5%
        4 | Square Programming Thing | rare
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});

test('Style - lazy basic table', () => {
    const parsed = table`
        id | name                               | rarity   | discount
        ---|------------------------------------|----------|----------
        1  | Lovely \\| Ancient U-shaped Minute | common   | 15%
        2  | Big Cooking \`Book\`               | common   | 40%
        3  | Lovely Metal Research              | uncommon |  5%
        4  | Square Programming Thing           | rare
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});

test('Style - basic table', () => {
    const parsed = table`
        id | name                               | rarity   | discount
        ---|------------------------------------|----------|----------
        1  | Lovely \\| Ancient U-shaped Minute | common   | 15%      
        2  | Big Cooking \`Book\`               | common   | 40%      
        3  | Lovely Metal Research              | uncommon |  5%      
        4  | Square Programming Thing           | rare     |          
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});

test('Style - aligned basic table', () => {
    const parsed = table`
         id | name                               | rarity   | discount 
        ---:|:-----------------------------------|:--------:|---------:
         1  | Lovely \\| Ancient U-shaped Minute | common   | 15%      
         2  | Big Cooking \`Book\`               | common   | 40%      
         3  | Lovely Metal Research              | uncommon |  5%      
         4  | Square Programming Thing           | rare     |          
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});

test('Style - basic indented table', () => {
    const parsed = table`
        id | name                               | rarity   | discount 
        -- | ---------------------------------- | -------- | ---------
        1  | Lovely \\| Ancient U-shaped Minute | common   | 15%      
        2  | Big Cooking \`Book\`               | common   | 40%      
        3  | Lovely Metal Research              | uncommon |  5%      
        4  | Square Programming Thing           | rare     |          
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});

test('Style - basic indented aligned table', () => {
    const parsed = table`
        id  | name                               | rarity   | discount 
        :-: | :--------------------------------- | -------- | --------:
        1   | Lovely \\| Ancient U-shaped Minute | common   | 15%      
        2   | Big Cooking \`Book\`               | common   | 40%      
        3   | Lovely Metal Research              | uncommon |  5%      
        4   | Square Programming Thing           | rare     |          
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});

test('Style - bordered basic table', () => {
    const parsed = table`
        | id | name                               | rarity   | discount |
        |----|------------------------------------|----------|----------|
        | 1  | Lovely \\| Ancient U-shaped Minute | common   | 15%      |
        | 2  | Big Cooking \`Book\`               | common   | 40%      |
        | 3  | Lovely Metal Research              | uncommon |  5%      |
        | 4  | Square Programming Thing           | rare     |          |
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});

test('Style - bordered indented table', () => {
    const parsed = table`
        | id | name                               | rarity   | discount  |
        | -- | ---------------------------------- | -------- | --------- |
        | 1  | Lovely \\| Ancient U-shaped Minute | common   | 15%       |
        | 2  | Big Cooking \`Book\`               | common   | 40%       |
        | 3  | Lovely Metal Research              | uncommon |  5%       |
        | 4  | Square Programming Thing           | rare     |           |
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});

test('Style - bordered aligned table', () => {
    const parsed = table`
        | id | name                               | rarity   | discount |
        |:--:|:-----------------------------------|----------|---------:|
        | 1  | Lovely \\| Ancient U-shaped Minute | common   | 15%      |
        | 2  | Big Cooking \`Book\`               | common   | 40%      |
        | 3  | Lovely Metal Research              | uncommon |  5%      |
        | 4  | Square Programming Thing           | rare     |          |
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});

test('Style - bordered indented aligned table', () => {
    const parsed = table`
        | id  | name                               | rarity   | discount |
        | :-: | :--------------------------------- | -------- | -------: |
        | 1   | Lovely \\| Ancient U-shaped Minute | common   | 15%      |
        | 2   | Big Cooking \`Book\`               | common   | 40%      |
        | 3   | Lovely Metal Research              | uncommon |  5%      |
        | 4   | Square Programming Thing           | rare     |          |
    `;

    assert.deepStrictEqual(parsed, expected, 'interprets correctly');
});
