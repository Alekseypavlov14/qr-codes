import { DesignRenderer } from '../types/design-renderer'
import { PrinterConfig } from '../types/printer-config'
import { CanvasDrawer } from '../utils/canvas'
import { getPoint } from '../../core/shared/utils/coordinates'
import { Matrix } from '../../core/shared/types/matrix'
import { BLACK } from '../../core/shared/constants'

export class ClassicDesignRenderer implements DesignRenderer {
  print(printerConfig: Required<PrinterConfig>, canvasDrawer: CanvasDrawer, content: Matrix<number>): void {
    const canvasConfig = canvasDrawer.getConfig()
    
    canvasDrawer.fillBackground(printerConfig.lightColor)
    
    const matrixCoordinate = printerConfig.paddingCells * canvasConfig.cellSize
    const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)
    
    canvasDrawer.drawMatrix(matrixCoordinates, content, BLACK, printerConfig.darkColor)
  }
}
