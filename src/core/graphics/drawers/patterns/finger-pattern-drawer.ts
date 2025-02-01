import { FINGER_ISOLATION_SIZE, FINGER_PATTERN_SIZE } from '../../constants'
import { PatternDrawer } from './pattern-drawer.interface'
import { BLACK, WHITE } from '../../../shared/constants'
import { getMatrixOf } from '../../../shared/utils/matrix'
import { getPoint } from '../../../shared/utils/coordinates'
import { Version } from '../../../configuration/types'
import { Pattern } from '../../types/pattern.interface'
import { VERSION } from '../../../configuration/version'
import { getSize } from '../../../shared/utils/sizes'
import { PATTERN } from '../../utils/pattern'
import { Figure } from '../../types/figure.interface'

export class FingerPatternDrawer implements PatternDrawer { 
  draw(version: Version): Figure[] {
    const size = VERSION.getQRCodeWidthByVersion(version)
    const fingerHighlightSize = FINGER_PATTERN_SIZE + FINGER_ISOLATION_SIZE

    const fingerPattern = this.getFinderPattern()
    const fingerHighlightPattern = this.getFingerHighlightPattern()

    const topLeftFingerFigure = PATTERN.applyWithPosition(getPoint(0, 0), fingerPattern)
    const topRightFingerFigure = PATTERN.applyWithPosition(getPoint(0, size - FINGER_PATTERN_SIZE), fingerPattern)
    const bottomLeftFingerFigure = PATTERN.applyWithPosition(getPoint(size - FINGER_PATTERN_SIZE, 0), fingerPattern)

    const topLeftFingerHighlightFigure = PATTERN.applyWithPosition(getPoint(0, 0), fingerHighlightPattern)
    const topRightFingerHighlightFigure = PATTERN.applyWithPosition(getPoint(0, size - fingerHighlightSize), fingerHighlightPattern)
    const bottomLeftFingerHighlightFigure = PATTERN.applyWithPosition(getPoint(size - fingerHighlightSize, 0), fingerHighlightPattern)

    return [
      topLeftFingerHighlightFigure,
      topRightFingerHighlightFigure,
      bottomLeftFingerHighlightFigure,

      topLeftFingerFigure,
      topRightFingerFigure,
      bottomLeftFingerFigure,
    ]
  }

  private getFinderPattern(): Pattern {
    return {
      size: getSize(FINGER_PATTERN_SIZE, FINGER_PATTERN_SIZE),
      content: [
        [ BLACK, BLACK, BLACK, BLACK, BLACK, BLACK, BLACK ],
        [ BLACK, WHITE, WHITE, WHITE, WHITE, WHITE, BLACK ],
        [ BLACK, WHITE, BLACK, BLACK, BLACK, WHITE, BLACK ],
        [ BLACK, WHITE, BLACK, BLACK, BLACK, WHITE, BLACK ],
        [ BLACK, WHITE, BLACK, BLACK, BLACK, WHITE, BLACK ],
        [ BLACK, WHITE, WHITE, WHITE, WHITE, WHITE, BLACK ],
        [ BLACK, BLACK, BLACK, BLACK, BLACK, BLACK, BLACK ],
      ]
    }
  } 

  private getFingerHighlightPattern(): Pattern {
    const fingerHighlightSize = FINGER_PATTERN_SIZE + FINGER_ISOLATION_SIZE

    return {
      size: getSize(fingerHighlightSize, fingerHighlightSize),
      content: getMatrixOf(fingerHighlightSize, fingerHighlightSize, WHITE)
    }
  }
}

export const FINGER_PATTERN_DRAWER = new FingerPatternDrawer()
