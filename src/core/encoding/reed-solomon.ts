import { POLYNOMIALS_GF_256 } from './polynomials'
import { GALOIS_FIELD_256 } from './galois-field'
import { Polynomial } from '../shared/types/polynomial'

export class ReedSolomon {
  getErrorCorrectionPolynomial(dataPolynomial: Polynomial, errorCorrectionCodewordsAmount: number): Polynomial {
    const generatorPolynomial = this.getGeneratorPolynomial(errorCorrectionCodewordsAmount)
    const errorCorrectionPolynomial = POLYNOMIALS_GF_256.getDivisionRemainder(dataPolynomial, generatorPolynomial)

    return errorCorrectionPolynomial
  }

  getGeneratorPolynomial(errorCorrectionCodewordsAmount: number) {
    let generator = [1]

    for (let i = 0; i < errorCorrectionCodewordsAmount; i++) {
      const root = GALOIS_FIELD_256.EXPONENTS[i]
      const term = [1, root]

      generator = POLYNOMIALS_GF_256.multiply(generator, term)
    }

    return generator
  }
}

export const REED_SOLOMON = new ReedSolomon()
