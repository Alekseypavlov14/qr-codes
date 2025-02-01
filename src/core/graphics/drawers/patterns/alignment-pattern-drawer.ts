import { ALIGNMENT_PATTERN_SIZE, FIRST_ALIGNMENT_PATTERN_TRACKS } from '../../constants'
import { PatternDrawer } from './pattern-drawer.interface'
import { BLACK, WHITE } from '../../../shared/constants'
import { Coordinates } from '../../../shared/types/coordinates'
import { getPoint } from '../../../shared/utils/coordinates'
import { VERSION } from '../../../configuration/version'
import { Pattern } from '../../types/pattern.interface'
import { Version } from '../../../configuration/types'
import { PATTERN } from '../../utils/pattern'
import { getSize } from '../../../shared/utils/sizes'
import { Figure } from '../../types/figure.interface'

export class AlignmentPatternDrawer implements PatternDrawer {
  draw(version: Version): Figure[] {
    const alignmentPattern = this.getAlignmentPattern()

    const topLeftAlignmentPatternCoordinates = this.getAlignmentPatternCoordinates(version)
    const alignmentFigures = topLeftAlignmentPatternCoordinates.map(coordinates => {
      return PATTERN.applyWithPosition(coordinates, alignmentPattern)
    })

    return alignmentFigures
  }

  private getAlignmentPattern(): Pattern {
    return {
      size: getSize(ALIGNMENT_PATTERN_SIZE, ALIGNMENT_PATTERN_SIZE),
      content: [
        [ BLACK, BLACK, BLACK, BLACK, BLACK ],
        [ BLACK, WHITE, WHITE, WHITE, BLACK ],
        [ BLACK, WHITE, BLACK, WHITE, BLACK ],
        [ BLACK, WHITE, WHITE, WHITE, BLACK ],
        [ BLACK, BLACK, BLACK, BLACK, BLACK ],
      ]
    }
  }

  private getAlignmentPatternCoordinates(version: Version): Coordinates[] {
    const vertices = this.getAlignmentPatternVerticesCoordinates(version)
    const shift = (ALIGNMENT_PATTERN_SIZE - 1) / 2

    const topLeftCornerCoordinates = vertices.map<Coordinates>(coordinates => ({
      x: coordinates.x - shift,
      y: coordinates.y - shift
    }))

    return topLeftCornerCoordinates
  }

  private getAlignmentPatternVerticesCoordinates(version: Version): Coordinates[] {
    const tracks = this.getAlignmentTracks(version)
    const coordinates: Coordinates[] = []

    tracks.forEach((x, i) => {
      tracks.forEach((y, j) => {
        const isTopLeftCorner = i === 0 && j === 0
        const isTopRightCorner = i === tracks.length - 1 && j === 0
        const isBottomLeftCorner = i === 0 && j === tracks.length - 1

        if (isTopLeftCorner || isTopRightCorner || isBottomLeftCorner) return

        coordinates.push(getPoint(x, y))
      })
    })

    return coordinates
  }

  private getAlignmentTracks(version: Version): number[] {
    if (version <= 1) return []

    const size = VERSION.getQRCodeWidthByVersion(version)
    const versionCoefficient = Math.floor(version / 7) + 2 // see qr-code docs

    const alignmentPatternsAmount = versionCoefficient ** 2 - 3 // see qr-code docs
    if (alignmentPatternsAmount <= 0) return []

    const intervals = versionCoefficient - 1

    const distance = size - 2 * FIRST_ALIGNMENT_PATTERN_TRACKS - 1
    const step = Math.ceil(distance / intervals / 2) * 2 // see qr-code docs

    return [FIRST_ALIGNMENT_PATTERN_TRACKS].concat(Array.from({ length: intervals }, (_, index) => {
      return FIRST_ALIGNMENT_PATTERN_TRACKS + distance - (intervals - 1 - index) * step
    }))
  }
}

export const ALIGNMENT_PATTERN_DRAWER = new AlignmentPatternDrawer()
