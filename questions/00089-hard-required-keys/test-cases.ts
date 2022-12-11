import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<RequiredKeys<{}>, never>>,
]
type RequiredKeys<T> = {
  [P in keyof T as Partial<Pick<T, P>> extends Pick<T, P> ? never : P]: T[P]
}

type test = RequiredKeys<{ a: number; b?: string }>;
