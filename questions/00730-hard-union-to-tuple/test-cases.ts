import type { Equal, Expect } from '@type-challenges/utils'

type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number]

type cases = [
  Expect<Equal<UnionToTuple<'a' | 'b'>['length'], 2>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>>, 'a' | 'b'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a'>>, 'a'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>>, 'f' | 'd' | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>>, 'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'>>,
]
// TODO
type UnionToTuple<T> = any
// 参考：https://github.com/type-challenges/type-challenges/issues/10191

// 1. 将联合类型转换成对应的函数交叉类型 (arg的参数是函数，返回的类型才是交叉类型，其他的都是never)
type UnionToIntersectionFn<U> = (U extends unknown ? (arg: () => U) => void : never) extends (arg: infer I) => void ? I : never;

// 2. 获取联合类型的最后一个类型
// (() => "a") & (() => "b") & (() => "c")
// 在获取函数的返回值上，函数重载和函数交叉类型是一样的
type GetUnionLast<U> = UnionToIntersectionFn<U> extends () => infer I ? I : never;

// 3. 联合类型转换为元组
type UnionToTuple<U, Last = GetUnionLast<U>> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, Last>>, Last];