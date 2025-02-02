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

  drawMatrix(coordinates: Coordinates, matrix: Matrix<number>) {
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        const fillColor = matrix[row][column] === BLACK
          ? this.config.darkColor
          : this.config.lightColor

        const coordinate = getPoint(column * this.config.cellSize + coordinates.x, row * this.config.cellSize + coordinates.y)
        const size = getSize(this.config.cellSize, this.config.cellSize)

        this.drawRectangle(coordinate, size, fillColor)
      }
    }
  }

  drawMatrixWithCircles(coordinates: Coordinates, matrix: Matrix<number>) {
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        const fillColor = matrix[row][column] === BLACK
          ? this.config.darkColor
          : this.config.lightColor

        const coordinate = getPoint(column * this.config.cellSize + coordinates.x, row * this.config.cellSize + coordinates.y)

        this.drawCircle(coordinate, this.config.cellSize, fillColor)
      }
    }
  }

  connectConsecutiveCircles(coordinates: Coordinates, matrix: Matrix<number>) {
    const diameter = this.config.cellSize

    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        const module = matrix[row][column]
        if (module !== BLACK) continue

        // compare with top => fill top half
        const topModule = matrix?.[row - 1]?.[column]
        if (topModule === BLACK) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + coordinates.y)
          this.drawRectangle(coordinate, getSize(diameter, diameter / 2), this.config.darkColor)
        }

        // compare with right => fill right half
        const rightModule = matrix?.[row]?.[column + 1]
        if (rightModule === BLACK) {
          const coordinate = getPoint(column * diameter + diameter / 2 + coordinates.x, row * diameter + coordinates.y)
          this.drawRectangle(coordinate, getSize(diameter / 2, diameter), this.config.darkColor)
        }

        // compare with bottom => fill bottom half
        const bottomModule = matrix?.[row + 1]?.[column]
        if (bottomModule === BLACK) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + diameter / 2 + coordinates.y)
          this.drawRectangle(coordinate, getSize(diameter, diameter / 2), this.config.darkColor)
        }

        // compare with left => fill left half
        const leftModule = matrix?.[row]?.[column - 1]
        if (leftModule === BLACK) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + coordinates.y)
          this.drawRectangle(coordinate, getSize(diameter / 2, diameter), this.config.darkColor)
        }
      }
    }
  }

  drawRectangle(coordinates: Coordinates, size: Size, color: Color) {
    this.config.context.fillStyle = color
    this.config.context.rect(coordinates.x, coordinates.y, size.width, size.height)
    this.config.context.fillRect(coordinates.x, coordinates.y, size.width, size.height)
  }

  drawCircle(coordinates: Coordinates, diameter: number, color: Color) {
    this.config.context.fillStyle = color

    this.config.context.beginPath()
    this.config.context.arc(coordinates.x + diameter / 2, coordinates.y + diameter / 2, diameter / 2, 0, Math.PI * 2)
    this.config.context.fill()
  }

  fillBackground(color: Color) {
    const backgroundCoordinate = getPoint(0, 0)
    const backgroundSize = getSize(this.config.width, this.config.height)
    this.drawRectangle(backgroundCoordinate, backgroundSize, color)
  }

  getConfig() {
    return this.config
  }
}
