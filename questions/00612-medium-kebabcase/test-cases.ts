import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]
type KebabCase<S, A extends string = ''> = S extends `${infer L}${infer R}` ? (
  Lowercase<L> extends L ? KebabCase<R, `${A}${L}`> : (
    A extends '' ? KebabCase<R, `${Lowercase<L>}`> : KebabCase<R, `${A}-${Lowercase<L>}`>
  ) 
) : A;

type test = KebabCase<'foo-bar'>;