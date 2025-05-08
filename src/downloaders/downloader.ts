import { defaultConfig, FileType, fileTypeJPEG, fileTypePNG, fileTypeSVG, fileTypeWebp } from './constants'
import { ELEMENT_IS_NOT_FOUND_ERROR, ELEMENT_TYPE_ERROR, FILE_TYPE_ERROR } from '../shared/errors'
import { getFileNameByNameAndExtension } from './utils/file-name'
import { mapFileExtensionToMimeType } from './utils/file-type'
import { DownloaderConfig } from './types/downloader-config'
import { normalizeConfig } from './utils/config'
import { IDownloader } from './downloader.interface'
import { HTML_UTILS } from '../shared/utils/html'

export class Downloader implements IDownloader {
  private config: DownloaderConfig

  constructor(config: Partial<DownloaderConfig> = defaultConfig) {
    this.config = normalizeConfig(config)
  }

  download<T extends Element>(element: T): void {
    if (this.config.fileType === fileTypeSVG) return this.downloadFromSVG(element as unknown as SVGSVGElement)
    if ([ fileTypeJPEG, fileTypePNG, fileTypeWebp ].includes(this.config.fileType as FileType)) return this.downloadFromCanvas(element as unknown as HTMLCanvasElement)

    throw FILE_TYPE_ERROR
  }

  downloadFromCanvas(canvas: HTMLCanvasElement) {
    if (!HTML_UTILS.isElementOfType(canvas, HTMLCanvasElement)) throw ELEMENT_TYPE_ERROR
   
    const fileName = this.getFileName()
    const fileMimeType = mapFileExtensionToMimeType(this.config.fileType)
    const imageURL = HTML_UTILS.getImageURLFromCanvas(canvas, fileMimeType)

    HTML_UTILS.downloadFile(fileName, imageURL)
  }
  downloadFromCanvasContainer(container: HTMLElement): void {
    const canvas = container.querySelector('canvas')
    if (!canvas) throw ELEMENT_IS_NOT_FOUND_ERROR

    return this.downloadFromCanvas(canvas)
  }

  downloadFromSVG(svg: SVGSVGElement) {
    if (!HTML_UTILS.isElementOfType(svg, SVGSVGElement)) throw ELEMENT_TYPE_ERROR
   
    const fileName = this.getFileName()
    const imageURL = HTML_UTILS.getImageURLFromSVG(svg)

    HTML_UTILS.downloadFile(fileName, imageURL)
  }
  downloadFromSVgContainer(container: HTMLElement): void {
    const svg = container.querySelector('svg')
    if (!svg) throw ELEMENT_IS_NOT_FOUND_ERROR

    this.downloadFromSVG(svg)
  }

  private getFileName() {
    return getFileNameByNameAndExtension(this.config.fileName, this.config.fileType)
  }

  setFileName(fileName: string) {
    this.config.fileName = fileName
  }
  setFileType(fileType: FileType) {
    this.config.fileType = fileType
  }
  getConfig(): DownloaderConfig {
    return ({ ...this.config })
  }
}