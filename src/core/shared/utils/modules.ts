import { BLACK, WHITE } from '../constants'

export function inverse(module: number) {
  return module === BLACK ? WHITE : BLACK
}
