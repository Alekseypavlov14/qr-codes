import { COLUMN_WIDTH, COLUMNS_SHIFT, LEFT_COLUMN_INDEX, RESERVED_TIMING_PATTERN_VERTICAL, RIGHT_COLUMN_INDEX } from '../graphics/constants'
import { getPoint } from '../shared/utils/coordinates'
import { isEven } from '../shared/utils/mathematics'
import { FIGURE } from '../graphics/utils/figure'
import { Board } from '../graphics/types/board.interface'
import { Path } from '../shared/types/path'

export class ContentPath {
  getPath(board: Board): Path {
    const modules = this.getModulesSequence(board.dimension)

    const freeModules = modules.filter(module => {
      return !board.figures.some(figure => FIGURE.isPointOccupied(module, figure))
    })

    return freeModules
  }
  
  private getModulesSequence(boardSize: number): Path {
    const columns = this.getColumns(boardSize)
    const modulesSequence = columns.flat()

    return modulesSequence
  }

  private getColumns(boardSize: number): Path[] {
    const columnsAmount = Math.floor(boardSize / COLUMN_WIDTH)

    const columns: Path[] = new Array(columnsAmount).fill(null).map((_, columnIndex) => {
      const columnInterval = this.getColumnInterval(boardSize, columnIndex)
      const pointsAmount = boardSize * COLUMN_WIDTH
    
      const points: Path = new Array(pointsAmount).fill(null).map((_, pointIndex) => {
        const x = isEven(pointIndex) 
          ? columnInterval[RIGHT_COLUMN_INDEX] 
          : columnInterval[LEFT_COLUMN_INDEX]

        const y = isEven(columnIndex)
          ? Math.abs(Math.ceil(boardSize - 1 - pointIndex / COLUMN_WIDTH))
          : Math.abs(Math.floor(pointIndex / COLUMN_WIDTH))

        return getPoint(x, y)
      })

      return points
    })
    
    return columns
  }
  private getColumnInterval(boardSize: number, columnIndex: number): [ number, number ] {
    const leftColumnIndex = boardSize - (columnIndex + 1) * COLUMN_WIDTH
    const rightColumnIndex = boardSize - columnIndex * COLUMN_WIDTH - 1

    if (leftColumnIndex <= RESERVED_TIMING_PATTERN_VERTICAL) {
      const shiftedLeftColumnIndex = leftColumnIndex - COLUMNS_SHIFT
      const shiftedRightColumnIndex = rightColumnIndex - COLUMNS_SHIFT

      return [
        shiftedLeftColumnIndex,
        shiftedRightColumnIndex
      ]
    }

    return [
      leftColumnIndex,
      rightColumnIndex
    ]
  }
}

export const CONTENT_PATH = new ContentPath()
