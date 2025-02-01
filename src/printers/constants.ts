import { PrinterConfig } from './types/printer-config'
import { Color } from './types/color'

export const BLACK_COLOR: Color = '#000'
export const WHITE_COLOR: Color = '#fff'

export const defaultPrinterConfig: PrinterConfig = {
  lightColor: WHITE_COLOR,
  darkColor: BLACK_COLOR
}
