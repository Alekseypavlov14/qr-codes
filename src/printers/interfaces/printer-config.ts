import { Design } from '../types/design'
import { Color } from '../types/color'

export interface PrinterConfig {
  lightColor: Color
  darkColor: Color

  paddingCells: number
  design: Design

  resolutionIncreaseCoefficient: number
}
