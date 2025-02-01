import { TOO_LONG_MESSAGE_ERROR, UNSUPPORTED_MESSAGE_CONTENT_ERROR } from './shared/errors'
import { DEFAULT_ERROR_CORRECTION, DEFAULT_MASK } from './configuration/constants'
import { BYTE_MODE, ErrorCorrection, Mode } from './configuration/types'
import { CONTENT_ENCODER } from './content/encoder'
import { GRAPHICS_SETUP } from './content/setup'
import { MASK_PATTERN } from './content/mask'
import { CONTENT_PATH } from './content/path'
import { TERMINATOR } from './content/constants'
import { VALIDATOR } from './configuration/validator'
import { CONVERTER } from './shared/converter'
import { VERSION } from './configuration/version'
import { compose } from './shared/utils/array'
import { FIGURE } from './graphics/utils/figure'
import { Matrix } from './shared/types/matrix'
import { Board } from './graphics/types/board.interface'
import { BOARD } from './graphics/utils/board'
import { MODE } from './configuration/mode'
import { PATH } from './graphics/utils/path'

export interface QRCodeConfig {
  message: string
  minimalErrorCorrection?: ErrorCorrection
}

export class QRCode {
  private static readonly DEFAULT_MODE = BYTE_MODE

  static create(options: QRCodeConfig): Matrix<number> {
    // normalize options
    const { message, minimalErrorCorrection } = this.normalizeOptions(options)
    this.validateMessage(this.DEFAULT_MODE, message)

    // get optimal version for QR-Code
    const optimalVersionOption = VERSION.getOptimalVersionAndErrorCorrection(this.DEFAULT_MODE, message.length, minimalErrorCorrection)
    if (!optimalVersionOption) throw TOO_LONG_MESSAGE_ERROR
    
    const { version,  errorCorrection } = optimalVersionOption
    
    // create patterns
    const patternFigures = GRAPHICS_SETUP.setupPatterns(version)

    // create formatting information
    const formattingFigures = GRAPHICS_SETUP.addFormattingInfo(version, errorCorrection, DEFAULT_MASK)
    const versionFigures = GRAPHICS_SETUP.addVersion(version)
    
    // create QR-Code board
    const board: Board = {
      dimension: VERSION.getQRCodeWidthByVersion(version),
      figures: compose(
        patternFigures,
        formattingFigures,
        versionFigures
      )
    }
    
    // map QR-Code board to matrix
    const boardMatrix = BOARD.getContentMatrix(board)
    
    // map message to bits
    const messageBits = CONVERTER.convertMessageToBinary(message)
    const messageLengthBits = VERSION.getEncodedMessageLengthContent(this.DEFAULT_MODE, version, message.length)

    // compose data bits
    const dataBits = CONTENT_ENCODER.createDataBits([
      MODE.getEncodedModeContent(this.DEFAULT_MODE),
      messageLengthBits,
      CONVERTER.convertBinaryArrayToBitStream(messageBits),
      TERMINATOR,
    ])
    
    // create interleaved bit stream with error correction
    const finalBitStream = CONTENT_ENCODER.getPreparedBitStream(version, errorCorrection, dataBits)
    
    // get path for bit stream
    const contentPath = CONTENT_PATH.getPath(board)
    
    // inject bit stream in QR-Code matrix
    const result = PATH.write(boardMatrix, contentPath, finalBitStream)
    
    // get optimal mask and mask QR-Code
    const mask = MASK_PATTERN.getOptimalMask(board, result)
    const finalContent = MASK_PATTERN.applyMask(board, result, mask)
    
    // update formatting info (mask)
    const updatedFormattingFigures = GRAPHICS_SETUP.addFormattingInfo(version, errorCorrection, mask)
    FIGURE.insertFigures(finalContent, updatedFormattingFigures)
    
    return finalContent
  }

  private static validateMessage(mode: Mode, message: string) {
    if (!VALIDATOR.validateMessageContent(mode, message)) throw UNSUPPORTED_MESSAGE_CONTENT_ERROR
    if (!VALIDATOR.validateMessageLength(mode, message.length)) throw TOO_LONG_MESSAGE_ERROR
  }

  private static normalizeOptions(options: QRCodeConfig): Required<QRCodeConfig> {
    return ({
      message: options.message ?? '',
      minimalErrorCorrection: options.minimalErrorCorrection ?? DEFAULT_ERROR_CORRECTION
    })
  }
}
