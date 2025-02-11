import { LiquidOilDesignSetup } from './designs/liquid-oil-design-setup'
import { ClassicDesignSetup } from './designs/classic-design-setup'
import { CirclesDesignSetup } from './designs/circles-design-setup'
import { LiquidDesignSetup } from './designs/liquid-design-setup'
import { OilDesignSetup } from './designs/oid-design-setup'
import { DesignSetup } from './interfaces/design-setup'
import { PrinterConfig } from './interfaces/printer-config'
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

export const mapDesignToSetup: Record<Design, DesignSetup> = {
  [designClassic]: new ClassicDesignSetup(),
  [designCircles]: new CirclesDesignSetup(),
  [designLiquid]: new LiquidDesignSetup(),
  [designLiquidOil]: new LiquidOilDesignSetup(),
  [designOil]: new OilDesignSetup(),
} as Record<Design, DesignSetup>

