import { CanvasConfig } from '../types/canvas-config'
import { Coordinates } from '../../core/shared/types/coordinates'
import { getPoint } from '../../core/shared/utils/coordinates'
import { getSize } from '../../core/shared/utils/sizes'
import { Matrix } from '../../core/shared/types/matrix'
import { BLACK } from '../../core/shared/constants'
import { Color } from '../types/color'
import { Size } from '../../core/shared/types/size'

export class CanvasDrawer {
  private readonly config: CanvasConfig

  constructor(config: CanvasConfig) {
    this.config = config
  }

  drawMatrix(coordinates: Coordinates, matrix: Matrix<number>, cellSize: number) {
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        const fillColor = matrix[row][column] === BLACK
          ? this.config.darkColor
          : this.config.lightColor

        const coordinate = getPoint(column * cellSize + coordinates.x, row * cellSize + coordinates.y)
        const size = getSize(cellSize, cellSize)

        this.drawRectangle(coordinate, size, fillColor)
      }
    }
  }

  drawRectangle(coordinates: Coordinates, size: Size, color: Color) {
    this.config.context.fillStyle = color
    this.config.context.rect(coordinates.x, coordinates.y, size.width, size.height)
    this.config.context.fillRect(coordinates.x, coordinates.y, size.width, size.height)
  }
}
