import { QRCodeContent } from '../core/shared/types/content'
import { DesignToken } from './types/design'
import { EngineToken } from './types/engine'
import { Injector } from './types/injector'

export interface IPrinter {
  print(matrix: QRCodeContent): Injector

  setLightColor(color: string): void
  setDarkColor(color: string): void

  setOutput(output: EngineToken): void
  setPaddingCells(paddingCells: number): void
  setDesign(design: DesignToken): void
  
  setResolutionIncreaseCoefficient(resolutionCoefficient: number): void
}
