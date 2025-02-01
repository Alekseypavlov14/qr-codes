import { BCH_FORMATTING_GENERATOR_POLYNOMIAL, BCH_FORMATTING_TOTAL_LENGTH } from '../encoding/constants'
import { ErrorCorrection, Mask } from './types'
import { ERROR_CORRECTION } from './error-correction'
import { MASK } from './mask'
import { BCH } from '../encoding/bch'

export class FormattingInformation {
  getEncodedFormattingContent(errorCorrection: ErrorCorrection, mask: Mask) {
    const errorCorrectionBits = ERROR_CORRECTION.getEncodedErrorCorrectionLevelContent(errorCorrection)
    const maskBits = MASK.getEncodedMaskContent(mask)

    const formattingDataBinary = `${errorCorrectionBits}${maskBits}`
    const formattingEncodedContent = BCH.encode(formattingDataBinary, BCH_FORMATTING_GENERATOR_POLYNOMIAL, BCH_FORMATTING_TOTAL_LENGTH)

    return formattingEncodedContent
  }
}

export const FORMATTING_INFORMATION = new FormattingInformation()
