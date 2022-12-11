import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]

type errors = [
  Reverse<'string'>,
  Reverse<{ key: 'value' }>,
]
type Reverse<T extends any[], A extends any[] = []> = T extends [...infer L, infer R] ? Reverse<L,  [...A, R]> : [...T, ...A];
type test = Reverse<['a', 'test','b', 'c']>;
let a: test = ['123']
