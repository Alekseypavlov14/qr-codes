import { bottomLeftCorner, bottomRightCorner, STROKE_WIDTH, topLeftCorner, topRightCorner } from '../constants'
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
    const radius = diameter / 2
  
    const startPoint = {
      [topLeftCorner]: getPoint(coordinates.x, coordinates.y),
      [topRightCorner]: getPoint(coordinates.x + diameter, coordinates.y),
      [bottomRightCorner]: getPoint(coordinates.x + diameter, coordinates.y + diameter),
      [bottomLeftCorner]: getPoint(coordinates.x, coordinates.y + diameter),
    }[corner]
  
    const points = {
      [topLeftCorner]: [
        getPoint(coordinates.x + radius, coordinates.y), 
        getPoint(coordinates.x, coordinates.y + radius)
      ],
      [topRightCorner]: [
        getPoint(coordinates.x + diameter, coordinates.y + radius), 
        getPoint(coordinates.x + radius, coordinates.y)
      ],
      [bottomRightCorner]: [
        getPoint(coordinates.x + radius, coordinates.y + diameter), 
        getPoint(coordinates.x + diameter, coordinates.y + radius)
      ],
      [bottomLeftCorner]: [
        getPoint(coordinates.x, coordinates.y + radius), 
        getPoint(coordinates.x + radius, coordinates.y + diameter)
      ]
    }[corner]
  
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

    const svgPoint = `M ${startPoint.x} ${startPoint.y}`
    const svgFirstLine = `L ${points[0].x} ${points[0].y}`
    const svgArc = `A ${radius} ${radius} 0 0 0 ${points[1].x} ${points[1].y}`
    const svgSecondLine = `L ${startPoint.x} ${startPoint.y}`
    const svgPathTerminator = 'Z'

    const pathData = [svgPoint, svgFirstLine, svgArc, svgSecondLine, svgPathTerminator].join(" ")
  
    path.setAttribute("d", pathData)
    path.setAttribute("fill", color)
    
    this.context.appendChild(path)
  }
}
