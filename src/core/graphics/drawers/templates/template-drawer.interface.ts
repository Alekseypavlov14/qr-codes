import { Version } from '../../../configuration/types'
import { Binary } from '../../../shared/types/binary'
import { Figure } from '../../types/figure.interface'

export interface TemplateDrawer {
  draw(version: Version, content: Binary): Figure[]
}
