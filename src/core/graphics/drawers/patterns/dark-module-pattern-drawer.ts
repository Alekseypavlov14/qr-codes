import { DARK_MODULE_BOTTOM_SHIFT, DARK_MODULE_COORDINATE_X, DARK_MODULE_SIZE } from '../../constants'
import { PatternDrawer } from './pattern-drawer.interface'
import { getPoint } from '../../../shared/utils/coordinates'
import { VERSION } from '../../../configuration/version'
import { Pattern } from '../../types/pattern.interface'
import { Version } from '../../../configuration/types'
import { getSize } from '../../../shared/utils/sizes'
import { PATTERN } from '../../utils/pattern'
import { Matrix } from '../../../shared/types/matrix'
import { Figure } from '../../types/figure.interface'
import { BLACK } from '../../../shared/constants'

export class DarkModulePatternDrawer implements PatternDrawer {
  draw(version: Version): Figure[] {
    const size = VERSION.getQRCodeWidthByVersion(version)
    const maxCoordinate = size - 1

    const coordinates = getPoint(DARK_MODULE_COORDINATE_X, maxCoordinate - DARK_MODULE_BOTTOM_SHIFT)
    const pattern = this.getPattern()

    const figure = PATTERN.applyWithPosition(coordinates, pattern)

    return [ figure ]
  }

  private getPattern(): Pattern {
    const content = this.getContent()
    const size = getSize(DARK_MODULE_SIZE, DARK_MODULE_SIZE)

    return PATTERN.create(content, size)
  } 

  private getContent(): Matrix<number> {
    return [
      [ BLACK ]
    ]
  }
}

export const DARK_MODULE_PATTERN_DRAWER = new DarkModulePatternDrawer()
