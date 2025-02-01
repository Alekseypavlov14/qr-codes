import { PrinterConfig } from './types/printer-config'
import { Color } from './types/color'

export const DEFAULT_PADDING_CELLS = 3
export const RESOLUTION_INCREASE_COEFFICIENT = 2

export const BLACK_COLOR: Color = '#000'
export const WHITE_COLOR: Color = '#fff'

export const defaultPrinterConfig: PrinterConfig = {
  paddingCells: DEFAULT_PADDING_CELLS,
  lightColor: WHITE_COLOR,
  darkColor: BLACK_COLOR
}
