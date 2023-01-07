import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,
]
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Comparator<A extends number, B extends number> = A extends B ? Comparison.Equal : Iterate<A, B, []>;

type Iterate<A extends number, B extends number, Tuple extends any[]> =
  Tuple['length'] extends A ? ( // A is the smallest magnitude number and is positive
    IsNegative<B> extends true ? Comparison.Greater : Comparison.Lower
  ) : Tuple['length'] extends B ? ( // B is the smallest magnitude number and is positive
    IsNegative<A> extends true ? Comparison.Lower : Comparison.Greater
  ) : `-${Tuple['length']}` extends `${A}` ? ( // B is smallest magnitude number and is negative
    IsNegative<B> extends true ? Comparison.Greater : Comparison.Lower
  ) : `-${Tuple['length']}` extends `${B}` ? ( // A is smallest magnitude number and is negative
    IsNegative<A> extends true ? Comparison.Lower : Comparison.Greater
  ) : Iterate<A, B, [null, ...Tuple]>;

type IsNegative<B extends number> = `${B}` extends `-${infer _}` ? true : false;

// TODO
