import { CANVAS_CONTENT_ERROR, CONTAINER_IS_NOT_FOUND_ERROR } from '../errors'
import { defaultPrinterConfig } from '../constants'
import { normalizeConfig } from '../utils/config'
import { PrinterConfig } from '../types/printer-config'
import { IPrinter } from '../printer.interface'
import { Injector } from '../types/injector'
import { Matrix } from '../../core/shared/types/matrix'
import { Color } from '../types/color'
import { BLACK } from '../../core/shared/constants'

export class PrinterClassic implements IPrinter {
  private readonly config: Required<PrinterConfig>

  constructor(config: PrinterConfig = defaultPrinterConfig) {
    this.config = normalizeConfig(config)
  }

  print(matrix: Matrix<number>): Injector {
    return (selector) => {
      const element = document.querySelector(selector)

      if (!element || !(element instanceof HTMLElement)) throw CONTAINER_IS_NOT_FOUND_ERROR

      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")

      if (!context) throw CANVAS_CONTENT_ERROR

      const cellSize = 10
      const matrixSize = matrix.length

      canvas.width = matrixSize * cellSize
      canvas.height = matrixSize * cellSize

      context.fillStyle = this.config.lightColor
      context.fillRect(0, 0, canvas.width, canvas.height)

      for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
          context.fillStyle = matrix[row][col] === BLACK ? this.config.darkColor : this.config.lightColor
          context.fillRect(
            col * cellSize,
            row * cellSize,
            cellSize,
            cellSize
          )
        }
      }

      element.appendChild(canvas)
    }
  }
  
  setLightColor(color: Color): void {
    this.config.lightColor = color
  }
  setDarkColor(color: Color): void {
    this.config.darkColor = color
  }
}
