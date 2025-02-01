import { BITS_FOR_ERROR_CORRECTION_LEVEL, CONTENT_TABLE_PER_VERSION, ERROR_CORRECTION_ASCENDING_LIST, ERROR_CORRECTION_NUMBER_REPRESENTATION } from './constants'
import { ErrorCorrection, Version } from './types'
import { CONVERTER } from '../shared/converter'
import { Binary } from '../shared/types/binary'

export class ErrorCorrectionUtils {
  getEncodedErrorCorrectionLevelContent(errorCorrection: ErrorCorrection): Binary {
    const errorCorrectionNumber = ERROR_CORRECTION_NUMBER_REPRESENTATION[errorCorrection]
    const errorCorrectionBinary = CONVERTER.convertDecimalToBinary(errorCorrectionNumber, BITS_FOR_ERROR_CORRECTION_LEVEL)
    return errorCorrectionBinary
  }

  getErrorCorrectionCodewordsPerBlock(version: Version, errorCorrectionLevel: ErrorCorrection) {
    return CONTENT_TABLE_PER_VERSION[version][errorCorrectionLevel].errorCorrectionPerBlock
  }

  getErrorCorrectionLevelsByMin(minErrorCorrection: ErrorCorrection) {
    const minErrorCorrectionIndex = ERROR_CORRECTION_ASCENDING_LIST.findIndex(errorCorrection => errorCorrection === minErrorCorrection)
    return ERROR_CORRECTION_ASCENDING_LIST.slice(minErrorCorrectionIndex)
  }
}

export const ERROR_CORRECTION = new ErrorCorrectionUtils()
