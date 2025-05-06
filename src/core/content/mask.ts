import { clone, forEach, replace } from '../shared/utils/matrix'
import { MASK_PATTERN_CALLBACKS } from '../configuration/constants'
import { QRCodeContent } from '../shared/types/content'
import { CONTENT_PATH } from './path'
import { getMinIndex } from '../shared/utils/array'
import { inverse } from '../shared/utils/modules'
import { PENALTY } from './penalty'
import { Board } from '../graphics/types/board.interface'
import { Mask } from '../configuration/types'
import { MASK } from '../configuration/mask'
import { PATH } from '../graphics/utils/path'

export class MaskPattern {
  getOptimalMask(board: Board, boardMatrix: QRCodeContent): Mask {
    const maskPenalties = new Array<number>(MASK_PATTERN_CALLBACKS.length).fill(0)

    maskPenalties.forEach((_, index) => {
      const matrixWithMask = this.applyMask(board, boardMatrix, index)
      const penalty = PENALTY.compute(matrixWithMask)

      maskPenalties[index] = penalty
    })

    const optimalMask = getMinIndex(maskPenalties)

    return optimalMask
  }

  applyMask(board: Board, boardMatrix: QRCodeContent, mask: Mask): QRCodeContent {
    const clonedMatrix = clone(boardMatrix)
    const contentPath = CONTENT_PATH.getPath(board)

    const maskCallback = MASK.getMaskCallback(mask)

    forEach(clonedMatrix, (value, coordinates) => {
      const isContentCoordinate = PATH.includes(contentPath, coordinates)
      if (!isContentCoordinate) return

      const isMatched = maskCallback(coordinates)
      if (!isMatched) return

      replace(clonedMatrix, coordinates.y, coordinates.x, inverse(value))
    })

    return clonedMatrix
  }
}

export const MASK_PATTERN = new MaskPattern()
