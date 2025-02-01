import { Coordinates } from '../shared/types/coordinates'

export type Mode = 'numeric' | 'alphanumeric' | 'byte' | 'kanji'

export const NUMERIC_MODE: Mode = 'numeric'
export const ALPHANUMERIC_MODE: Mode = 'alphanumeric'
export const BYTE_MODE: Mode = 'byte'
export const KANJI_MODE: Mode = 'kanji'

export type ErrorCorrection = 'L' | 'M' | 'Q' | 'H'

export const ERROR_CORRECTION_L: ErrorCorrection = 'L'
export const ERROR_CORRECTION_M: ErrorCorrection = 'M'
export const ERROR_CORRECTION_Q: ErrorCorrection = 'Q'
export const ERROR_CORRECTION_H: ErrorCorrection = 'H'

export type Version = number

export type Mask = number

export type MaskPatternCallback = (coordinates: Coordinates) => boolean
