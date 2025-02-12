import { bottomLeftCorner, bottomRightCorner, topLeftCorner, topRightCorner } from '../constants'
import { Coordinates } from '../../core/shared/types/coordinates'
import { getPoint } from '../../core/shared/utils/coordinates'
import { Corner } from '../types/corner'
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

  drawOuterCorner(coordinates: Coordinates, diameter: number, corner: Corner, color: Color): void {
    const centerX = coordinates.x + diameter / 2
    const centerY = coordinates.y + diameter / 2
    const radius = diameter / 2
  
    const startAngle = {
      [topLeftCorner]: Math.PI,
      [topRightCorner]: 1.5 * Math.PI,
      [bottomRightCorner]: 0,
      [bottomLeftCorner]: 0.5 * Math.PI
    }[corner]
  
    const endAngle = startAngle + Math.PI / 2
  
    const startPoint = {
      [topLeftCorner]: getPoint(0, 0),
      [topRightCorner]: getPoint(diameter, 0),
      [bottomRightCorner]: getPoint(diameter, diameter),
      [bottomLeftCorner]: getPoint(0, diameter),
    }[corner]
  
    const points = {
      [topLeftCorner]: [getPoint(radius, 0), getPoint(0, radius)],
      [topRightCorner]: [getPoint(diameter, radius), getPoint(radius, 0)],
      [bottomRightCorner]: [getPoint(radius, diameter), getPoint(diameter, radius)],
      [bottomLeftCorner]: [getPoint(0, radius), getPoint(radius, diameter)]
    }[corner]
  
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

    const svgPoint = `M${startPoint.x} ${startPoint.y}`
    const svgLines = points.map(point => `L${point.x},${point.y}`)
    const svgArc = `A${radius},${radius} 0 0, 1 ${centerX + Math.cos(endAngle) * radius},${centerY + Math.sin(endAngle) * radius}`
    const svgPathTerminator = 'Z'

    const pathData = [svgPoint, ...svgLines, svgArc, svgPathTerminator].join(" ")
  
    path.setAttribute("d", pathData)
    path.setAttribute("fill", color)
    
    this.context.appendChild(path)
  }
}
