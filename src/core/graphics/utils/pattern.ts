import { Coordinates } from '../../shared/types/coordinates'
import { Pattern } from '../types/pattern.interface'
import { Figure } from '../types/figure.interface'
import { Matrix } from '../../shared/types/matrix'
import { Size } from '../../shared/types/size'

export class PatternUtils {
  applyWithPosition(position: Coordinates, pattern: Pattern): Figure {
    return { position, ...pattern }
  }

  create(content: Matrix<number>, size: Size): Pattern {
    return { content, size }
  }
}

export const PATTERN = new PatternUtils()
