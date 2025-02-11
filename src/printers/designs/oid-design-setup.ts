import { PrinterConfig } from '../interfaces/printer-config'
import { BLACK, WHITE } from '../../core/shared/constants'
import { DesignSetup } from '../interfaces/design-setup'
import { getPoint } from '../../core/shared/utils/coordinates'
import { getSize } from '../../core/shared/utils/sizes'
import { Matrix } from '../../core/shared/types/matrix'
import { Drawer } from '../drawer'

export class OilDesignSetup implements DesignSetup {
  print(printerConfig: Required<PrinterConfig>, drawer: Drawer, content: Matrix<number>): void {
    const config = drawer.getConfig()
    
    drawer.fillBackground(printerConfig.lightColor)
    
    const matrixCoordinate = printerConfig.paddingCells * config.cellSize
    const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)
    const matrixSize = getSize(content[0].length * config.cellSize, content.length * config.cellSize)
    
    drawer.drawRectangle(matrixCoordinates, matrixSize, printerConfig.darkColor)
    drawer.drawMatrixWithCircles(matrixCoordinates, content, WHITE, printerConfig.lightColor)
    drawer.connectConsecutiveCircles(matrixCoordinates, content, WHITE, printerConfig.lightColor)
    drawer.roundCorners(matrixCoordinates, content, BLACK, printerConfig.darkColor, printerConfig.lightColor)
    drawer.connectEdgeCircles(matrixCoordinates, content, WHITE, config.lightColor)
  }
}
