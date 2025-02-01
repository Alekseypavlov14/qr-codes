import { clone, getMatrixOf, replace } from '../../shared/utils/matrix'
import { compare, getPoint } from '../../shared/utils/coordinates'
import { Coordinates } from '../../shared/types/coordinates'
import { CONVERTER } from '../../shared/converter'
import { max, min } from '../../shared/utils/mathematics'
import { reverse } from '../../shared/utils/array'
import { getSize } from '../../shared/utils/sizes'
import { Binary } from '../../shared/types/binary'
import { Matrix } from '../../shared/types/matrix'
import { Path } from '../../shared/types/path'
import { Size } from '../../shared/types/size'

export class PathUtils {
  write(matrix: Matrix<number>, path: Path, content: Binary, start: Coordinates = getPoint(0, 0)) {
    const template = clone(matrix)
    const contentArray = CONVERTER.convertBinaryToArray(content)
    
    contentArray.forEach((module, index) => {
      replace(template, path[index].y + start.y, path[index].x + start.x, module)
    })

    return template
  }

  fill(path: Path, content: Binary) {
    const templateMatrix = this.getMatrix(path)
    const contentArray = CONVERTER.convertBinaryToArray(content)
  
    const minPathX = min(path.map(point => point.x))
    const minPathY = min(path.map(point => point.y))
  
    contentArray.forEach((module, i) => {
      const shiftedX = path[i].x - minPathX
      const shiftedY = path[i].y - minPathY
  
      replace(templateMatrix, shiftedY, shiftedX, module)
    })
  
    return templateMatrix
  }

  getMatrix(path: Path): Matrix<number> {
    const size = this.getSize(path)
    return getMatrixOf(size.height, size.width, 0)
  }

  getSize(path: Path): Size {
    const minX = min(path.map(point => point.x))
    const maxX = max(path.map(point => point.x))
  
    const width = Math.abs(maxX - minX + 1)
  
    const minY = min(path.map(point => point.y))
    const maxY = max(path.map(point => point.y))
  
    const height = Math.abs(maxY - minY + 1)
  
    return getSize(width, height)
  }

  includes(path: Path, point: Coordinates): boolean {
    return path.some(coordinates => compare(coordinates, point))
  }
   
  getLeftDirectedLine(length: number): Path {
    return reverse(this.getRightDirectedLine(length))
  }
  getRightDirectedLine(length: number): Path {
    return new Array(length).fill(0).map((_, index) => {
      const x = index
      const y = 0
      
      return getPoint(x, y)
    })
  }
  getTopDirectedLine(length: number): Path {
    return reverse(this.getBottomDirectedLine(length))
  }
  getBottomDirectedLine(length: number): Path {
    return new Array(length).fill(0).map((_, index) => {
      const x = 0
      const y = index
      
      return getPoint(x, y )
    })
  }
}

export const PATH = new PathUtils()
