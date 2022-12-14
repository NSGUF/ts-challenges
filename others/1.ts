// infer
interface User {
    id: number
    name: string
    form?: string
}

type Foo = () => User
type ReturnType4<T> = T extends (...args: any[]) => infer P ? P : any;
type R5 = ReturnType4<Foo> // User

// 实现元组转联合类型 [string, number] -> string | number :
type ElementOf<T> = T extends Array<infer E> ? E : never;
type TTuple = [string, number];
type ToUnion = ElementOf<TTuple>; // string | number

class TestClass {
    constructor(public name: string, public age: number) {
    }
}

type ConstructorParameters5<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any
    ? P
    : never;
type R4 = ConstructorParameters5<typeof TestClass> // [string, number]

//new (...args: any[]) => any指构造函数, 因为构造函数是可以被实例化的.
//infer P代表待推断的构造函数参数, 如果接受的类型T是一个构造函数, 那么返回构造函数的参数类型P, 否则什么也不返回, 即never类型


// 1 将字符串的首字母进行大写转换，实例如下：
type Index<T> = T extends `${ infer L }${ infer P }` ? `${ Uppercase<L> }${ P }` : never
type a = Index<'hander'>;

// 2 获取字符串的第一个字符， 意思其实很简单。这里就不过多举例了，直接上代码
type FirstChar<T> = T extends `${ infer L }${ infer P }` ? L : never
type a1 = FirstChar<'123'>

// 3 获取最后一个字符串，其实题2有点类似，但是相对来说比较复杂，这里会做详细描述
type LastChar<T, pre = never> = T extends `${ infer L }${ infer P }` ? LastChar<P, L> : pre;
type a2 = LastChar<'123'>

// 4 字符串转换为元组类型
type StringToTuple<T, S extends any[] = []> = T extends `${ infer L }${ infer R }` ? StringToTuple<R, [...S, L]> : S;
type a3 = StringToTuple<'123'>

// 5 将字符串类型的数组转换为字符串字面量类型
type TupleToString<T, S extends string = ''> = T extends [infer L, ...infer R] ? (L extends string ? TupleToString<R, `${ S }${ L }`> : never) : S;
type a4 = TupleToString<['1', '2', '3']>

// 6 复制字符T为字符串类型，长度为C
type RepeatString<T extends string, K, A extends any[] = [], S extends string = ''> = K extends A['length'] ? S : RepeatString<T, K, [...A, T], `${ T }${ S }`>
type a5 = RepeatString<'123', 3>


// 7 将字符串字面量类型按照指定字符，分割为元组。无法分割则返回原字符串字面量//
type SplitString<T extends string = '', K extends string = '', A extends any[] = []> = T extends `${ infer L }${ K }${ infer R }` ? SplitString<R, K, [...A, L]> : [...A, T];

type A1 = SplitString<'handle-open-flag', '-'>        // ["handle", "open", "flag"]
type A2 = SplitString<'open-flag', '-'>               // ["open", "flag"]
type A3 = SplitString<'handle.open.flag', '.'>        // ["handle", "open", "flag"]
type A4 = SplitString<'open.flag', '.'>               // ["open", "flag"]
type A5 = SplitString<'open.flag', '-'>               // ["open.flag"]

// 8 计算字符串字面量类型的长度
type LengthOfString<T, A extends string[] = []> = T extends `${infer L}${infer R}` ? LengthOfString<R,  [...A, L]> : A["length"]
type a6 = LengthOfString<'1123'>
let a:a6 = 4

// 9 驼峰命名转横杠命名
type KebabCase<T, S extends string = ''> = T extends `${infer L}${infer R}` ? KebabCase<R, `${S}${(Uppercase<L> extends L ? (S extends '' ? `${Lowercase<L>}` : `-${Lowercase<L>}`) : `${L}`)}`> : S;
type a9 = KebabCase<'TestUserName'>

// 10 横杠命名转化为驼峰命名
type FirstUppercase<T> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : never;
type a10 = FirstUppercase<'abc'>
type CamelCase<T, S extends string = ''> = T extends `${infer L}-${infer R}` ? CamelCase<R, `${S}${FirstUppercase<L>}`> : `${S}${FirstUppercase<T>}`;
type a1010 = CamelCase<'abc-cde-dfa-asf'>

// 11
const i18n = createI18n({
    home: {
        topBar: {
            title: '顶部标题',
            welcome: '欢迎登录'
        },
        bottomBar: {
            notes: 'XXX备案，归XXX所有',
        },
    },
    login: {
        username: '用户名',
        password: '密码'
    }
})

// 上述对象转换出来的类型是：
// home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password

i18n('home.topBar.title')           // √
i18n('home.topBar.welcome')         // √
i18n('home.bottomBar.notes')        // √
i18n('home.bottomBar.notes1')        // ×
type trimFirstCode<T> = T extends `.${infer R}` ? R : T

type ObjectAccessPaths<T, R extends string = '', K = keyof T> = K extends keyof T ? (
    K extends string ? (
        T[K] extends Record<string, any> ? ObjectAccessPaths<T[K], trimFirstCode<`${R}.${K}`>> : trimFirstCode<`${R}.${K}`>
        ) : never
    ) : never

// 完成 createI18n 函数中的 ObjectAccessPaths<Schema>，限制函数i18n的参数为合法的属性访问字符串
function createI18n<Schema>(schema: Schema): ((path: ObjectAccessPaths<Schema>) => string) {return [{schema}] as any}

// i18n函数的参数类型为：home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
const i18n = createI18n({
    home: {
        topBar: {
            title: '顶部标题',
            welcome: '欢迎登录'
        },
        bottomBar: {
            notes: 'XXX备案，归XXX所有',
        },
    },
    login: {
        username: '用户名',
        password: '密码'
    }
})

i18n('home.topBar.title')           // correct
i18n('home.topBar.welcome')         // correct
i18n('home.bottomBar.notes')        // correct
type test1 = ObjectAccessPaths<{a:{b: {c: 1, d:2}}}>
type ObjectAccessPaths1<T, S extends string = '', K = keyof T> = K extends keyof T ?
    (K extends string ? (T[K] extends Record<string, any> ? ObjectAccessPaths1<T[K], trimFirstCode<`${S}.${K}`>> : trimFirstCode<`${S}.${K}`>) : never)
    :
    never
type test2 = ObjectAccessPaths1<{a:{b: {c: 1, d:2}}}>
type test3 = ObjectAccessPaths1<{a:{b: {c: 1, d:2}}}>
let a123123:test1 = 'a.b.c'

// 12 组件的key值以及函数变化
// 例如：('Handle-open': (flag: boolean) => true) => onHandleOpen: (flag: boolean) => void
type Source = {
    'Handle-open': (flag: boolean) => true,
    'preview-Item': (data: {item: any, index: number}) => true,
    'close-item': (data: {item: any, index: number}) => true
}

type ComponentEmitsType<T> = {
    [P in keyof T as `on${P extends string ? CamelCase<P> : ''}`]?: T extends ((...args: infer R) => any) ? ((...args: R) => void) : T[P]
}

type Result = ComponentEmitsType<Source>
