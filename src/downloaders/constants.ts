import { Config } from './types/config'

export type FileType = 'png' | 'jpeg' | 'webp'

export const fileTypePNG: FileType = 'png'
export const fileTypeJPEG: FileType = 'jpeg'
export const fileTypeWebp: FileType = 'webp'

export const DEFAULT_FILE_NAME = 'qr-code'

export const defaultConfig: Config = {
  fileName: DEFAULT_FILE_NAME,
  fileType: fileTypePNG
}
