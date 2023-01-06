import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

type Falsy = false | 0 | '' | null | undefined

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>
]
type Filter<T, S, A extends any[] = []> = T extends [infer L, ...infer R] ? (
  L extends S ? [A['length'], ...Filter<R, S, [...A, 1]>] : Filter<R, S, [...A, 1]>
) : [];

type test = Filter<[0, 1, 2], 0 | 1>;