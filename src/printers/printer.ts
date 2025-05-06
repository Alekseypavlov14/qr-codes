import { defaultPrinterConfig, mapDesignToSetup, mapOutputToProcess } from './constants'
import { normalizeConfig } from './utils/config'
import { QRCodeContent } from '../core/shared/types/content'
import { PrinterConfig } from './interfaces/printer-config'
import { DesignToken } from './types/design'
import { EngineToken } from './types/engine'
import { HTML_UTILS } from '../shared/utils/html'
import { IPrinter } from './printer.interface'
import { Injector } from './types/injector'
import { Color } from './types/color'

export class Printer implements IPrinter {
  private readonly config: Required<PrinterConfig>

  constructor(config: Partial<PrinterConfig> = defaultPrinterConfig) {
    this.config = normalizeConfig(config)
  }

  print(content: QRCodeContent): Injector {
    return <T extends HTMLElement>(container: T) => {
      const process = mapOutputToProcess[this.config.output]
      const element = process.run(this.config, container, content)

      HTML_UTILS.clearElement(container)
      HTML_UTILS.insertElement(container, element)
    }
  }
  
  setLightColor(color: Color): void {
    this.config.lightColor = color
  }
  setDarkColor(color: Color): void {
    this.config.darkColor = color
  }
  setOutput(output: EngineToken) {
    this.config.output = output
  }
  setPaddingCells(paddingCells: number) {
    this.config.paddingCells = paddingCells
  }
  setDesign(design: DesignToken) {
    this.config.design = design
  }
  setResolutionIncreaseCoefficient(resolutionIncreaseCoefficient: number) {
    this.config.resolutionIncreaseCoefficient = resolutionIncreaseCoefficient
  }
}
