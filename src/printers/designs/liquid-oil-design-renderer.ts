import { DesignRenderer } from '../types/design-renderer'
import { PrinterConfig } from '../types/printer-config'
import { BLACK, WHITE } from '../../core/shared/constants'
import { CanvasDrawer } from '../utils/canvas'
import { getPoint } from '../../core/shared/utils/coordinates'
import { getSize } from '../../core/shared/utils/sizes'
import { Matrix } from '../../core/shared/types/matrix'

export class LiquidOilDesignRenderer implements DesignRenderer {
  print(printerConfig: Required<PrinterConfig>, canvasDrawer: CanvasDrawer, content: Matrix<number>): void {
    const canvasConfig = canvasDrawer.getConfig()
    
    canvasDrawer.fillBackground(printerConfig.lightColor)

    const matrixCoordinate = printerConfig.paddingCells * canvasConfig.cellSize
    const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)
    const matrixSize = content.length

    canvasDrawer.drawMatrixWithCircles(matrixCoordinates, content, BLACK, printerConfig.darkColor)
    canvasDrawer.connectConsecutiveCircles(matrixCoordinates, content, BLACK, printerConfig.darkColor)
    canvasDrawer.roundCorners(matrixCoordinates, content, WHITE, printerConfig.lightColor, printerConfig.darkColor)

    const bottomRightCornerCircleCoordinate = matrixCoordinate + (matrixSize - 1) * canvasConfig.cellSize
    const bottomRightCornerCircleCoordinates = getPoint(bottomRightCornerCircleCoordinate, bottomRightCornerCircleCoordinate)

    const bottomRightCircleColor = content[matrixSize - 1][matrixSize - 1] === BLACK 
      ? printerConfig.darkColor 
      : printerConfig.lightColor

    const bottomRightCornerRoundCoordinate = matrixCoordinate + (matrixSize - 0.5) * canvasConfig.cellSize
    const bottomRightCornerRoundCoordinates = getPoint(bottomRightCornerRoundCoordinate, bottomRightCornerRoundCoordinate)
    const bottomRightCornerRoundSize = getSize(canvasConfig.cellSize / 2, canvasConfig.cellSize / 2)

    canvasDrawer.drawRectangle(bottomRightCornerRoundCoordinates, bottomRightCornerRoundSize, printerConfig.lightColor)
    canvasDrawer.drawCircle(bottomRightCornerCircleCoordinates, canvasConfig.cellSize, bottomRightCircleColor)
  }
}
