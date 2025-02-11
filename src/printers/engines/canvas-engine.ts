import { Coordinates } from '../../core/shared/types/coordinates'
import { Engine } from '../interfaces/engine'
import { Color } from '../types/color'
import { Size } from '../../core/shared/types/size'

export class CanvasEngine implements Engine {
  constructor(private context: CanvasRenderingContext2D) {}

  drawRectangle(coordinates: Coordinates, size: Size, color: Color) {
    this.context.fillStyle = color
    this.context.rect(coordinates.x, coordinates.y, size.width, size.height)
    this.context.fillRect(coordinates.x, coordinates.y, size.width, size.height)
  }

  drawCircle(coordinates: Coordinates, diameter: number, color: Color) {
    this.context.fillStyle = color

    this.context.beginPath()
    this.context.arc(coordinates.x + diameter / 2, coordinates.y + diameter / 2, diameter / 2, 0, Math.PI * 2)
    this.context.fill()
  }
}
