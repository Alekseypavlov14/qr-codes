import { PrinterConfig } from '../interfaces/printer-config'
import { BLACK, WHITE } from '../../core/shared/constants'
import { DesignSetup } from '../interfaces/design-setup'
import { getPoint } from '../../core/shared/utils/coordinates'
import { Matrix } from '../../core/shared/types/matrix'
import { Drawer } from '../drawer'

export class ClassicDesignSetup implements DesignSetup {
  print(printerConfig: Required<PrinterConfig>, drawer: Drawer, content: Matrix<number>): void {
    const config = drawer.getConfig()
    
    const frameborderWidth = config.cellSize * printerConfig.paddingCells
    drawer.drawFrameborder(config.width, frameborderWidth, printerConfig.lightColor)
    
    const matrixCoordinate = printerConfig.paddingCells * config.cellSize
    const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)
    
    drawer.drawMatrixWithSquares(matrixCoordinates, content, BLACK, printerConfig.darkColor)
    drawer.drawMatrixWithSquares(matrixCoordinates, content, WHITE, printerConfig.lightColor)
  }
}
