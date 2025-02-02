import { DesignRenderer } from '../types/design-renderer'
import { PrinterConfig } from '../types/printer-config'
import { BLACK, WHITE } from '../../core/shared/constants'
import { CanvasDrawer } from '../utils/canvas'
import { getPoint } from '../../core/shared/utils/coordinates'
import { getSize } from '../../core/shared/utils/sizes'
import { Matrix } from '../../core/shared/types/matrix'

export class OilDesignRenderer implements DesignRenderer {
  print(printerConfig: Required<PrinterConfig>, canvasDrawer: CanvasDrawer, content: Matrix<number>): void {
    const canvasConfig = canvasDrawer.getConfig()
    
    canvasDrawer.fillBackground(printerConfig.lightColor)
    
    const matrixCoordinate = printerConfig.paddingCells * canvasConfig.cellSize
    const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)
    const matrixSize = getSize(content[0].length * canvasConfig.cellSize, content.length * canvasConfig.cellSize)
    
    canvasDrawer.drawRectangle(matrixCoordinates, matrixSize, printerConfig.darkColor)
    canvasDrawer.drawMatrixWithCircles(matrixCoordinates, content, WHITE, printerConfig.lightColor)
    canvasDrawer.connectConsecutiveCircles(matrixCoordinates, content, WHITE, printerConfig.lightColor)
    canvasDrawer.roundCorners(matrixCoordinates, content, BLACK, printerConfig.darkColor, printerConfig.lightColor)
    canvasDrawer.connectEdgeCircles(matrixCoordinates, content, WHITE, canvasConfig.lightColor)
  }
}
