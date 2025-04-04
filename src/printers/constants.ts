import { LiquidOilDesignSetup } from './designs/liquid-oil-design-setup'
import { ClassicDesignSetup } from './designs/classic-design-setup'
import { CirclesDesignSetup } from './designs/circles-design-setup'
import { LiquidDesignSetup } from './designs/liquid-design-setup'
import { OilDesignSetup } from './designs/oid-design-setup'
import { PrinterConfig } from './interfaces/printer-config'
import { CanvasProcess } from './processes/canvas-process'
import { DesignSetup } from './interfaces/design-setup'
import { EngineToken } from './types/engine'
import { DesignToken } from './types/design'
import { SVGProcess } from './processes/svg-process'
import { Process } from './interfaces/process'
import { Corner } from './types/corner'
import { Color } from './types/color'

export const DEFAULT_PADDING_CELLS = 3
export const DEFAULT_RESOLUTION_INCREASE_COEFFICIENT = 5

export const BLACK_COLOR: Color = '#000'
export const WHITE_COLOR: Color = '#fff'

export const STROKE_WIDTH = 1

export const topLeftCorner: Corner = 'top-left'
export const topRightCorner: Corner = 'top-right'
export const bottomRightCorner: Corner = 'bottom-right'
export const bottomLeftCorner: Corner = 'bottom-left'

export const allCorners: Corner[] = [topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner]

export const designClassic: DesignToken = 'classic'
export const designCircles: DesignToken = 'circles'
export const designLiquid: DesignToken = 'liquid'
export const designLiquidOil: DesignToken = 'liquid-oil'
export const designOil: DesignToken = 'oil'

export const designsList: DesignToken[] = [
  designClassic,
  designCircles,
  designLiquid,
  designLiquidOil,
  designOil
] 

export const canvasEngine: EngineToken = 'canvas'
export const svgEngine: EngineToken = 'svg'

export const enginesList: EngineToken[] = [
  canvasEngine,
  svgEngine
]

export const defaultPrinterConfig: PrinterConfig = {
  lightColor: WHITE_COLOR,
  darkColor: BLACK_COLOR,

  output: canvasEngine,
  paddingCells: DEFAULT_PADDING_CELLS,
  design: designClassic,
  
  resolutionIncreaseCoefficient: DEFAULT_RESOLUTION_INCREASE_COEFFICIENT
}

export const mapDesignToSetup: Record<DesignToken, DesignSetup> = {
  [designClassic]: new ClassicDesignSetup(),
  [designCircles]: new CirclesDesignSetup(),
  [designLiquid]: new LiquidDesignSetup(),
  [designLiquidOil]: new LiquidOilDesignSetup(),
  [designOil]: new OilDesignSetup(),
}

export const mapOutputToProcess: Record<EngineToken, Process<Element>> = {
  [canvasEngine]: new CanvasProcess(),
  [svgEngine]: new SVGProcess(),
}