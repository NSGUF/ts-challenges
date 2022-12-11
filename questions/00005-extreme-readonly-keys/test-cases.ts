import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
    Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
    readonly title: string
    description: string
    completed: boolean
}

interface Todo2 {
    readonly title: string
    readonly description: string
    completed?: boolean
}


// type GetReadonlyKeys<T> = keyof {
//   [P in keyof T as Equal<Pick<T, P>, Readonly<Pick<T,P>>> extends false ? never : P]: T[P]
// }
//
type test = GetReadonlyKeys<Todo1>
// type GetReadonlyKeys<T> = keyof {
//     [k in keyof T as Equal<Pick<T, k>, Readonly<Pick<T, k>>> extends true ? k : never]: T[k]
// };
// type GetReadonlyKeys<T> = { [P in keyof T]: Readonly<Pick<T, P>> extends Pick<T, P> ? T[P] : never }[keyof T]
// type GetReadonlyKeys<T> = { [P in keyof Required<T>]: Equal<{ [k in P]: T[k] }, { -readonly [R in P]: T[R] }> extends true ? never : P }[keyof T]
// 你的答案
/**
 * 思路是将T的只读键key取出来，拿到一个{key:key}的类型（其中非只读属性的值均为never）并取value（会自动过滤掉never类型的值只剩下只读key）
 * Equal取原类型和已将原类型只读属性全去掉的类型（{ -readonly [R in P]: T[R] }）对比结果为真的赋值never，为假说明key类型不一样，赋值key（供最后一步取key）
 * [ P in keyof Required<T> ] 生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为必选项，保证能取到所有key
 * 最后一步keyof Result依然会获得所有key，即使有些key对应值为never，故而用Result{keyof T}取值过滤掉never
 **/
type GetReadonlyKeys<T> = { [P in keyof T]: Equal<Pick<T, P>, { -readonly [R in P]: T[R]}> extends true ? never : P }[keyof T]
// type test<T> = { -readonly [R in P]: T[R] }
