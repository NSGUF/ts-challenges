import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]

type Includes<V extends any, A extends any[]> = A extends [infer L, ...infer R] ? Equal<L, V> extends true ? true : Includes<V, R> : false;
type Unique<T extends any[] = [], U extends any[] = []> = T extends [infer L, ...infer R] ? (
    Includes<L, R> extends  true ? Unique<R, U> : [...Unique<R>, L]
) : [];
type test = Unique<[1, 1, 2, 2, 3, 3]>;
// type InArray<L, R extends any[]> = R extends [infer F, ...infer N] ? Equal<L, F> extends true ? true : InArray<L, N>  : false
// type Unique<T extends any[]> = T extends [...infer F, infer L] ? InArray<L, F> extends true ? Unique<F> : [...Unique<F>, L] : []
type test1 = Includes<1, [1,2,31]>

// TODO
