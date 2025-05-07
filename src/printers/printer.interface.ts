import { QRCodeContent } from '../core'
import { DesignToken } from './types/design'
import { EngineToken } from './types/engine'
import { Injector } from './types/injector'

export interface IPrinter {
  getInjectorByElement<T extends HTMLElement>(container: T): Injector
  getInjectorBySelector(selector: string): Injector

  injectContent<T extends HTMLElement>(container: T, content: QRCodeContent): void
  injectElement<C extends HTMLElement, E extends Element>(container: C, element: E): void
  print<T extends Element>(content: QRCodeContent, size?: number): T

  setLightColor(color: string): void
  setDarkColor(color: string): void

  setOutput(output: EngineToken): void
  setPaddingCells(paddingCells: number): void
  setDesign(design: DesignToken): void
  
  setResolutionIncreaseCoefficient(resolutionCoefficient: number): void
}
