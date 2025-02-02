import { PrinterConfig } from './printer-config'
import { CanvasDrawer } from '../utils/canvas'
import { Matrix } from '../../core/shared/types/matrix'

export interface DesignRenderer {
  print(
    printerConfig: Required<PrinterConfig>, 
    canvasDrawer: CanvasDrawer, 
    content: Matrix<number>
  ): void
}
