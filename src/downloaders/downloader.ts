import { getFileNameByNameAndExtension } from './utils/file-name'
import { mapFileExtensionToMimeType } from './utils/file-type'
import { defaultConfig, FileType } from './constants'
import { ELEMENT_TYPE_ERROR } from '../shared/errors'
import { normalizeConfig } from './utils/config'
import { IDownloader } from './downloader.interface'
import { HTML_UTILS } from '../shared/utils/html'
import { Config } from './types/config'

export class Downloader implements IDownloader {
  private config: Config

  constructor(config: Partial<Config> = defaultConfig) {
    this.config = normalizeConfig(config)
  }

  download(canvas: HTMLCanvasElement): void {
    if (!HTML_UTILS.isElementOfType(canvas, HTMLCanvasElement)) throw ELEMENT_TYPE_ERROR
   
    const fileMimeType = mapFileExtensionToMimeType(this.config.fileType)
    const imageURL = HTML_UTILS.getImageURLFromCanvas(canvas, fileMimeType)

    const fileName = getFileNameByNameAndExtension(this.config.fileName, this.config.fileType)

    HTML_UTILS.downloadFile(fileName, imageURL)
  }

  setFileName(fileName: string) {
    this.config.fileName = fileName
  }
  setFileType(fileType: FileType) {
    this.config.fileType = fileType
  }
}