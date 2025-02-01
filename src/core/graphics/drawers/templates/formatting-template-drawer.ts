import { FORMATTING_FIRST_PART_POSITIONS, FORMATTING_FIRST_PART_SLICES_LENGTHS, FORMATTING_SECOND_PART_SLICES_LENGTHS, FORMATTING_SECOND_PART_SLICES_PRIMARY_SHIFTS, FORMATTING_SECOND_PART_SLICES_SECONDARY_SHIFT } from '../../constants'
import { TemplateDrawer } from './template-drawer.interface'
import { Coordinates } from '../../../shared/types/coordinates'
import { CONVERTER } from '../../../shared/converter'
import { getPoint } from '../../../shared/utils/coordinates'
import { VERSION } from '../../../configuration/version'
import { Version } from '../../../configuration/types'
import { Pattern } from '../../types/pattern.interface'
import { PATTERN } from '../../utils/pattern'
import { Binary } from '../../../shared/types/binary'
import { Figure } from '../../types/figure.interface'
import { PATH } from '../../utils/path'
import { cut } from '../../../shared/utils/array'

export class FormattingTemplateDrawer implements TemplateDrawer {
  draw(version: Version, content: Binary): Figure[] {
    const contentArray = CONVERTER.convertBinaryToArray(content)

    const firstPartSlices = cut(contentArray, FORMATTING_FIRST_PART_SLICES_LENGTHS)
    const secondPartSlices = cut(contentArray, FORMATTING_SECOND_PART_SLICES_LENGTHS)

    const firstPartSlicesBinaries = firstPartSlices.map(slice => CONVERTER.convertArrayToBinary(slice))
    const secondPartSlicesBinaries = secondPartSlices.map(slice => CONVERTER.convertArrayToBinary(slice))

    const firstPartPaths = this.getFirstPartFormattingPatternPaths()
    const secondPartPaths = this.getSecondPartFormattingPatternPaths()

    const firstPartPathsSizes = firstPartPaths.map(path => PATH.getSize(path))
    const secondPartPathsSizes = secondPartPaths.map(path => PATH.getSize(path))

    const firstPartContents = firstPartPaths.map((path, index) => PATH.fill(path, firstPartSlicesBinaries[index]))
    const secondPartContents = secondPartPaths.map((path, index) => PATH.fill(path, secondPartSlicesBinaries[index]))

    const firstPartPatterns = firstPartContents.map<Pattern>((content, index) => ({
      size: firstPartPathsSizes[index],
      content,
    }))
    const secondPartPatterns = secondPartContents.map<Pattern>((content, index) => ({
      size: secondPartPathsSizes[index],
      content
    }))
    
    const firstPartPositions = this.getFirstPartFormattingPatternCoordinates()
    const secondPartPositions = this.getSecondPartFormattingPatternCoordinates(version)
    
    const firstPartFigures = firstPartPatterns.map<Figure>((pattern, index) => {
      return PATTERN.applyWithPosition(firstPartPositions[index], pattern)
    })
    const secondPartFigures = secondPartPatterns.map<Figure>((pattern, index) => {
      return PATTERN.applyWithPosition(secondPartPositions[index], pattern)
    })

    return [
      ...firstPartFigures,
      ...secondPartFigures
    ]
  }

  private getFirstPartFormattingPatternCoordinates(): Coordinates[] {
    return FORMATTING_FIRST_PART_POSITIONS
  }

  private getSecondPartFormattingPatternCoordinates(version: Version): Coordinates[] {
    const size = VERSION.getQRCodeWidthByVersion(version)
    const maxIndex = size - 1

    const firstPartCoordinatesX = FORMATTING_SECOND_PART_SLICES_SECONDARY_SHIFT
    const firstPartCoordinatesY = maxIndex - FORMATTING_SECOND_PART_SLICES_PRIMARY_SHIFTS[0]

    const firstPartCoordinates = getPoint(firstPartCoordinatesX, firstPartCoordinatesY)

    const secondPartCoordinatesX = maxIndex - FORMATTING_SECOND_PART_SLICES_PRIMARY_SHIFTS[1]
    const secondPartCoordinatesY = FORMATTING_SECOND_PART_SLICES_SECONDARY_SHIFT

    const secondPartCoordinates = getPoint(secondPartCoordinatesX, secondPartCoordinatesY)

    return [ firstPartCoordinates, secondPartCoordinates ]
  }

  private getFirstPartFormattingPatternPaths() {
    const [
      firstSliceLength,
      secondSliceLength,
      thirdSliceLength,
      foursSliceLength
    ] = FORMATTING_FIRST_PART_SLICES_LENGTHS

    const firstFragment = PATH.getRightDirectedLine(firstSliceLength)
    const secondFragment = PATH.getRightDirectedLine(secondSliceLength)
    const thirdFragment = PATH.getTopDirectedLine(thirdSliceLength)
    const foursFragment = PATH.getTopDirectedLine(foursSliceLength)

    return [
      firstFragment,
      secondFragment,
      thirdFragment,
      foursFragment
    ]
  }

  private getSecondPartFormattingPatternPaths() {
    const [
      firstSliceLength, 
      secondSliceLength
    ] = FORMATTING_SECOND_PART_SLICES_LENGTHS 

    const firstFragment = PATH.getTopDirectedLine(firstSliceLength)
    const secondFragment = PATH.getRightDirectedLine(secondSliceLength)

    return [
      firstFragment,
      secondFragment
    ]
  }
}

export const FORMATTING_TEMPLATE_DRAWER = new FormattingTemplateDrawer()
