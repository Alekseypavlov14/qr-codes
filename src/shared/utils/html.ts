import { CANVAS_CONTEXT_ERROR } from '../errors'
import { Size } from '../../core/shared/types/size'

export class HTMLUtils {
  insertElement(container: HTMLElement, element: Element) {
    container.appendChild(element)
  }

  createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas')

    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    return canvas
  }
  getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext('2d')
    if (!context) throw CANVAS_CONTEXT_ERROR

    return context
  }

  createSVG(size: Size): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`)
    svg.setAttribute('version', '1.1')

    return svg
  }

  getImageURLFromCanvas(canvas: HTMLCanvasElement, type: string): string {
    return canvas.toDataURL(type)
  }
  downloadFile(fileName: string, fileContent: string) {
    const a = document.createElement('a')
    
    a.href = fileContent
    a.download = fileName
  
    a.click()
    a.remove()
  }

  isElementOfType<T extends HTMLElement>(element: HTMLElement, elementType: new () => T): element is T {
    return element instanceof elementType
  }
  getElementMinSize(element: HTMLElement) {
    const { width, height } = element.getBoundingClientRect()
    return Math.min(width, height)
  }
}

export const HTML_UTILS = new HTMLUtils()
