import { test } from 'node:test';
import assert from 'node:assert/strict';
import { table } from '../../source';

test('Security - it should not allow for prototype pollution', () => {
    const main = JSON.parse('{"__proto__":{"pollution":"Bad"}}');
    const nest = JSON.parse('{"deeper":{"nested":{"__proto__":{"pollution":"Worse"}}}}');

    assert.equal(({} as any).pollution, undefined, 'not polluted before');

    const [a, b] = table`
        exhibit | injected
        --------|------------
        A       | ${main}
        B       | ${nest}

    ` as Array<any>;

    assert.equal(({} as any).pollution, undefined, 'not polluted after');
    assert.deepStrictEqual((a as any).injected.__proto__, { pollution: 'Bad' }, '__proto__ exists in A without side effects');
    assert.deepStrictEqual((b as any).injected.deeper.nested.__proto__, { pollution: 'Worse' }, '__proto__ exists in B without side effects');
});
