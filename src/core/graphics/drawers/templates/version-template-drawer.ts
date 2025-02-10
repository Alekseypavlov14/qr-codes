import { FINGER_ISOLATION_SIZE, FINGER_PATTERN_SIZE, VERSION_TEMPLATE_ROW_LENGTH } from '../../constants'
import { BCH_VERSION_TOTAL_LENGTH } from '../../../encoding/constants'
import { TemplateDrawer } from './template-drawer.interface'
import { getPoint } from '../../../shared/utils/coordinates'
import { VERSION } from '../../../configuration/version'
import { inverse } from '../../../shared/utils/strings'
import { Pattern } from '../../types/pattern.interface'
import { Version } from '../../../configuration/types'
import { getSize } from '../../../shared/utils/sizes'
import { PATTERN } from '../../utils/pattern'
import { Figure } from '../../types/figure.interface'
import { Binary } from '../../../shared/types/binary'
import { Path } from '../../../shared/types/path'
import { PATH } from '../../utils/path'

export class VersionTemplateDrawer implements TemplateDrawer {
  draw(version: Version, content: Binary): Figure[] {
    const versionFigureCoordinate = this.computeCoordinate(version)
    const inverseContent = inverse(content)
    
    const topRightVersionPattern = this.getTopRightVersionPattern(inverseContent)
    const bottomLeftVersionPattern = this.getBottomLeftVersionPattern(inverseContent)

    const topRightVersionFigure = PATTERN.applyWithPosition(getPoint(versionFigureCoordinate, 0), topRightVersionPattern)
    const bottomLeftVersionFigure = PATTERN.applyWithPosition(getPoint(0, versionFigureCoordinate), bottomLeftVersionPattern)

    return [
      topRightVersionFigure,
      bottomLeftVersionFigure
    ]
  }

  private getTopRightVersionPattern(content: Binary): Pattern {
    const path = this.getTopRightVersionPath()
    const contentMatrix = PATH.fill(path, content)

    return {
      size: getSize(VERSION_TEMPLATE_ROW_LENGTH, BCH_VERSION_TOTAL_LENGTH / VERSION_TEMPLATE_ROW_LENGTH),
      content: contentMatrix
    }
  }
  private getBottomLeftVersionPattern(content: Binary): Pattern {
    const path = this.getBottomLeftVersionPath()
    const contentMatrix = PATH.fill(path, content)

    return {
      size: getSize(BCH_VERSION_TOTAL_LENGTH / VERSION_TEMPLATE_ROW_LENGTH, VERSION_TEMPLATE_ROW_LENGTH),
      content: contentMatrix
    }
  } 

  private getTopRightVersionPath(): Path {
    return new Array(BCH_VERSION_TOTAL_LENGTH).fill(null)
      .map((_, index) => {
        const x = index % VERSION_TEMPLATE_ROW_LENGTH
        const y = Math.floor(index / VERSION_TEMPLATE_ROW_LENGTH)

        return getPoint(x, y)
      })
  }
  private getBottomLeftVersionPath(): Path {
    return new Array(BCH_VERSION_TOTAL_LENGTH).fill(null)
      .map((_, index) => {
        const x = Math.floor(index / VERSION_TEMPLATE_ROW_LENGTH)
        const y = index % VERSION_TEMPLATE_ROW_LENGTH

        return getPoint(x, y)
      })
  }

  private computeCoordinate(version: Version) {
    const size = VERSION.getQRCodeWidthByVersion(version)
    return size - FINGER_PATTERN_SIZE - FINGER_ISOLATION_SIZE - VERSION_TEMPLATE_ROW_LENGTH
  }
}

export const VERSION_TEMPLATE_DRAWER = new VersionTemplateDrawer()
