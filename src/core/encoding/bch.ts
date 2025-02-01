import { POLYNOMIALS_GF_2 } from './polynomials'
import { CONVERTER } from '../shared/converter'
import { Binary } from '../shared/types/binary'

export class Bch {
  encode(value: Binary, generator: number, totalLength: number) {
    const paddedValue = value.padEnd(totalLength, '0')

    const valuePolynomial = CONVERTER.convertBinaryToPolynomial(paddedValue)

    const bchGeneratorPolynomialBinary = CONVERTER.convertDecimalToBinary(generator)
    const bchGeneratorPolynomial = CONVERTER.convertBinaryToPolynomial(bchGeneratorPolynomialBinary)

    const remainder = POLYNOMIALS_GF_2.getDivisionRemainder(valuePolynomial, bchGeneratorPolynomial)
    const remainderBinary = CONVERTER.convertBinaryPolynomialToBinary(remainder)

    return `${value}${remainderBinary}`
  }
}

export const BCH = new Bch()
