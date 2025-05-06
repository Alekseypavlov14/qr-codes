import { mapDesignToSetup } from '../constants'
import { PrinterConfig } from '../interfaces/printer-config'
import { QRCodeContent } from '../../core/shared/types/content'
import { HTML_UTILS } from '../../shared/utils/html'
import { SVGEngine } from '../engines/svg-engine'
import { Process } from '../interfaces/process'
import { getSize } from '../../core/shared/utils/sizes'
import { Drawer } from '../drawer'

export class SVGProcess implements Process<SVGSVGElement> {
  run(printerConfig: Required<PrinterConfig>, container: HTMLElement, content: QRCodeContent): SVGSVGElement {
    const containerSize = HTML_UTILS.getElementMinSize(container)

    const matrixSize = content.length
    const cellsAmount = matrixSize + 2 * printerConfig.paddingCells
    
    const cellsSize = containerSize / cellsAmount
    const svgDimension = (matrixSize + 2 * printerConfig.paddingCells) * cellsSize
    
    const svgSize = getSize(svgDimension, svgDimension)
    const svg = HTML_UTILS.createSVG(svgSize)

    const engine = new SVGEngine(svg)

    const svgDrawer = new Drawer({
      engine: engine,
      width: svgDimension,
      height: svgDimension,
      cellSize: cellsSize,
      lightColor: printerConfig.lightColor,
      darkColor: printerConfig.darkColor
    })

    const designSetup = mapDesignToSetup[printerConfig.design]
    designSetup.print(printerConfig, svgDrawer, content)

    return svg
  }
}
