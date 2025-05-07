import { mapDesignToSetup } from '../constants'
import { PrinterConfig } from '../interfaces/printer-config'
import { QRCodeContent } from '../../core/shared/types/content'
import { CanvasEngine } from '../engines/canvas-engine'
import { HTML_UTILS } from '../../shared/utils/html'
import { Process } from '../interfaces/process'
import { Drawer } from '../drawer'

export class CanvasProcess implements Process<HTMLCanvasElement> {
  run(printerConfig: Required<PrinterConfig>, containerSize: number, content: QRCodeContent): HTMLCanvasElement {
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
