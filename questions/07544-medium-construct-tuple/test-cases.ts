import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<3>['length'], 3>>,
  Expect<Equal<ConstructTuple<3>['length'], 3>>,
  Expect<Equal<ConstructTuple<9>['length'], 9>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>,
]

type ConstructTuple<L extends number, S extends unknown[] = []> = S['length'] extends L ? S : ConstructTuple<L,  [...S, unknown]>;
