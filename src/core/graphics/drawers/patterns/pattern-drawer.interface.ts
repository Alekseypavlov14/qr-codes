import { Version } from '../../../configuration/types'
import { Figure } from '../../types/figure.interface'

export interface PatternDrawer {
  draw: (version: Version) => Figure[]
}
