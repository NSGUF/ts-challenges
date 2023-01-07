import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]
// type StringToUnion<T extends string, A = never> = T extends `${infer L}${infer R}` ? (
//   StringToUnion<R, A | L>
// ) : A;
type StringToUnion<T extends string> = T extends `${infer L}${infer R}` ? L | StringToUnion<R> : never;