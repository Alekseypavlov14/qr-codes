import { CANVAS_CONTEXT_ERROR, CONTAINER_IS_NOT_FOUND_ERROR } from '../errors'

export class HTMLUtils {
  select(selector: string) {
    const element = document.querySelector(selector)
    if (!element || !(element instanceof HTMLElement)) throw CONTAINER_IS_NOT_FOUND_ERROR

    return element
  }

  createCanvas() {
    return document.createElement('canvas')
  }

  getCanvasContext(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    if (!context) throw CANVAS_CONTEXT_ERROR

    return context
  }
}

export const HTML_UTILS = new HTMLUtils()
