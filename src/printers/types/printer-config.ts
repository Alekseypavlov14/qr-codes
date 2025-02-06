import { Design } from './design'
import { Color } from './color'

export interface PrinterConfig {
  lightColor: Color
  darkColor: Color

  paddingCells: number
  design: Design

  resolutionIncreaseCoefficient: number
}
