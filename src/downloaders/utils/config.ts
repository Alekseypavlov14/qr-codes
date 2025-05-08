import { DownloaderConfig } from '../types/downloader-config'
import { defaultConfig } from '../constants'

export function normalizeConfig(config: Partial<DownloaderConfig>): DownloaderConfig {
  return ({
    fileName: config.fileName ?? defaultConfig.fileName,
    fileType: config.fileType ?? defaultConfig.fileType
  })
}
