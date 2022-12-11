import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]
type FlattenDepth<T extends any[] = []> = T extends [infer L, ...infer R] ? (L extends any[] ? [...L, ...FlattenDepth<R>] : [L, ...FlattenDepth<R>]) : FlattenDepth<T[0]>
type test = FlattenDepth<[]>;
// type FlattenOnce<T extends any[]> = T extends [infer F, ...infer R]? [...F extends [...infer K]? K : [F], ...FlattenOnce<R> ] : T
// type FlattenDepth<T, Times extends number=1, P extends any[] = []> = T extends any[]? P extends {length: Times} ? T : T extends FlattenOnce<T>? T: FlattenDepth<FlattenOnce<T>,Times,[...P,any] > : never

//TODO
