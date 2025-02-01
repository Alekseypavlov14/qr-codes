import { GALOIS_FIELD_256_SIZE, GALOIS_FIELD_256_SHIFT, GALOIS_FIELD_ALPHA } from './constants'

export interface IGaloisField {
  add(a: number, b: number): number
  multiply(a: number, b: number): number
}

class GaloisField256 implements IGaloisField {
  public EXPONENTS: Uint8Array
  public LOGARITHMS: Uint8Array

  constructor() {
    this.EXPONENTS = new Uint8Array(GALOIS_FIELD_256_SIZE);
    this.LOGARITHMS = new Uint8Array(GALOIS_FIELD_256_SIZE);

    // initialize table
    (() => {
      let x = 1

      for (let i = 0; i < GALOIS_FIELD_256_SIZE - 1; i++) {
        this.EXPONENTS[i] = x
        this.LOGARITHMS[x] = i

        x *= GALOIS_FIELD_ALPHA

        if (x >= GALOIS_FIELD_256_SIZE) {
          x ^= GALOIS_FIELD_256_SHIFT
        }
      }
    })();
  }

  add(a: number, b: number) {
    return a ^ b
  }

  multiply(a: number, b: number) {
    if (!a || !b) return 0

    const GALOIS_FIELD_256_REDUCER = GALOIS_FIELD_256_SIZE - 1

    return this.EXPONENTS[(this.LOGARITHMS[a] + this.LOGARITHMS[b]) % GALOIS_FIELD_256_REDUCER]
  }
}

class GaloisField2 implements IGaloisField {
  add(a: number, b: number) {
    return a ^ b
  }

  multiply(a: number, b: number) {
    return a & b
  }
}

export const GALOIS_FIELD_256 = new GaloisField256()
export const GALOIS_FIELD_2 = new GaloisField2()
