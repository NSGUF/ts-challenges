import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]
type Fibonacci<T extends number, S extends number[] = [1], Cur extends number[] = [1], Next extends number[] = [1]> = S['length'] extends T ? Cur['length'] : Fibonacci<T,  [...S, 1], Next, [...Cur, ...Next]>;

type test = Fibonacci<3>;
let a: test = 2;
