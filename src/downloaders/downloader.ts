import { getFileNameByNameAndExtension } from './utils/file-name'
import { mapFileExtensionToMimeType } from './utils/file-type'
import { ELEMENT_TYPE_ERROR } from '../shared/errors'
import { normalizeConfig } from './utils/config'
import { IDownloader } from './downloader.interface'
import { HTML_UTILS } from '../shared/utils/html'
import { FileType } from './constants'
import { Config } from './types/config'

export class Downloader implements IDownloader {
  private config: Config

  constructor(config: Partial<Config>) {
    this.config = normalizeConfig(config)
  }

  download(selector: string): void {
    const element = HTML_UTILS.select(selector)

    if (!HTML_UTILS.isElementOfType(element, HTMLCanvasElement)) throw ELEMENT_TYPE_ERROR
   
    const fileMimeType = mapFileExtensionToMimeType(this.config.fileType)
    const imageURL = HTML_UTILS.getImageURLFromCanvas(element, fileMimeType)

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