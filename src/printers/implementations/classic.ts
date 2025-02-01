import { CELL_SIZE, defaultPrinterConfig } from '../constants'
import { normalizeConfig } from '../utils/config'
import { PrinterConfig } from '../types/printer-config'
import { CanvasDrawer } from '../utils/canvas'
import { HTML_UTILS } from '../utils/html'
import { getPoint } from '../../core/shared/utils/coordinates'
import { IPrinter } from '../printer.interface'
import { Injector } from '../types/injector'
import { getSize } from '../../core/shared/utils/sizes'
import { Matrix } from '../../core/shared/types/matrix'
import { Color } from '../types/color'

export class PrinterClassic implements IPrinter {
  private readonly config: Required<PrinterConfig>

  constructor(config: PrinterConfig = defaultPrinterConfig) {
    this.config = normalizeConfig(config)
  }

  print(matrix: Matrix<number>): Injector {
    return (selector) => {
      const container = HTML_UTILS.select(selector)

      const canvas = HTML_UTILS.createCanvas()
      const context = HTML_UTILS.getCanvasContext(canvas)

      const matrixSize = matrix.length
      const canvasSize = (matrixSize + 2 * this.config.paddingCells) * CELL_SIZE

      const canvasDrawer = new CanvasDrawer({
        context: context,
        width: canvasSize,
        height: canvasSize,
        lightColor: this.config.lightColor,
        darkColor: this.config.darkColor
      })

      const backgroundCoordinate = getPoint(0, 0)
      const backgroundSize = getSize(canvasSize, canvasSize)
      const backgroundColor = this.config.lightColor

      canvasDrawer.drawRectangle(backgroundCoordinate, backgroundSize, backgroundColor)

      const matrixCoordinate = this.config.paddingCells * CELL_SIZE
      const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)

      canvasDrawer.drawMatrix(matrixCoordinates, matrix, CELL_SIZE)

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
