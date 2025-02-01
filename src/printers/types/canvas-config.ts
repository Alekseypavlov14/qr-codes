import { Color } from './color'

export interface CanvasConfig {
  context: CanvasRenderingContext2D
  width: number
  height: number
  lightColor: Color
  darkColor: Color
}
