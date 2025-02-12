import { bottomLeftCorner, bottomRightCorner, topLeftCorner, topRightCorner } from '../constants'
import { Coordinates } from '../../core/shared/types/coordinates'
import { getPoint } from '../../core/shared/utils/coordinates'
import { Engine } from '../interfaces/engine'
import { Corner } from '../types/corner'
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

  drawOuterCorner(coordinates: Coordinates, diameter: number, corner: Corner, color: Color): void {
    const radius = diameter / 2
    const centerCoordinates = getPoint(coordinates.x + radius, coordinates.y + radius)

    const startAngle = {
      [topLeftCorner]: Math.PI,
      [topRightCorner]: 1.5 * Math.PI,
      [bottomRightCorner]: 0,
      [bottomLeftCorner]: 0.5 * Math.PI
    }[corner]

    const endAngle = startAngle - Math.PI / 2

    const startPoint = {
      [topLeftCorner]: getPoint(coordinates.x, coordinates.y),
      [topRightCorner]: getPoint(coordinates.x + diameter, coordinates.y),
      [bottomRightCorner]: getPoint(coordinates.x + diameter, coordinates.y + diameter),
      [bottomLeftCorner]: getPoint(coordinates.x, coordinates.y + diameter),
    }[corner]
  
    const arcStartPoint = {
      [topLeftCorner]: getPoint(coordinates.x + radius, coordinates.y),
      [topRightCorner]: getPoint(coordinates.x + diameter, coordinates.y + radius),
      [bottomRightCorner]: getPoint(coordinates.x + radius, coordinates.y + diameter),
      [bottomLeftCorner]: getPoint(coordinates.x, coordinates.y + radius),
    }[corner]

    this.context.fillStyle = color
    this.context.moveTo(startPoint.x, startPoint.y)
    this.context.lineTo(arcStartPoint.x, arcStartPoint.y)
    this.context.arc(centerCoordinates.x, centerCoordinates.y, radius, startAngle, endAngle, false)
    this.context.lineTo(startPoint.x, startPoint.y)
    this.context.closePath()
    this.context.fill()
  }
}
