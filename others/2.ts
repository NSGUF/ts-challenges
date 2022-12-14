type MapType<T> = { a: T };
type MapTypeByConditionalType<T> = T extends any ? { a: T } : never;
type TT = MapType<string | number>; // { a: string | number; }
type TT1 = MapTypeByConditionalType<string | number>; // { a: string } | { a: number }
type filterNumVal<T extends Object> = {
    [Key in keyof T]: T[Key] extends Number ? T[Key] : never
}[keyof T]

type filterNumVal2<T extends Record<any, any>, K = keyof T> = (K extends string ? T[K] extends number ? (T[K]) : never : never)

type getNumType = filterNumVal<{ island: 1, key2: 666, key3:'key3' }> // type getNumType = 1 | 666
type getNumTyp2e = filterNumVal2<{ island: 1, key2: 666, key3:'key3' }> // type getNumType = 1 | 666


// https://segmentfault.com/a/1190000042489026?utm_source=sf-similar-article
