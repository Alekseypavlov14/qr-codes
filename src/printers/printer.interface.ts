import { QRCodeContent } from '../core'
import { DesignToken } from './types/design'
import { EngineToken } from './types/engine'
import { Injector } from './types/injector'

export interface IPrinter {
  getInjectorByElement<T extends HTMLElement>(element: T): Injector
  getInjectorBySelector(selector: string): Injector

  print<T extends HTMLElement>(element: T, content: QRCodeContent): void

  setLightColor(color: string): void
  setDarkColor(color: string): void

  setOutput(output: EngineToken): void
  setPaddingCells(paddingCells: number): void
  setDesign(design: DesignToken): void
  
  setResolutionIncreaseCoefficient(resolutionCoefficient: number): void
}
