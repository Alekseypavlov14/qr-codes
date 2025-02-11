import { Engine } from './engine'
import { Color } from '../types/color'

export interface DrawerConfig {
  engine: Engine

  width: number
  height: number
  cellSize: number
  
  lightColor: Color
  darkColor: Color
}
