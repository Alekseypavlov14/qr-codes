import { Coordinates } from '../../core/shared/types/coordinates'
import { Engine } from '../interfaces/engine'
import { Color } from '../types/color'
import { Size } from '../../core/shared/types/size'

export class SVGEngine implements Engine {
  constructor(private context: SVGSVGElement) {}

  drawRectangle(coordinates: Coordinates, size: Size, color: Color) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

    rect.setAttribute('x', coordinates.x.toString())
    rect.setAttribute('y', coordinates.y.toString())
    rect.setAttribute('width', size.width.toString())
    rect.setAttribute('height', size.height.toString())
    rect.setAttribute('fill', color)
    
    this.context.appendChild(rect)
  }

  drawCircle(coordinates: Coordinates, diameter: number, color: Color) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

    circle.setAttribute('cx', (coordinates.x + diameter / 2).toString())
    circle.setAttribute('cy', (coordinates.y + diameter / 2).toString())
    circle.setAttribute('r', (diameter / 2).toString())
    circle.setAttribute('fill', color)
    
    this.context.appendChild(circle)
  }
}
