import { DownloaderConfig } from './types/downloader-config'

export type FileType = 'png' | 'jpeg' | 'webp' | 'svg'

export const fileTypePNG: FileType = 'png'
export const fileTypeJPEG: FileType = 'jpeg'
export const fileTypeWebp: FileType = 'webp'
export const fileTypeSVG: FileType = 'svg'

export const DEFAULT_FILE_NAME = 'qr-code'

export const defaultConfig: DownloaderConfig = {
  fileName: DEFAULT_FILE_NAME,
  fileType: fileTypePNG
}

export const SVG_MIME_TYPE = 'image/svg+xml'
