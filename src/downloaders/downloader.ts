import { ELEMENT_IS_NOT_FOUND_ERROR, ELEMENT_TYPE_ERROR } from '../shared/errors'
import { getFileNameByNameAndExtension } from './utils/file-name'
import { mapFileExtensionToMimeType } from './utils/file-type'
import { defaultConfig, FileType } from './constants'
import { normalizeConfig } from './utils/config'
import { IDownloader } from './downloader.interface'
import { HTML_UTILS } from '../shared/utils/html'
import { Config } from './types/config'

export class Downloader implements IDownloader {
  private config: Config

  constructor(config: Partial<Config> = defaultConfig) {
    this.config = normalizeConfig(config)
  }

  downloadFromCanvas(canvas: HTMLCanvasElement) {
    if (!HTML_UTILS.isElementOfType(canvas, HTMLCanvasElement)) throw ELEMENT_TYPE_ERROR
   
    const fileMimeType = mapFileExtensionToMimeType(this.config.fileType)
    const imageURL = HTML_UTILS.getImageURLFromCanvas(canvas, fileMimeType)

    const fileName = getFileNameByNameAndExtension(this.config.fileName, this.config.fileType)

    HTML_UTILS.downloadFile(fileName, imageURL)
  }
  downloadFromCanvasContainer(container: HTMLElement): void {
    const canvas = container.querySelector('canvas')
    if (!canvas) throw ELEMENT_IS_NOT_FOUND_ERROR

    return this.downloadFromCanvas(canvas)
  }

  downloadFromSVG(svg: SVGSVGElement) {
    if (!HTML_UTILS.isElementOfType(svg, SVGSVGElement)) throw ELEMENT_TYPE_ERROR
   
    const imageURL = HTML_UTILS.getImageURLFromSVG(svg)

    const fileName = getFileNameByNameAndExtension(this.config.fileName, this.config.fileType)

    HTML_UTILS.downloadFile(fileName, imageURL)
  }
  downloadFromSVgContainer(container: HTMLElement): void {
    const svg = container.querySelector('svg')
    if (!svg) throw ELEMENT_IS_NOT_FOUND_ERROR

    this.downloadFromSVG(svg)
  }

  setFileName(fileName: string) {
    this.config.fileName = fileName
  }
  setFileType(fileType: FileType) {
    this.config.fileType = fileType
  }
}