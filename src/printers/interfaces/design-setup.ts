import { PrinterConfig } from './printer-config'
import { QRCodeContent } from '../../core/shared/types/content'
import { Drawer } from '../drawer'

export interface DesignSetup {
  print(printerConfig: Required<PrinterConfig>, drawer: Drawer, content: QRCodeContent): void
}
