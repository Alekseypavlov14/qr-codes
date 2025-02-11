import { DesignToken } from './types/design'
import { EngineToken } from './types/engine'
import { Injector } from './types/injector'
import { Matrix } from '../core/shared/types/matrix'

export interface IPrinter {
  print(matrix: Matrix<number>): Injector

  setLightColor(color: string): void
  setDarkColor(color: string): void

  setOutput(output: EngineToken): void
  setPaddingCells(paddingCells: number): void
  setDesign(design: DesignToken): void
  
  setResolutionIncreaseCoefficient(resolutionCoefficient: number): void
}
