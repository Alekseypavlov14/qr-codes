import { defaultPrinterConfig } from '../constants'
import { PrinterConfig } from '../interfaces/printer-config'

export function normalizeConfig(config: Partial<PrinterConfig>): Required<PrinterConfig> {
  return ({
    lightColor: config.lightColor ?? defaultPrinterConfig.lightColor,
    darkColor: config.darkColor ?? defaultPrinterConfig.darkColor,

    output: config.output ?? defaultPrinterConfig.output,
    paddingCells: config.paddingCells ?? defaultPrinterConfig.paddingCells,
    design: config.design ?? defaultPrinterConfig.design,
    
    resolutionIncreaseCoefficient: config.resolutionIncreaseCoefficient ?? defaultPrinterConfig.resolutionIncreaseCoefficient
  })
}
