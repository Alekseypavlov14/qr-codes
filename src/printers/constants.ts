import { ClassicDesignRenderer } from './designs/classic-design-renderer'
import { LiquidDesignRenderer } from './designs/liquid-design-renderer'
import { DesignRenderer } from './types/design-renderer'
import { PrinterConfig } from './types/printer-config'
import { Design } from './types/design'
import { Color } from './types/color'

export const DEFAULT_PADDING_CELLS = 3
export const RESOLUTION_INCREASE_COEFFICIENT = 2

export const BLACK_COLOR: Color = '#000'
export const WHITE_COLOR: Color = '#fff'

export const designClassic: Design = 'classic'
export const designLiquid: Design = 'liquid'

export const defaultPrinterConfig: PrinterConfig = {
  paddingCells: DEFAULT_PADDING_CELLS,
  lightColor: WHITE_COLOR,
  darkColor: BLACK_COLOR,
  design: designClassic
}

export const mapDesignToRenderer: Record<Design, DesignRenderer> = {
  [designClassic]: new ClassicDesignRenderer(),
  [designLiquid]: new LiquidDesignRenderer(),
} as Record<Design, DesignRenderer>

