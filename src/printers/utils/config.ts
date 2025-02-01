import { defaultPrinterConfig } from '../constants'
import { PrinterConfig } from '../types/printer-config'

export function normalizeConfig(config: PrinterConfig): Required<PrinterConfig> {
  return ({
    lightColor: config.lightColor ?? defaultPrinterConfig.lightColor,
    darkColor: config.darkColor ?? defaultPrinterConfig.darkColor
  })
}
