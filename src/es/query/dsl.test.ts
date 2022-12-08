import { test } from '@japa/runner'
import { WhereParam, QuerySchema, SUFFIX } from '../../base/types'
import { where } from './dsl'

// import { whereByQuery } from './QueryBuilder';
// import { orderByLimit } from './QueryPagition';
import { SUFFIX_COVER_TEST, isCoverOrCoverError } from '../../test/Const';


test('Test : DSL', () => {

    // isCoverOrCoverError(where)
    const root: WhereParam = [
        { column: 'name',  value: '刘', type: 'string' },
    ]
    console.log(JSON.stringify(where(root)));
    // console.log(JSON.stringify(where(root).constant_score?.filter.bool, null, 1))
    // console.log(root)
    // console.log('DSL BUILDER')
})
    .pin();

;

test('Test : DSL', () => {

    // isCoverOrCoverError()
    const root: WhereParam = [
        { column: 'a1', fn: '<', value: 'value1' },
        { column: 'a2', fn: '<', value: 'value2' },
        {
            link: 'OR', items: [
                { column: 'b1', fn: 'Like', value: 'value3' },
                {
                    link: 'OR', items: [
                        { column: 'd1', value: 'test1' },
                        { column: 'd2', value: 'test2' },
                        {
                            link: 'AND', items: [
                                { column: 'e1', value: 'test6' },
                                { column: 'e2', value: 'test7' },

                            ]
                        }
                    ]
                },
                { column: 'b2', fn: '>=', value: 'value4' },
            ]
        },
        { column: 'a3', fn: '<', value: 'value1' },

    ]
    console.log(JSON.stringify(where(root), null, 1))
    // console.log(root)
    // console.log('DSL BUILDER')
})
    // .pin();

    ;