import { GALOIS_FIELD_2, GALOIS_FIELD_256, IGaloisField } from './galois-field'
import { Polynomial } from '../shared/types/polynomial'
import { clone } from '../shared/utils/array'

export class Polynomials {
  constructor(public readonly galoisField: IGaloisField) {}
  
  multiply(polynomial1: Polynomial, polynomial2: Polynomial): Polynomial {
    const result = Array(polynomial1.length + polynomial2.length - 1).fill(0)

    for (let i = 0; i < polynomial1.length; i++) {
      for (let j = 0; j < polynomial2.length; j++) {
        const coefficientsProduct = this.galoisField.multiply(polynomial1[i], polynomial2[j])
        const newCoefficientValue = this.galoisField.add(result[i + j], coefficientsProduct)

        result[i + j] = newCoefficientValue
      }
    }

    return result
  }

  getDivisionRemainder(dividend: Polynomial, divisor: Polynomial): Polynomial {
    let remainder = clone(dividend)

    for (let i = 0; i <= dividend.length - divisor.length; i++) {
      const coefficient = remainder[i]
      if (coefficient === 0) continue 

      for (let j = 0; j < divisor.length; j++) {
        const newRemainder = this.galoisField.add(remainder[i + j], this.galoisField.multiply(coefficient, divisor[j]))
        remainder[i + j] = newRemainder
      }
    }
    
    return remainder.slice(dividend.length - divisor.length + 1)
  }

  shiftLeft(polynomial: Polynomial, steps: number): Polynomial {
    const addedZeros = new Array(steps).fill(0)
    return polynomial.concat(addedZeros)
  }
}

export const POLYNOMIALS_GF_256 = new Polynomials(GALOIS_FIELD_256)
export const POLYNOMIALS_GF_2 = new Polynomials(GALOIS_FIELD_2)
