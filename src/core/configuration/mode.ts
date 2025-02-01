import { MODE_NUMBER_REPRESENTATION, BITS_FOR_MODE, MODE_LIST, MODE_REGEX_LIST } from './constants'
import { CONVERTER } from '../shared/converter'
import { Binary } from '../shared/types/binary'
import { Mode } from './types'

export class ModeUtils {
  getEncodedModeContent(mode: Mode): Binary {
    const modeNumber = MODE_NUMBER_REPRESENTATION[mode]
    const modeBinary = CONVERTER.convertDecimalToBinary(modeNumber, BITS_FOR_MODE)
    return modeBinary
  }

  getModeRegex(mode: Mode) {
    const modeIndex = MODE_LIST.findIndex(modeOption => modeOption === mode)
    return MODE_REGEX_LIST[modeIndex]
  }
}

export const MODE = new ModeUtils()
