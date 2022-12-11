import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
]
type GetOptional<T> = {
  [P in keyof T as { [K in P]?: T[K] } extends { [K in P]: T[K] } ? P : never]: T[P]
}
