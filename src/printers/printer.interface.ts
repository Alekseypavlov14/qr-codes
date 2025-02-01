import { Injector } from './types/injector'
import { Matrix } from '../core/shared/types/matrix'

export interface IPrinter {
  print(matrix: Matrix<number>): Injector
  setLightColor(color: string): void
  setDarkColor(color: string): void
}
