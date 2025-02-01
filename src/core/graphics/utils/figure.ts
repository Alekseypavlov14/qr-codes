import { Coordinates } from '../../shared/types/coordinates'
import { Matrix } from './../../shared/types/matrix'
import { Figure } from '../types/figure.interface'
import { insert } from '../../shared/utils/matrix'
import { Range } from '@oleksii-pavlov/ranges'

export class FigureUtils {
  insertFigures(matrix: Matrix<number>, figures: Figure[]) {
    figures.forEach(figure => this.insertFigure(matrix, figure))
  }

  insertFigure(matrix: Matrix<number>, figure: Figure) {
    insert(matrix, figure.position, figure.content)
  }

  isPointOccupied(point: Coordinates, figure: Figure) {
    const horizontalRange = new Range({ 
      min: figure.position.x,
      max: figure.position.x + figure.size.width - 1
    })
  
    const verticalRange = new Range({
      min: figure.position.y,
      max: figure.position.y + figure.size.height - 1
    })
  
    const isPointInRanges = (
      horizontalRange.containsValue(point.x) &&
      verticalRange.containsValue(point.y)
    )
  
    return isPointInRanges
  }
}

export const FIGURE = new FigureUtils()
