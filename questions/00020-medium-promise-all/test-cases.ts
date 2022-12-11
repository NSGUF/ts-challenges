import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
]

type GetPromise<T> = T extends Promise<infer A> ? GetPromise<A> : T

declare function PromiseAll<T extends readonly unknown[]>(values: readonly [...T]): Promise<{
  [K in keyof T]: GetPromise<T[K]>;
}>
type test = GetPromise<Promise.resolve<3>>;
// TODO
