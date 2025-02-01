import { Matrix } from '../../shared/types/matrix'
import { Size } from '../../shared/types/size'

export interface Pattern {
  size: Size
  content: Matrix<number>
}
