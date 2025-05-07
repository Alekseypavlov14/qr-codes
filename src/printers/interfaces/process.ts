import { PrinterConfig } from './printer-config'
import { QRCodeContent } from '../../core/shared/types/content'

export interface Process<Output extends Element> {
  run(printerConfig: Required<PrinterConfig>, containerSize: number, content: QRCodeContent): Output
}
