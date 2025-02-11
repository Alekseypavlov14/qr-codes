import { mapDesignToSetup } from '../constants'
import { PrinterConfig } from '../interfaces/printer-config'
import { CanvasEngine } from '../engines/canvas-engine'
import { HTML_UTILS } from '../../shared/utils/html'
import { Process } from '../interfaces/process'
import { Matrix } from '../../core/shared/types/matrix'
import { Drawer } from '../drawer'

export class CanvasProcess implements Process<HTMLCanvasElement> {
  run(printerConfig: Required<PrinterConfig>, container: HTMLElement, content: Matrix<number>): HTMLCanvasElement {
    const containerSize = HTML_UTILS.getElementMinSize(container)
    
    const canvas = HTML_UTILS.createCanvas()
    const context = HTML_UTILS.getCanvasContext(canvas)

    const matrixSize = content.length
    const cellsAmount = matrixSize + 2 * printerConfig.paddingCells

    const cellsSize = containerSize / cellsAmount * printerConfig.resolutionIncreaseCoefficient
    const canvasSize = (matrixSize + 2 * printerConfig.paddingCells) * cellsSize
    
    canvas.width = canvasSize
    canvas.height = canvasSize

    const engine = new CanvasEngine(context)

    const canvasDrawer = new Drawer({
      engine: engine,
      width: canvasSize,
      height: canvasSize,
      cellSize: cellsSize,
      lightColor: printerConfig.lightColor,
      darkColor: printerConfig.darkColor
    })

    const designSetup = mapDesignToSetup[printerConfig.design]
    designSetup.print(printerConfig, canvasDrawer, content)

    return canvas
  }
}
