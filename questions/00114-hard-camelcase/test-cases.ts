import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

type First<S extends string> = S extends `${infer L}${infer R}` ? (
  `${Uppercase<L>}`
) : Uppercase<S>;
type Last<S> = S extends `${infer L}${infer R}` ? R : S;
type CamelCase<S extends string> = S extends `${infer L}_${infer R}` ? (
  `${Lowercase<L>}${First<R>}${CamelCase<Last<R>>}`
) : Lowercase<S>;
type test = CamelCase<'HELLO_WORLD_WITH_TYPES'>;