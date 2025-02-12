import { allCorners, bottomLeftCorner, bottomRightCorner, topLeftCorner, topRightCorner } from './constants'
import { DrawerConfig } from './interfaces/drawer-config'
import { Coordinates } from '../core/shared/types/coordinates'
import { Neighbors } from './types/neighbors'
import { getPoint } from '../core/shared/utils/coordinates'
import { getSize } from '../core/shared/utils/sizes'
import { Matrix } from '../core/shared/types/matrix'
import { Module } from '../core/shared/types/module'
import { Corner } from './types/corner'
import { Color } from './types/color'
import { Size } from '../core/shared/types/size'

export interface CallbackOptions {
  coordinate: Coordinates
  sizes: Size
  value: Module
  neighbors: Neighbors
}

export class Drawer {
  private readonly config: DrawerConfig

  constructor(config: DrawerConfig) {
    this.config = config
  }

  drawMatrixWithSquares(coordinates: Coordinates, matrix: Matrix<number>, value: Module, color: Color) {
    this.styleMatrix(coordinates, matrix, ({ coordinate, sizes, value: matrixValue }) => {
      if (matrixValue !== value) return

      this.drawRectangle(coordinate, sizes, color)
    })
  }

  drawMatrixWithCircles(coordinates: Coordinates, matrix: Matrix<number>, value: Module, color: Color) {
    this.styleMatrix(coordinates, matrix, ({ coordinate, sizes, value: matrixValue }) => {
      if (matrixValue !== value) return
      
      const diameter = sizes.width
      this.drawCircle(coordinate, diameter, color)
    })
  }

  drawMatrixWithConnectedCircles(coordinates: Coordinates, matrix: Matrix<number>, value: Module, color: Color, inverseColor: Color) {
    this.styleMatrix(coordinates, matrix, ({ coordinate, value: matrixValue, sizes, neighbors }) => {
      if (matrixValue !== value) return 

      const diameter = sizes.width
      const filledCorners: Corner[] = []

      if (neighbors.top === value) filledCorners.push(topLeftCorner, topRightCorner)
      if (neighbors.right === value) filledCorners.push(topRightCorner, bottomRightCorner)
      if (neighbors.bottom === value) filledCorners.push(bottomLeftCorner, bottomRightCorner)
      if (neighbors.left === value) filledCorners.push(topLeftCorner, bottomLeftCorner)
      
      const restCorners = allCorners.filter(corner => !filledCorners.includes(corner))

      this.drawCircle(coordinate, diameter, color)
      
      filledCorners.forEach(corner => this.drawOuterCorner(coordinate, diameter, corner, color))
      restCorners.forEach(corner => this.drawOuterCorner(coordinate, diameter, corner, inverseColor))
    })
  }

  drawMatrixOuterCorners(coordinates: Coordinates, matrix: Matrix<number>, values: Module[], corners: Corner[], color: Color) {
    this.styleMatrix(coordinates, matrix, ({ coordinate, sizes, value }) => {
      if (!values.includes(value)) return

      corners.forEach(corner => {
        this.drawOuterCorner(coordinate, sizes.width, corner, color)
      })
    })
  }

  styleMatrix(coordinates: Coordinates, matrix: Matrix<number>, callback: (options: CallbackOptions) => void) {
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        const coordinate = getPoint(column * this.config.cellSize + coordinates.x, row * this.config.cellSize + coordinates.y)
        const sizes = getSize(this.config.cellSize, this.config.cellSize)
        const value = matrix[row][column]

        const neighbors: Neighbors = {
          top: matrix?.[row - 1]?.[column] ?? null,
          topRight: matrix?.[row - 1]?.[column + 1] ?? null,
          right: matrix?.[row]?.[column + 1] ?? null,
          bottomRight: matrix?.[row + 1]?.[column + 1] ?? null,
          bottom: matrix?.[row + 1]?.[column] ?? null,
          bottomLeft: matrix?.[row + 1]?.[column - 1] ?? null,
          left: matrix?.[row]?.[column - 1] ?? null,
          topLeft: matrix?.[row - 1]?.[column - 1] ?? null,
        }

        const options: CallbackOptions = {
          coordinate,
          sizes,
          value,
          neighbors
        }
 
        callback(options)
      }
    }
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
