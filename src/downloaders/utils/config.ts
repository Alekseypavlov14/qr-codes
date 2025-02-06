import { defaultConfig } from '../constants'
import { Config } from '../types/config'

export function normalizeConfig(config: Partial<Config>): Config {
  return ({
    fileName: config.fileName ?? defaultConfig.fileName,
    fileType: config.fileType ?? defaultConfig.fileType
  })
}
