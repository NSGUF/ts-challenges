import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]
type TupleToNestedObject<T extends any[], U> = T extends [infer L, ...infer R] ? (L extends string ? {
  [P in L] : TupleToNestedObject<R, U>
} : never) : U;

type test = TupleToNestedObject<['a', 'b'], string>
