import { PrinterConfig } from './printer-config'
import { Matrix } from '../../core/shared/types/matrix'

export interface Process<Output extends Element> {
  run(printerConfig: Required<PrinterConfig>, container: HTMLElement, content: Matrix<number>): Output
}
