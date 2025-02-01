import { Coordinates } from '../shared/types/coordinates'
import { getPoint } from '../shared/utils/coordinates'

export const COLUMN_WIDTH = 2
export const LEFT_COLUMN_INDEX = 0
export const RIGHT_COLUMN_INDEX = 1

export const RESERVED_TIMING_PATTERN_VERTICAL = 6
export const COLUMNS_SHIFT = 1

export const FINGER_PATTERN_SIZE = 7
export const FINGER_ISOLATION_SIZE = 1

export const TIMING_PATTERN_POSITION_INDEX = 6
export const TIMING_PATTERN_WIDTH = 1

export const FIRST_ALIGNMENT_PATTERN_TRACKS = 6
export const ALIGNMENT_PATTERN_SIZE = 5

export const VERSION_TEMPLATE_ROW_LENGTH = 3

export const FORMATTING_FIRST_PART_SLICES_AMOUNT = 2
export const FORMATTING_SECOND_PART_SLICES_AMOUNT = 4

export const FORMATTING_FIRST_PART_SLICES_LENGTHS = [ 6, 2, 1, 6 ]
export const FORMATTING_SECOND_PART_SLICES_LENGTHS = [ 7, 8 ]

export const FORMATTING_FIRST_PART_POSITIONS: Coordinates[] = [
  getPoint(0, 8),
  getPoint(7, 8),
  getPoint(8, 7),
  getPoint(8, 0),
]

export const FORMATTING_SECOND_PART_SLICES_PRIMARY_SHIFTS: number[] = [ 6, 7 ]
export const FORMATTING_SECOND_PART_SLICES_SECONDARY_SHIFT = 8

export const DARK_MODULE_COORDINATE_X = 8
export const DARK_MODULE_BOTTOM_SHIFT = 7
export const DARK_MODULE_SIZE = 1
