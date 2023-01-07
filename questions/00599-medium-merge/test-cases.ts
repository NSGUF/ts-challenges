import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]
type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S ? S[P] : (P extends keyof F ? F[P] : never)
}



type test =  Merge<Foo, Bar>;