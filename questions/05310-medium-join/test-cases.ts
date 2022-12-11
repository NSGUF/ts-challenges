import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
]

type Join<T extends any[], U extends string | number, S extends string = ''> = T extends [infer L, ...infer R] ? Join<R, U, S extends '' ? L : `${S}${U}${L}`> : S;
// type Join<T, U extends string | number> = T extends [infer F extends string, ...infer R] ? `${F}${R extends [] ? `` : U}${Join<R, U>}` : ``
// type _Join<T, U extends string, Acc extends string> = T extends [...infer Head, infer Tail extends string]
//     ? Head extends []
//     ? `${Tail}${Acc}`
//     : _Join<Head, U, `${U}${Tail}${Acc}`>
// : never
//
// type Join<T extends readonly string[], U extends string> = _Join<T, U, ''>
