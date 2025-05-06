import { PrinterConfig } from '../interfaces/printer-config'
import { QRCodeContent } from '../../core/shared/types/content'
import { BLACK, WHITE } from '../../core/shared/constants'
import { DesignSetup } from '../interfaces/design-setup'
import { getPoint } from '../../core/shared/utils/coordinates'
import { Drawer } from '../drawer'

export class LiquidDesignSetup implements DesignSetup {
  print(printerConfig: Required<PrinterConfig>, drawer: Drawer, content: QRCodeContent): void {
    const config = drawer.getConfig()
    
    const frameborderWidth = config.cellSize * printerConfig.paddingCells
    drawer.drawFrameborder(config.width, frameborderWidth, printerConfig.lightColor)

    const matrixCoordinate = printerConfig.paddingCells * config.cellSize
    const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)

    drawer.drawMatrixWithSquares(matrixCoordinates, content, WHITE, printerConfig.lightColor)
    drawer.drawMatrixWithConnectedCircles(matrixCoordinates, content, BLACK, printerConfig.darkColor, printerConfig.lightColor)
  }
}
