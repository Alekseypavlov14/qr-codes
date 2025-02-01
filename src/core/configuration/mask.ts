import { BITS_FOR_MASK, MASK_PATTERN_CALLBACKS } from './constants'
import { Mask, MaskPatternCallback } from './types'
import { CONVERTER } from '../shared/converter'
import { Binary } from '../shared/types/binary'

export class MaskUtils {
  getEncodedMaskContent(mask: Mask): Binary {
    const maskBits = CONVERTER.convertDecimalToBinary(mask, BITS_FOR_MASK)
    return maskBits
  }

  getMaskCallback(mask: Mask): MaskPatternCallback {
    return MASK_PATTERN_CALLBACKS[mask]
  }
}

export const MASK = new MaskUtils()
