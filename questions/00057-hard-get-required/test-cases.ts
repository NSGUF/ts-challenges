import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
    Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]
type GetRequired<T> = {
    [P in keyof T as { [K in P]?: T[K] } extends { [K in P]: T[K] } ? never : P]: T[P]
}
type test = GetRequired<{ foo: number; bar?: string }>;
let a: test = {
    foo: 0,
}
