import { PrinterConfig } from './types/printer-config'
import { Matrix } from '../core/shared/types/matrix'

export interface IPrinter {
  new(config?: PrinterConfig): IPrinter

  print(matrix: Matrix<number>): (selector: string) => void
  
  setLightColor(color: string): void
  setDarkColor(color: string): void
}
