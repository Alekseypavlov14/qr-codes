import { PrinterConfig } from '../interfaces/printer-config'
import { BLACK, WHITE } from '../../core/shared/constants'
import { DesignSetup } from '../interfaces/design-setup'
import { getPoint } from '../../core/shared/utils/coordinates'
import { getSize } from '../../core/shared/utils/sizes'
import { Matrix } from '../../core/shared/types/matrix'
import { Drawer } from '../drawer'

export class LiquidOilDesignSetup implements DesignSetup {
  print(printerConfig: Required<PrinterConfig>, drawer: Drawer, content: Matrix<number>): void {
    const config = drawer.getConfig()
    
    drawer.fillBackground(printerConfig.lightColor)

    const matrixCoordinate = printerConfig.paddingCells * config.cellSize
    const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)
    const matrixSize = content.length

    drawer.drawMatrixWithCircles(matrixCoordinates, content, BLACK, printerConfig.darkColor)
    drawer.connectConsecutiveCircles(matrixCoordinates, content, BLACK, printerConfig.darkColor)
    drawer.roundCorners(matrixCoordinates, content, WHITE, printerConfig.lightColor, printerConfig.darkColor)
    drawer.connectEdgeCircles(matrixCoordinates, content, WHITE, config.lightColor)

    const bottomRightCornerCircleCoordinate = matrixCoordinate + (matrixSize - 1) * config.cellSize
    const bottomRightCornerCircleCoordinates = getPoint(bottomRightCornerCircleCoordinate, bottomRightCornerCircleCoordinate)

    const bottomRightCircleColor = content[matrixSize - 1][matrixSize - 1] === BLACK 
      ? printerConfig.darkColor 
      : printerConfig.lightColor

    const bottomRightCornerRoundCoordinate = matrixCoordinate + (matrixSize - 0.5) * config.cellSize
    const bottomRightCornerRoundCoordinates = getPoint(bottomRightCornerRoundCoordinate, bottomRightCornerRoundCoordinate)
    const bottomRightCornerRoundSize = getSize(config.cellSize / 2, config.cellSize / 2)

    drawer.drawRectangle(bottomRightCornerRoundCoordinates, bottomRightCornerRoundSize, printerConfig.lightColor)
    drawer.drawCircle(bottomRightCornerCircleCoordinates, config.cellSize, bottomRightCircleColor)
  }
}
