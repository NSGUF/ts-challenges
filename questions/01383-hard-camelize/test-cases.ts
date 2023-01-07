import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]






type FirstUpper<T> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T;
type CamelizeKey<T extends string, S extends string = ''> = T extends `${infer L}_${infer R}` ? (
  CamelizeKey<FirstUpper<R>, `${S}${L}`>
) : `${S}${T}`;
type Camelize<T> = {
  [P in keyof T as CamelizeKey<P>]: keyof T extends never ? T[P] : Camelize<T[P]>
}

type test = Camelize<{
  some_prop: string
  prop: { another_prop: string }
  array: [
    { snake_case: string },
    { another_element: { yet_another_prop: string } },
    { yet_another_element: string },
  ]
}>