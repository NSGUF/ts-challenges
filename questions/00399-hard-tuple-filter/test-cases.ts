import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]

// type FilterOut<T extends any[], F, A extends any[] = []> = T extends [infer L, ...infer R] ? (
//   Equal<F, L> extends true ? FilterOut<R, F, A> : (
//     [F] extends [L] ? FilterOut<R, F, A> :  FilterOut<R, F, [...A, L]>
//   )
// ) : A;
// your answers
// 1. 当 与 F 全等，或者是属于 F 的子集都要过滤掉
type FilterOut<T extends any[], F, Ret extends any[] = []> = T extends [infer First, ... infer Rest] ? 
Equal<First, F> extends true ? 
FilterOut<Rest, F, Ret> : 
[First] extends [F] ? FilterOut<Rest, F, Ret> : FilterOut<Rest, F, [...Ret, First]> : Ret

// TODO