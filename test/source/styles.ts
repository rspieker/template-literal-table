import test from 'tape';
import { table } from '../../source';

const expected = [
    { id: '1', name: 'Lovely | Ancient U-shaped Minute', rarity: 'common', discount: '15%' },
    { id: '2', name: 'Big Cooking `Book`', rarity: 'common', discount: '40%' },
    { id: '3', name: 'Lovely Metal Research', rarity: 'uncommon', discount: '5%' },
    { id: '4', name: 'Square Programming Thing', rarity: 'rare', discount: undefined },
];

test('Style - absolute minimum', (t) => {
    const parsed = table`
        id|name|rarity|discount
        1|Lovely \\| Ancient U-shaped Minute|common|15%
        2|Big Cooking \`Book\`|common|40%
        3|Lovely Metal Research|uncommon|5%
        4|Square Programming Thing|rare
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});

test('Style - minimal', (t) => {
    const parsed = table`
        id | name | rarity | discount
        1 | Lovely \\| Ancient U-shaped Minute | common | 15%
        2 | Big Cooking \`Book\` | common | 40%
        3 | Lovely Metal Research|uncommon | 5%
        4 | Square Programming Thing | rare
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});

test('Style - lazy basic table', (t) => {
    const parsed = table`
        id | name                               | rarity   | discount
        ---|------------------------------------|----------|----------
        1  | Lovely \\| Ancient U-shaped Minute | common   | 15%
        2  | Big Cooking \`Book\`               | common   | 40%
        3  | Lovely Metal Research              | uncommon |  5%
        4  | Square Programming Thing           | rare
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});

test('Style - basic table', (t) => {
    const parsed = table`
        id | name                               | rarity   | discount
        ---|------------------------------------|----------|----------
        1  | Lovely \\| Ancient U-shaped Minute | common   | 15%      
        2  | Big Cooking \`Book\`               | common   | 40%      
        3  | Lovely Metal Research              | uncommon |  5%      
        4  | Square Programming Thing           | rare     |          
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});

test('Style - aligned basic table', (t) => {
    const parsed = table`
         id | name                               | rarity   | discount 
        ---:|:-----------------------------------|:--------:|---------:
         1  | Lovely \\| Ancient U-shaped Minute | common   | 15%      
         2  | Big Cooking \`Book\`               | common   | 40%      
         3  | Lovely Metal Research              | uncommon |  5%      
         4  | Square Programming Thing           | rare     |          
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});

test('Style - basic indented table', (t) => {
    const parsed = table`
        id | name                               | rarity   | discount 
        -- | ---------------------------------- | -------- | ---------
        1  | Lovely \\| Ancient U-shaped Minute | common   | 15%      
        2  | Big Cooking \`Book\`               | common   | 40%      
        3  | Lovely Metal Research              | uncommon |  5%      
        4  | Square Programming Thing           | rare     |          
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});

test('Style - basic indented aligned table', (t) => {
    const parsed = table`
        id  | name                               | rarity   | discount 
        :-: | :--------------------------------- | -------- | --------:
        1   | Lovely \\| Ancient U-shaped Minute | common   | 15%      
        2   | Big Cooking \`Book\`               | common   | 40%      
        3   | Lovely Metal Research              | uncommon |  5%      
        4   | Square Programming Thing           | rare     |          
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});

test('Style - bordered basic table', (t) => {
    const parsed = table`
        | id | name                               | rarity   | discount |
        |----|------------------------------------|----------|----------|
        | 1  | Lovely \\| Ancient U-shaped Minute | common   | 15%      |
        | 2  | Big Cooking \`Book\`               | common   | 40%      |
        | 3  | Lovely Metal Research              | uncommon |  5%      |
        | 4  | Square Programming Thing           | rare     |          |
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});

test('Style - bordered indented table', (t) => {
    const parsed = table`
        | id | name                               | rarity   | discount  |
        | -- | ---------------------------------- | -------- | --------- |
        | 1  | Lovely \\| Ancient U-shaped Minute | common   | 15%       |
        | 2  | Big Cooking \`Book\`               | common   | 40%       |
        | 3  | Lovely Metal Research              | uncommon |  5%       |
        | 4  | Square Programming Thing           | rare     |           |
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});

test('Style - bordered aligned table', (t) => {
    const parsed = table`
        | id | name                               | rarity   | discount |
        |:--:|:-----------------------------------|----------|---------:|
        | 1  | Lovely \\| Ancient U-shaped Minute | common   | 15%       |
        | 2  | Big Cooking \`Book\`               | common   | 40%       |
        | 3  | Lovely Metal Research              | uncommon |  5%       |
        | 4  | Square Programming Thing           | rare     |           |
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});

test('Style - bordered indented aligned table', (t) => {
    const parsed = table`
        | id  | name                               | rarity   | discount |
        | :-: | :--------------------------------- | -------- | -------: |
        | 1   | Lovely \\| Ancient U-shaped Minute | common   | 15%      |
        | 2   | Big Cooking \`Book\`               | common   | 40%      |
        | 3   | Lovely Metal Research              | uncommon |  5%      |
        | 4   | Square Programming Thing           | rare     |          |
    `;

    t.deepEqual(parsed, expected, 'interprets correctly');

    t.end();
});
