import { BINARY_NUMBERS_RADIX, BYTE_LENGTH } from './constants'
import { Polynomial } from './types/polynomial'
import { Binary } from './types/binary'

export class Converter {
  convertMessageToBinary(message: string): Binary[] {
    return this.convertCharacterCodesToBinary(this.convertMessageToCharacterCodes(message))
  }

  convertDecimalToBinary(number: number, length: number = BYTE_LENGTH): Binary {
    return number.toString(BINARY_NUMBERS_RADIX).padStart(length, '0')
  }

  convertBinaryToDecimal(binary: Binary): number {
    return parseInt(binary, BINARY_NUMBERS_RADIX)
  }

  convertMessageToCharacterCodes(message: string): number[] {
    return Array.from(message).map(character => character.charCodeAt(0))
  }

  convertCharacterCodesToBinary(characterCodes: number[]): Binary[] {
    return characterCodes.map(code => {
      return code.toString(BINARY_NUMBERS_RADIX).padStart(BYTE_LENGTH, '0')
    })
  }

  convertBinaryStringToNumber(binary: Binary) {
    return parseInt(binary, BINARY_NUMBERS_RADIX)
  }

  convertBinaryToPolynomial(binary: Binary): Polynomial {
    return binary.split('').map(Number)
  }

  convertBinaryPolynomialToBinary(polynomial: Polynomial): Binary {
    return polynomial.join('')
  }

  convertBinaryToArray(binary: Binary): number[] {
    return Array.from(binary).map(Number)
  }

  convertArrayToBinary(array: number[]): Binary {
    return array.join('')
  }

  convertBinaryArrayToBitStream(binary: Binary[]): Binary {
    return binary.join('')
  }
}

export const CONVERTER = new Converter()
