import { topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner, allCorners } from '../constants'
import { PrinterConfig } from '../interfaces/printer-config'
import { BLACK, WHITE } from '../../core/shared/constants'
import { DesignSetup } from '../interfaces/design-setup'
import { getPoint } from '../../core/shared/utils/coordinates'
import { Matrix } from '../../core/shared/types/matrix'
import { Drawer } from '../drawer'
import { Corner } from '../types/corner'

export class OilDesignSetup implements DesignSetup {
  print(printerConfig: Required<PrinterConfig>, drawer: Drawer, content: Matrix<number>): void {
    const config = drawer.getConfig()
        
    const frameborderWidth = config.cellSize * printerConfig.paddingCells
    drawer.drawFrameborder(config.width, frameborderWidth, printerConfig.lightColor)

    const matrixCoordinate = printerConfig.paddingCells * config.cellSize
    const matrixCoordinates = getPoint(matrixCoordinate, matrixCoordinate)

    drawer.styleMatrix(matrixCoordinates, content, ({ coordinate, value, sizes, neighbors }) => {
      if (value !== WHITE) return

      const diameter = sizes.width
      const filledCorners: Corner[] = []

      if (neighbors.top === BLACK && neighbors.left === BLACK) filledCorners.push(topLeftCorner)
      if (neighbors.top === BLACK && neighbors.right === BLACK) filledCorners.push(topRightCorner)
      if (neighbors.bottom === BLACK && neighbors.right === BLACK) filledCorners.push(bottomRightCorner)
      if (neighbors.bottom === BLACK && neighbors.left === BLACK) filledCorners.push(bottomLeftCorner)
      
      const restCorners = allCorners.filter(corner => !filledCorners.includes(corner))

      drawer.drawCircle(coordinate, diameter, printerConfig.lightColor)

      filledCorners.forEach(corner => drawer.drawOuterCorner(coordinate, diameter, corner, printerConfig.darkColor))
      restCorners.forEach(corner => drawer.drawOuterCorner(coordinate, diameter, corner, printerConfig.lightColor))
    })

    drawer.drawMatrixWithConnectedCircles(matrixCoordinates, content, BLACK, printerConfig.darkColor, printerConfig.lightColor)
  }
}
