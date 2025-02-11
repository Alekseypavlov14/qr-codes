import { defaultPrinterConfig, mapDesignToSetup } from './constants'
import { normalizeConfig } from './utils/config'
import { PrinterConfig } from './interfaces/printer-config'
import { CanvasDrawer } from './utils/canvas'
import { HTML_UTILS } from '../shared/utils/html'
import { IPrinter } from './printer.interface'
import { Injector } from './types/injector'
import { Matrix } from '../core/shared/types/matrix'
import { Design } from './types/design'
import { Color } from './types/color'

export class Printer implements IPrinter {
  private readonly config: Required<PrinterConfig>

  constructor(config: Partial<PrinterConfig> = defaultPrinterConfig) {
    this.config = normalizeConfig(config)
  }

  print(matrix: Matrix<number>): Injector {
    return <T extends HTMLElement>(container: T) => {
      const containerSize = HTML_UTILS.getElementMinSize(container)

      const canvas = HTML_UTILS.createCanvas()
      const context = HTML_UTILS.getCanvasContext(canvas)

      const matrixSize = matrix.length
      const cellsAmount = matrixSize + 2 * this.config.paddingCells

      const cellsSize = containerSize / cellsAmount * this.config.resolutionIncreaseCoefficient
      const canvasSize = (matrixSize + 2 * this.config.paddingCells) * cellsSize
      
      canvas.width = canvasSize
      canvas.height = canvasSize

      const canvasDrawer = new CanvasDrawer({
        context: context,
        width: canvasSize,
        height: canvasSize,
        cellSize: cellsSize,
        lightColor: this.config.lightColor,
        darkColor: this.config.darkColor
      })

      const designSetup = mapDesignToSetup[this.config.design]
      
      designSetup.print(this.config, canvasDrawer, matrix)

      HTML_UTILS.insertElement(container, canvas)
    }
  }
  
  setLightColor(color: Color): void {
    this.config.lightColor = color
  }
  setDarkColor(color: Color): void {
    this.config.darkColor = color
  }
  setPaddingCells(paddingCells: number) {
    this.config.paddingCells = paddingCells
  }
  setDesign(design: Design) {
    this.config.design = design
  }
  setResolutionIncreaseCoefficient(resolutionIncreaseCoefficient: number) {
    this.config.resolutionIncreaseCoefficient = resolutionIncreaseCoefficient
  }
}
