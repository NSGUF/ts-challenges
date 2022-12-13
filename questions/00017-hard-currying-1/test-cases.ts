import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]

type Curry<P extends any[], R> = P extends [] ? R : (
    P extends [infer L, ...infer RR] ? (arg: L) => Curry<RR, R> : R
);

declare function Currying<F>(fn: F): F extends (...args: infer P) => infer R ? (
    P extends [] ? () => R : Curry<P, R>
) : never;
