import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
]

type Includes<T, LL> = LL extends `${infer R}${infer L}` ? Equal<R, T> extends true ? true : Includes<T, L> : false

type FirstUniqueCharIndex<T extends string, S extends any[] = []>= T extends `${infer R}${infer L}` ? (
    Includes<R, L> extends true ? FirstUniqueCharIndex<any>
) : -1;

// TODO
