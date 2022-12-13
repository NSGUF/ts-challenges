import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \n\t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

type TrimLeft<S extends string> = S extends ` ${infer R}` ? TrimLeft<R> : (
  S extends `\n\t${infer R}` ? TrimLeft<R> : S
);

type TrimRight<S extends string> = S extends `${infer R} ` ? TrimRight<R> : (
  S extends `${infer R}\n\t` ? TrimRight<R> : S
);
type Trim<S extends string> = TrimLeft<TrimRight<S>>
