import { LiquidOilDesignRenderer } from './designs/liquid-oil-design-renderer'
import { ClassicDesignRenderer } from './designs/classic-design-renderer'
import { CirclesDesignRenderer } from './designs/circles-design-renderer'
import { LiquidDesignRenderer } from './designs/liquid-design-renderer'
import { OilDesignRenderer } from './designs/oid-design-renderer'
import { DesignRenderer } from './types/design-renderer'
import { PrinterConfig } from './types/printer-config'
import { Design } from './types/design'
import { Color } from './types/color'

export const DEFAULT_PADDING_CELLS = 3
export const DEFAULT_RESOLUTION_INCREASE_COEFFICIENT = 5

export const BLACK_COLOR: Color = '#000'
export const WHITE_COLOR: Color = '#fff'

export const designClassic: Design = 'classic'
export const designCircles: Design = 'circles'
export const designLiquid: Design = 'liquid'
export const designLiquidOil: Design = 'liquid-oil'
export const designOil: Design = 'oil'

export const defaultPrinterConfig: PrinterConfig = {
  lightColor: WHITE_COLOR,
  darkColor: BLACK_COLOR,

  paddingCells: DEFAULT_PADDING_CELLS,
  design: designClassic,
  
  resolutionIncreaseCoefficient: DEFAULT_RESOLUTION_INCREASE_COEFFICIENT
}

export const mapDesignToRenderer: Record<Design, DesignRenderer> = {
  [designClassic]: new ClassicDesignRenderer(),
  [designCircles]: new CirclesDesignRenderer(),
  [designLiquid]: new LiquidDesignRenderer(),
  [designLiquidOil]: new LiquidOilDesignRenderer(),
  [designOil]: new OilDesignRenderer(),
} as Record<Design, DesignRenderer>

