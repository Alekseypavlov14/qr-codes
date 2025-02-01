import { TIMING_PATTERN_POSITION_INDEX, TIMING_PATTERN_WIDTH } from '../../constants'
import { PatternDrawer } from './pattern-drawer.interface'
import { BLACK, WHITE } from '../../../shared/constants'
import { transpose } from '../../../shared/utils/matrix'
import { getPoint } from '../../../shared/utils/coordinates'
import { VERSION } from '../../../configuration/version'
import { Version } from '../../../configuration/types'
import { Pattern } from '../../types/pattern.interface'
import { getSize } from '../../../shared/utils/sizes'
import { PATTERN } from '../../utils/pattern'
import { Matrix } from '../../../shared/types/matrix'
import { isEven } from '../../../shared/utils/mathematics'
import { Figure } from '../../types/figure.interface'

export class TimingPatternDrawer implements PatternDrawer {
  draw(version: Version): Figure[] {
    const size = VERSION.getQRCodeWidthByVersion(version)

    const horizontalLinePattern = this.getHorizontalLinePattern(size)
    const verticalLinePattern = this.getVerticalLinePattern(size)

    const horizontalTimingFigure = PATTERN.applyWithPosition(getPoint(0, TIMING_PATTERN_POSITION_INDEX), horizontalLinePattern)
    const verticalTimingFigure = PATTERN.applyWithPosition(getPoint(TIMING_PATTERN_POSITION_INDEX, 0), verticalLinePattern)

    return [
      horizontalTimingFigure,
      verticalTimingFigure
    ]
  }

  private getHorizontalLinePattern(length: number): Pattern {
    const lineContent = this.getHorizontalLineByLength(length)

    return {
      size: getSize(length, TIMING_PATTERN_WIDTH),
      content: lineContent
    }
  }
  private getVerticalLinePattern(length: number): Pattern {
    const lineContent = this.getVerticalLineByLength(length)

    return {
      size: getSize(TIMING_PATTERN_WIDTH, length),
      content: lineContent
    }
  }

  private getHorizontalLineByLength(length: number): Matrix<number> {
    return this.getOscillatoryLineByLength(length)
  }
  private getVerticalLineByLength(length: number): Matrix<number> {
    return transpose(this.getOscillatoryLineByLength(length))
  }

  private getOscillatoryLineByLength(length: number): Matrix<number> {
    return new Array(TIMING_PATTERN_WIDTH).fill([]).map(() => {
      return new Array(length).fill(WHITE)
        .map((_, index) => isEven(index) ? BLACK : WHITE)
    })
  }
}

export const TIMING_PATTERN_DRAWER = new TimingPatternDrawer()
