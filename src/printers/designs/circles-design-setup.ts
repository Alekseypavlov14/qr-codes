import { PrinterConfig } from '../interfaces/printer-config'
import { DesignSetup } from '../interfaces/design-setup'
import { getPoint } from '../../core/shared/utils/coordinates'
import { Matrix } from '../../core/shared/types/matrix'
import { Drawer } from '../drawer'
import { BLACK } from '../../core/shared/constants'

export class CirclesDesignSetup implements DesignSetup {
  print(printerConfig: Required<PrinterConfig>, drawer: Drawer, content: Matrix<number>): void {
    const config = drawer.getConfig()
    
    drawer.fillBackground(printerConfig.lightColor)
    
    const matrixCoordinate = printerConfig.paddingCells * config.cellSize
    const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)
    
    drawer.drawMatrixWithCircles(matrixCoordinates, content, BLACK, printerConfig.darkColor)
  }
}
