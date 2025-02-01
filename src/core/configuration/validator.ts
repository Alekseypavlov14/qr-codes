import { VERSION } from './version'
import { Mode } from './types'
import { MODE } from './mode'

export class Validator {
  validateMessageContent(mode: Mode, message: string) {
    const modeRegex = MODE.getModeRegex(mode)
    return modeRegex.test(message)
  }

  validateMessageLength(mode: Mode, length: number) {
    const maximumLength = VERSION.getMaximumMessageLength(mode)
    return length <= maximumLength
  }
}

export const VALIDATOR = new Validator()
