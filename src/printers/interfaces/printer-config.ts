import { DesignToken } from '../types/design'
import { EngineToken } from '../types/engine'
import { Color } from '../types/color'

export interface PrinterConfig {
  lightColor: Color
  darkColor: Color

  output: EngineToken
  paddingCells: number
  design: DesignToken

  resolutionIncreaseCoefficient: number
}
