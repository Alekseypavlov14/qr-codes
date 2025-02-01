import { defaultPrinterConfig, RESOLUTION_INCREASE_COEFFICIENT } from '../constants'
import { normalizeConfig } from '../utils/config'
import { PrinterConfig } from '../types/printer-config'
import { CanvasDrawer } from '../utils/canvas'
import { HTML_UTILS } from '../utils/html'
import { getPoint } from '../../core/shared/utils/coordinates'
import { IPrinter } from '../printer.interface'
import { Injector } from '../types/injector'
import { Matrix } from '../../core/shared/types/matrix'
import { Color } from '../types/color'

export class PrinterClassic implements IPrinter {
  private readonly config: Required<PrinterConfig>

  constructor(config: Partial<PrinterConfig> = defaultPrinterConfig) {
    this.config = normalizeConfig(config)
  }

  print(matrix: Matrix<number>): Injector {
    return (selector) => {
      const container = HTML_UTILS.select(selector)
      const containerSize = HTML_UTILS.getElementMinSize(container)

      const canvas = HTML_UTILS.createCanvas()
      const context = HTML_UTILS.getCanvasContext(canvas)

      const matrixSize = matrix.length
      const cellsAmount = matrixSize + 2 * this.config.paddingCells

      const cellsSize = containerSize / cellsAmount * RESOLUTION_INCREASE_COEFFICIENT
      const canvasSize = (matrixSize + 2 * this.config.paddingCells) * cellsSize
      
      canvas.width = canvasSize
      canvas.height = canvasSize

      const canvasDrawer = new CanvasDrawer({
        context: context,
        width: canvasSize,
        height: canvasSize,
        lightColor: this.config.lightColor,
        darkColor: this.config.darkColor
      })

      canvasDrawer.fillBackground(this.config.lightColor)

      const matrixCoordinate = this.config.paddingCells * cellsSize
      const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)

      canvasDrawer.drawMatrix(matrixCoordinates, matrix, cellsSize)

      HTML_UTILS.insertElement(container, canvas)
    }
  }
  
  setLightColor(color: Color): void {
    this.config.lightColor = color
  }
  setDarkColor(color: Color): void {
    this.config.darkColor = color
  }
}
