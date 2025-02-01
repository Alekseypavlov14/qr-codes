import { Coordinates } from '../types/coordinates'

export function getPoint(x: number, y: number): Coordinates {
  return { x, y }
}

export function compare(point1: Coordinates, point2: Coordinates) {
  return (
    point1.x === point2.x &&
    point1.y === point2.y 
  )
}
