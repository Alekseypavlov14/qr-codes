import { Coordinates } from '../../core/shared/types/coordinates'
import { Corner } from '../types/corner'
import { Color } from '../types/color'
import { Size } from '../../core/shared/types/size'

export interface Engine {
  drawRectangle(coordinates: Coordinates, sizes: Size, color: Color): void
  drawCircle(coordinates: Coordinates, diameter: number, color: Color): void
  drawOuterCorner(coordinates: Coordinates, diameter: number, corner: Corner, color: Color): void
}
