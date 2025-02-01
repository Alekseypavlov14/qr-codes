import { defaultPrinterConfig } from '../constants'
import { PrinterConfig } from '../types/printer-config'

export function normalizeConfig(config: Partial<PrinterConfig>): Required<PrinterConfig> {
  return ({
    paddingCells: config.paddingCells ?? defaultPrinterConfig.paddingCells,
    lightColor: config.lightColor ?? defaultPrinterConfig.lightColor,
    darkColor: config.darkColor ?? defaultPrinterConfig.darkColor
  })
}
