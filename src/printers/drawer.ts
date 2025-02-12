import { DrawerConfig } from './interfaces/drawer-config'
import { Coordinates } from '../core/shared/types/coordinates'
import { getPoint } from '../core/shared/utils/coordinates'
import { getSize } from '../core/shared/utils/sizes'
import { Matrix } from '../core/shared/types/matrix'
import { Module } from '../core/shared/types/module'
import { Corner } from './types/corner'
import { Color } from './types/color'
import { Size } from '../core/shared/types/size'

export class Drawer {
  private readonly config: DrawerConfig

  constructor(config: DrawerConfig) {
    this.config = config
  }

  drawMatrix(coordinates: Coordinates, matrix: Matrix<number>, value: Module, color: Color) {
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        if (matrix[row][column] !== value) continue

        const coordinate = getPoint(column * this.config.cellSize + coordinates.x, row * this.config.cellSize + coordinates.y)
        const size = getSize(this.config.cellSize, this.config.cellSize)

        this.config.engine.drawRectangle(coordinate, size, color)
      }
    }
  }
  drawMatrixWithCircles(coordinates: Coordinates, matrix: Matrix<number>, value: Module, color: Color) {
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        if (matrix[row][column] !== value) continue

        const coordinate = getPoint(column * this.config.cellSize + coordinates.x, row * this.config.cellSize + coordinates.y)

        this.config.engine.drawCircle(coordinate, this.config.cellSize, color)
      }
    }
  }

  connectConsecutiveCircles(coordinates: Coordinates, matrix: Matrix<number>, value: Module, color: Color) {
    const diameter = this.config.cellSize

    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        const module = matrix[row][column]
        if (module !== value) continue

        // compare with top => fill top half
        const topModule = matrix?.[row - 1]?.[column]
        if (topModule === value) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + coordinates.y)
          this.config.engine.drawRectangle(coordinate, getSize(diameter, diameter / 2), color)
        }

        // compare with right => fill right half
        const rightModule = matrix?.[row]?.[column + 1]
        if (rightModule === value) {
          const coordinate = getPoint(column * diameter + diameter / 2 + coordinates.x, row * diameter + coordinates.y)
          this.config.engine.drawRectangle(coordinate, getSize(diameter / 2, diameter), color)
        }

        // compare with bottom => fill bottom half
        const bottomModule = matrix?.[row + 1]?.[column]
        if (bottomModule === value) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + diameter / 2 + coordinates.y)
          this.config.engine.drawRectangle(coordinate, getSize(diameter, diameter / 2), color)
        }

        // compare with left => fill left half
        const leftModule = matrix?.[row]?.[column - 1]
        if (leftModule === value) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + coordinates.y)
          this.config.engine.drawRectangle(coordinate, getSize(diameter / 2, diameter), color)
        }
      }
    }
  }
  connectEdgeCircles(coordinates: Coordinates, matrix: Matrix<number>, value: Module, color: Color) {
    const diameter = this.config.cellSize

    const minCoordinate = 0
    const maxCoordinate = matrix.length - 1
    
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        const module = matrix[row][column]
        if (module !== value) continue

        if (
          row !== minCoordinate && row !== maxCoordinate && 
          column !== minCoordinate && column !== maxCoordinate
        ) continue

        const isTopModule = row === minCoordinate
        const isRightModule = column === maxCoordinate
        const isBottomModule = row === maxCoordinate
        const isLeftModule = column === minCoordinate

        if (isTopModule) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + coordinates.y)
          this.config.engine.drawRectangle(coordinate, getSize(diameter, diameter / 2), color)
        }
        if (isRightModule) {
          const coordinate = getPoint(column * diameter + diameter / 2 + coordinates.x, row * diameter + coordinates.y)
          this.config.engine.drawRectangle(coordinate, getSize(diameter / 2, diameter), color)
        }
        if (isBottomModule) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + diameter / 2 + coordinates.y)
          this.config.engine.drawRectangle(coordinate, getSize(diameter, diameter / 2), color)
        }
        if (isLeftModule) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + coordinates.y)
          this.config.engine.drawRectangle(coordinate, getSize(diameter / 2, diameter), color)
        }
      }
    }
  }

  roundCorners(coordinates: Coordinates, matrix: Matrix<number>, value: Module, moduleColor: Color, roundColor: Color) {
    const diameter = this.config.cellSize

    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        const module = matrix[row][column]
        if (module !== value) continue

        const topModule = matrix?.[row - 1]?.[column]
        const topRightModule = matrix?.[row - 1]?.[column + 1]
        const rightModule = matrix?.[row]?.[column + 1]
        const bottomRightModule = matrix?.[row + 1]?.[column + 1]
        const bottomModule = matrix?.[row + 1]?.[column]
        const bottomLeftModule = matrix?.[row + 1]?.[column - 1]
        const leftModule = matrix?.[row]?.[column - 1]
        const topLeftModule = matrix?.[row - 1]?.[column - 1]
        
        const isSurroundedByOppositeColorFromTopRight = topModule !== value && topRightModule !== value && rightModule !== value
        const isSurroundedByOppositeColorFromBottomRight = bottomModule !== value && bottomRightModule !== value && rightModule !== value
        const isSurroundedByOppositeColorFromTopLeft = topModule !== value && topLeftModule !== value && leftModule !== value
        const isSurroundedByOppositeColorFromBottomLeft = bottomModule !== value && bottomLeftModule !== value && leftModule !== value

        const cornerRectangleSize = getSize(diameter / 2, diameter / 2)

        const circleCoordinate = getPoint(column * diameter + coordinates.x, row * diameter + coordinates.y)

        if (isSurroundedByOppositeColorFromTopRight) {
          const coordinate = getPoint(column * diameter + diameter / 2 + coordinates.x, row * diameter + coordinates.y)
          this.config.engine.drawRectangle(coordinate, cornerRectangleSize, roundColor)
        }

        if (isSurroundedByOppositeColorFromBottomRight) {
          const coordinate = getPoint(column * diameter + diameter / 2 + coordinates.x, row * diameter + diameter / 2 + coordinates.y)
          this.config.engine.drawRectangle(coordinate, cornerRectangleSize, roundColor)
        }

        if (isSurroundedByOppositeColorFromBottomLeft) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + diameter / 2 + coordinates.y)
          this.config.engine.drawRectangle(coordinate, cornerRectangleSize, roundColor)
        }

        if (isSurroundedByOppositeColorFromTopLeft) {
          const coordinate = getPoint(column * diameter + coordinates.x, row * diameter + coordinates.y)
          this.config.engine.drawRectangle(coordinate, cornerRectangleSize, roundColor)
        }

        this.config.engine.drawCircle(circleCoordinate, diameter, moduleColor)
      }
    }
  }

  fillBackground(color: Color) {
    const backgroundCoordinate = getPoint(0, 0)
    const backgroundSize = getSize(this.config.width, this.config.height)

    this.config.engine.drawRectangle(backgroundCoordinate, backgroundSize, color)
  }

  drawFrameborder(dimension: number, width: number, color: Color) {
    const topRectCoordinates = getPoint(0, 0)
    const bottomRectangle = getPoint(0, dimension - width)
    const leftRectangle = getPoint(0, 0)
    const rightRectangle = getPoint(dimension - width, 0)

    this.drawRectangle(topRectCoordinates, getSize(dimension, width), color)
    this.drawRectangle(bottomRectangle, getSize(dimension, width), color)
    this.drawRectangle(leftRectangle, getSize(width, dimension), color)
    this.drawRectangle(rightRectangle, getSize(width, dimension), color)
  }

  drawRectangle(coordinates: Coordinates, sizes: Size, color: Color) {
    this.config.engine.drawRectangle(coordinates, sizes, color)
  }
  drawCircle(coordinates: Coordinates, diameter: number, color: Color) {
    this.config.engine.drawCircle(coordinates, diameter, color)
  }
  drawOuterCorner(coordinates: Coordinates, diameter: number, corner: Corner, color: Color) {
    this.config.engine.drawOuterCorner(coordinates, diameter, corner, color)
  }

  getConfig() {
    return this.config
  }
}
