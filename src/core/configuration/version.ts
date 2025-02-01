import { VERSION_BOUNDARIES, BITS_FOR_MESSAGE_LENGTH, VERSION_SIZE_BASE, VERSION_SIZE_INCREASE, CONTENT_TABLE_PER_VERSION, BITS_FOR_MODE, BITS_FOR_TERMINATOR, LAST_VERSION } from './constants'
import { BCH_VERSION_CONTENT_BITS_AMOUNT, BCH_VERSION_GENERATOR_POLYNOMIAL, BCH_VERSION_TOTAL_LENGTH } from '../encoding/constants'
import { ERROR_CORRECTION_L, ErrorCorrection, Mode, Version } from './types'
import { ERROR_CORRECTION } from './error-correction'
import { BYTE_LENGTH } from '../shared/constants'
import { CONVERTER } from '../shared/converter'
import { reverse } from '../shared/utils/array'
import { Binary } from '../shared/types/binary'
import { BCH } from '../encoding/bch'

export class VersionUtils {
  // optimal version
  getOptimalVersionAndErrorCorrection(mode: Mode, messageLength: number, minErrorCorrection: ErrorCorrection = ERROR_CORRECTION_L) {
    const contentConfigs = this.getContentConfigTable()

    const allowedErrorCorrectionLevels = ERROR_CORRECTION.getErrorCorrectionLevelsByMin(minErrorCorrection)
    const errorCorrectionLevelsDescendingList = reverse(allowedErrorCorrectionLevels)

    const contentConfigsSortedAscendingByCapacity = contentConfigs.map(config => {
      return errorCorrectionLevelsDescendingList.map(errorCorrection => ({
        config: config[errorCorrection],
        version: config.version,
        errorCorrection,
      }))
    }).flat()

    const optimalOption = contentConfigsSortedAscendingByCapacity.find(option => {
      const reservedBits = this.getReservedBitsAmount(option.version, mode)

      const totalMessageBits = option.config.dataCodewordsAmount * BYTE_LENGTH
      const restBitsForMessage = totalMessageBits - reservedBits
      
      return restBitsForMessage >= messageLength * BYTE_LENGTH
    })

    if (!optimalOption) return null

    return ({
      version: optimalOption.version,
      errorCorrection: optimalOption.errorCorrection
    })
  }
  getMaximumMessageLength(mode: Mode): number {
    const mostCapableOption = this.getContentConfig(LAST_VERSION, ERROR_CORRECTION_L)
    const dataCodewords = mostCapableOption.dataCodewordsAmount

    const reservedBits = this.getReservedBitsAmount(LAST_VERSION, mode)
    const restBytes = Math.floor(dataCodewords - reservedBits / BYTE_LENGTH)
    
    return restBytes
  }
  getReservedBitsAmount(version: Version, mode: Mode) {
    const bitsForMessageLength = this.getBitsAmountForMessageLength(mode, version)
    const reservedBits = BITS_FOR_MODE + bitsForMessageLength + BITS_FOR_TERMINATOR
    return reservedBits
  }

  // message length
  getEncodedMessageLengthContent(mode: Mode, version: Version, length: number): Binary {
    const bitsForLength = this.getBitsAmountForMessageLength(mode, version)
    return CONVERTER.convertDecimalToBinary(length, bitsForLength)
  }
  getBitsAmountForMessageLength(mode: Mode, version: Version): number {
    const versionGroupIndex = VERSION_BOUNDARIES.findIndex(versionGroupStart => version >= versionGroupStart) || 0
    return BITS_FOR_MESSAGE_LENGTH[mode][versionGroupIndex]
  }

  // QR Code dimension
  getQRCodeModulesAmountByVersion(version: Version): number {
    return this.getQRCodeWidthByVersion(version) ** 2
  }
  getQRCodeWidthByVersion(version: Version): number {
    return VERSION_SIZE_BASE + (version - 1) * VERSION_SIZE_INCREASE
  }

  // version encoded content
  getEncodedVersionContent(version: Version): Binary {
    const versionBits = CONVERTER.convertDecimalToBinary(version, BCH_VERSION_CONTENT_BITS_AMOUNT)
    const versionEncodingContent = BCH.encode(versionBits, BCH_VERSION_GENERATOR_POLYNOMIAL, BCH_VERSION_TOTAL_LENGTH)
    return versionEncodingContent
  }

  // content config 
  getContentConfig(version: Version, errorCorrectionLevel: ErrorCorrection) {
    const table = this.getContentConfigTable()
    return table[version][errorCorrectionLevel]
  }
  getContentConfigTable() {
    return CONTENT_TABLE_PER_VERSION
  }
}

export const VERSION = new VersionUtils()
