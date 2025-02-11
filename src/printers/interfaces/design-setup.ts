import { PrinterConfig } from './printer-config'
import { Matrix } from '../../core/shared/types/matrix'
import { Drawer } from '../drawer'

export interface DesignSetup {
  print(printerConfig: Required<PrinterConfig>, drawer: Drawer, content: Matrix<number>): void
}
