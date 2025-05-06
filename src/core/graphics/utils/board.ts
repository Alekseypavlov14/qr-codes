import { getMatrixOf, insert } from '../../shared/utils/matrix'
import { QRCodeContent } from '../../shared/types/content'
import { Board } from '../types/board.interface'
import { WHITE } from '../../shared/constants'

export class BoardUtils {
  getContentMatrix(board: Board): QRCodeContent {
    const boardMatrix = getMatrixOf(board.dimension, board.dimension, WHITE)

    board.figures.forEach(figure => {
      insert(boardMatrix, figure.position, figure.content)
    })

    return boardMatrix
  }
}

export const BOARD = new BoardUtils()
