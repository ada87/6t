# OOR

[Documention](https://oor.xdnote.com/index.en/)  |  [简体中文](README_ZH.md)  | ![npm version](https://img.shields.io/npm/v/oor.svg?style=flat)

NodeJs ORM tool library , Only support `Postgresql` for now. `ElasticSearch` and `MySql` is Coming!


## Features

1. High performance 🚀。
2. Code is Type, Type is Code, Code is Schema!
3. Easy API.
4. Builtin Magic Suffix📍. Save your code lines.
5. Support PagitionQuery, MagicSuffixQuery, CoditionQuery(Very Strong).
6. Suport ignore column, logical delete, mark date.
7. Support plugin, tools (Plan)
8. Promise
9. NodeJS 14+

## Install


```bash
npm install --save oor pg                           # for PostgreSql
# OR 
# npm install --save oor pg-native                  # PostgreSql native 
# npm install --save oor mysql2                     # MySql 
# npm install --save oor @elastic/elasticsearch     # ElasticSearch 
```


## Setup

```typescript
import { setup } from 'oor';
import { Client } from 'pg';
const pg = new Client({})
setup({ provider: () => pg })
```


## Define  Mapping Object & Type & Schema

```typescript
// Line 1 : import oor
import { Table, UType, Static } from 'oor';

// Line 2 : Define 'Realtion Mapping' & 'Mapping Schema' & 'Entity Type (Line3)' together by one Funtion.
//          Schema has some usage , some lib(like fastify,ajv.) support schema。
//              https://www.npmjs.com/package/@sinclair/typebox
export const UserSchema = UType.Table({
    id: UType.Number(),
    name: UType.String({ maxLength: 32 }),
    age: UType.Integer({ minimum: 0, maximum: 128 }),
    sex: UType.Boolean(),
    profile: UType.String({ ignore: true }),
    address: UType.String({ maxLength: 128 }),
    salary: UType.Number(),
    registerDate: UType.Date({ column: 'register_date', isCreate: true }),
    lastModify: UType.Date({ column: 'last_modify', isModify: true })
});

// Line 3 : Define a Type, you can avoid if not need this type.
export type User = Static<typeof UserSchema>;

// Line 4 : Build a Table, it's ok for all
export const User = new Table('public.user', UserSchema);
```

## Usage


```typescript
// Fetch all user
const result = await User.all();
console.log(result);

// Insert
const insertResult = await User.insert({
    name: 'test',
    age: 23,
    sex: false,
    address: 'randmo',
    salary: 1221.2,
});
console.log('Insert Result', insertResult)
let userId = insertResult.id as number;


const afterInsert = await User.getById(userId);
console.log('After Insert', afterInsert)

// Update
await new Promise(r => setTimeout(r, 1200)); // wait , notice last_update value
let isUpdate = await User.update({ id: userId, age: 60, });    // change Age
console.log('Update is Success ? : ', isUpdate == 1);

const afterUpdate = await User.getById(userId);
console.log('After Update', afterUpdate)

// Delete
let isDelete = await User.deleteById(userId);
console.log('Delete is Success ? : ', isDelete == 1);

await setTimeout(r => r, 1000); // wait , notice last_update value
const afterDelete = await User.getById(userId);
console.log('After Delete', afterDelete)

// Execue custom SQL Sentence.
const result = await User.sql(`SELECT XXX 
FROM YYY 
WHERE ZZZ = $1 
ORDER BY $2 $3`,['value','id','DESC']);
console.log(result);
```

