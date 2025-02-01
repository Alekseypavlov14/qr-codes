import { Coordinates } from '../types/coordinates'
import { getPoint } from './coordinates'
import { Matrix } from '../types/matrix'

export function getMatrixOf<T>(rows: number, columns: number, content: T): Matrix<T> {
  return new Array<T[]>(rows).fill([]).map(() => new Array<T>(columns).fill(content))
}

export function clone<T>(matrix: Matrix<T>): Matrix<T> {
  return new Array<T[]>(matrix.length).fill([])
    .map((_, rowIndex) => new Array(matrix[0].length).fill(null).map((_, columnIndex) => matrix[rowIndex][columnIndex]))
}

export function replace<T>(matrix: Matrix<T>, row: number, column: number, content: T): Matrix<T> {
  if (!matrix || !matrix[row]) return matrix

  matrix[row][column] = content
  return matrix
}

export function insert<T>(matrix: Matrix<T>, position: Coordinates, insertion: Matrix<T>): void {
  forEach(insertion, (value, coordinates) => {
    replace(matrix, position.y + coordinates.y, position.x + coordinates.x, value)
  })
}

export function combine<T>(base: Matrix<T>, ...matrices: Matrix<T>[]) {
  const baseClone = clone(base)

  matrices.forEach(matrix => {
    insert(baseClone, getPoint(0, 0), matrix)
  })

  return baseClone
}

export function transpose<T>(matrix: Matrix<T>): Matrix<T> {
  return new Array(matrix[0].length).fill([])
    .map((_, rowIndex) => new Array(matrix.length).fill(null).map((_, columnIndex) => matrix[columnIndex][rowIndex]))
}

export function forEach<T>(matrix: Matrix<T>, callback: (value: T, position: Coordinates) => void): void {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      callback(value, getPoint(x, y))
    })
  })
}
