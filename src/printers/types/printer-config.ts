import { Design } from './design'
import { Color } from './color'

export interface PrinterConfig {
  paddingCells: number
  lightColor: Color
  darkColor: Color
  design: Design
}
