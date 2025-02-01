import { Coordinates } from '../../shared/types/coordinates'
import { Pattern } from './pattern.interface'

export interface Figure extends Pattern {
  position: Coordinates
}
