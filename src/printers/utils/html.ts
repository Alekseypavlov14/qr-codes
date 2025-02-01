import { CANVAS_CONTEXT_ERROR, CONTAINER_IS_NOT_FOUND_ERROR } from '../errors'

export class HTMLUtils {
  select(selector: string): HTMLElement {
    const element = document.querySelector(selector)
    if (!element || !(element instanceof HTMLElement)) throw CONTAINER_IS_NOT_FOUND_ERROR

    return element
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

  insertElement(container: HTMLElement, element: HTMLElement) {
    container.appendChild(element)
  }
}

export const HTML_UTILS = new HTMLUtils()
