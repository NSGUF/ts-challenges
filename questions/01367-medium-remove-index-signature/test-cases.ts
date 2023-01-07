import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]

// your answers
// the index signature could be string/number/symbol
// if the key type match any of them, then it is index signature
type RemoveIndexSignature<T> = {
  // must check string/number/symbol one by one, because the index type could use only part of PropertyKey
  [K in keyof T as string extends K ? never : number extends K ? never: symbol extends K ? never: K]: T[K]
}
// TODO