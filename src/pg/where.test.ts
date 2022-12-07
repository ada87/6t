import { test } from '@japa/runner'
import { FIELD_MAP } from '../test/pg';
import { WhereParam, QuerySchema, SUFFIX } from '../base/types'
import { where, between, betweenNumber, betweenDate } from './where'
import { queryToCondition } from '../base/QueryBuilder';
import { isCoverOrCoverError } from '../test/Const';
// import { whereByQuery } from './QueryBuilder';
// import { orderByLimit } from './QueryPagition';


test('Test : Between Number', ({ assert }, txt) => {
    // console.log(txt, getNumberRange(txt as any))

    // let query: any = {};
    // for (let suffix of SUFFIX) {
    //     query['age' + suffix] = 12;
    //     // query['name' + suffix] = 'abc';
    // }
    const query: any = { ageBt: txt }
    // console.log(query)
    let condition = queryToCondition(query, FIELD_MAP, new Map());
    // console.log(condition)
    // console.log(condition.items.length);
    const [sql, param] = where(condition);
    console.log(query.ageBt, sql, param)


}).with([
    '',
    '0,20',
    '0,',
    ',20',
    '(0,20',
    '[0,20',
    '0,20)',
    '0,20]',
    '[0,20]',
    '(0,20)',
    '0,20,df,fads',
])
    ;

test('Test : Between Date', ({ assert }, txt) => {
    console.log(txt, betweenDate(txt as any))
}).with([
    '',
    '2022-11-11,2022-11-12',
    '2022-11-11 11:11:11,2022-11-12 12:12',
    '[2022-11-11,2022-11-12]',
    '(2022-11-11,2022-11-12)',
    '0,20,df,fads',
])
    ;



test('Test : WhereToSql', ({ assert }) => {
    assert.throws(() => where({
        // string not support MaxD will throw a error
        link: 'AND', items: [{ column: 'name', type: 'string', value: 'a', fn: 'MaxD' }]
    }), 'Some SQL Error Occur');


    const [SQL, PARAM] = where({
        // string not support MaxD will throw a error
        link: 'AND', items: [
            { column: 'name', type: 'string', value: 'a', fn: 'Like' },
            { column: 'profile', value: '', fn: 'IsNull' },
            {
                link: 'OR', items: [
                    { column: 'age', type: 'number', value: 14, fn: '<=' },
                    { column: 'age', type: 'number', value: 60, fn: '>=' },
                ]
            }
        ]
    });
    console.log(SQL, PARAM)


})

    ;



test('Test : buildSQL', ({ assert }) => {
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

    const sql = where(root);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    console.log(sql)
    // assert.equal(sql[1].length, 5)

    // console.log(sql[0], sql[1])
})

    ;

test('Test : Suffix Coverage', ({ assert }) => {
    try {
        isCoverOrCoverError(where);
    } catch (e) {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log(e)
    }
})
    ;

test('Test : Where', ({ assert }, txt) => {
    const condition: WhereParam = {
        link: 'AND', items: [
            {
                type: 'date',
                // field: 'sex',
                // @ts-ignore
                fn: txt,
                value: '2022-11-11 11:11:11'
            }
        ]
    }
    console.log(txt, where(condition, 1))
    // console.log(txt, getDateRange(txt as any))
})
    .with(SUFFIX as any)
    ;


