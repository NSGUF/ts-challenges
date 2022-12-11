import type { Equal, Expect } from '@type-challenges/utils'

SimpleVue({
  data() {
    this.firstname
    this.getRandom()
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})

declare function SimpleVue<
  D extends Record<string, unknown>,
  C extends Record<string, unknown>,
  M extends Record<string, unknown>
>(options: {
  data: (this: D | C | M) => D
  computed: { [K in keyof C]: (this: D, ...args: unknown[]) => C[K] }
  methods: {
    [K in keyof M]: (
      this: D & C & { [K in keyof M]: (...args: unknown[]) => M[K] }
    ) => M[K]
  }
}): any
// TODO
