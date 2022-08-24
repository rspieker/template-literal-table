import test from 'tape';
import { table } from '../../source';

test('Security - it should not allow for prototype pollution', (t) => {
    const main = JSON.parse('{"__proto__":{"pollution":"Bad"}}');
    const nest = JSON.parse('{"deeper":{"nested":{"__proto__":{"pollution":"Worse"}}}}');

    t.equal(({} as any).pollution, undefined, 'not polluted before');

    const [a, b] = table`
        exhibit | injected
        --------|------------
        A       | ${main}
        B       | ${nest}

    ` as Array<any>;

    t.equal(({} as any).pollution, undefined, 'not polluted after');
    t.deepEqual((a as any).injected.__proto__, { pollution: 'Bad' }, '__proto__ exists in A without side effects');
    t.deepEqual((b as any).injected.deeper.nested.__proto__, { pollution: 'Worse' }, '__proto__ exists in B without side effects');

    t.end()
});
