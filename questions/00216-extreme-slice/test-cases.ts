import type { Equal, Expect } from '@type-challenges/utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]

type Slice<Arr, Start extends number = 0, End extends number = -1, S extends any[] = [], Result extends any[] = [], isStart extends boolean = false> = Start extends End ? [] : (
  Arr extends [infer L, ...infer R] ? (
    S['length'] extends Start ? Slice<R, Start, End, [...S, 1], [...Result, L], true> : (
      isStart extends true ? (
        S['length'] extends End ? Result : Slice<R, Start, End, [...S, 1], [...Result, L], true>
      ) : Slice<R, Start, End, [...S, 1], [], true>
    )
  ) : Result
);
type test = Slice<Arr, 0, 0>;

// TODO