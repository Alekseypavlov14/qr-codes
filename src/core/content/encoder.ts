import { compose, cut, cutByLength, loop } from '../shared/utils/array'
import { ErrorCorrection, Version } from '../configuration/types'
import { POLYNOMIALS_GF_256 } from '../encoding/polynomials'
import { ERROR_CORRECTION } from '../configuration/error-correction'
import { REED_SOLOMON } from '../encoding/reed-solomon'
import { BYTE_LENGTH } from '../shared/constants'
import { CONVERTER } from '../shared/converter'
import { VERSION } from '../configuration/version'
import { Binary } from '../shared/types/binary'
import { max } from '../shared/utils/mathematics'

export class ContentEncoder {
  private readonly CONTENT_PAD_BYTES: number[] = [ 17, 236 ]

  getPreparedBitStream(version: Version, errorCorrectionLevel: ErrorCorrection, bitStream: Binary): Binary {
    const dataCodewords = this.getDataCodewords(version, errorCorrectionLevel, bitStream)

    const groupsOfBlocksOfDataCodewords = this.splitDataCodewords(version, errorCorrectionLevel, dataCodewords)
    const errorCorrectionPerBlock = ERROR_CORRECTION.getErrorCorrectionCodewordsPerBlock(version, errorCorrectionLevel)

    const groupsOfBlocksOfErrorCorrectionCodewords = this.getErrorCorrectionCodewords(groupsOfBlocksOfDataCodewords, errorCorrectionPerBlock)

    const interleavedCodewordsStream = this.createInterleavedCodewordsStream(groupsOfBlocksOfDataCodewords, groupsOfBlocksOfErrorCorrectionCodewords)
    const interleavedCodewordsBitStream = CONVERTER.convertBinaryArrayToBitStream(interleavedCodewordsStream)

    return interleavedCodewordsBitStream
  }

  createInterleavedCodewordsStream(groupsOfBlocksOfDataCodewords: Binary[][][], groupsOfBlocksOfErrorCorrectionCodewords: Binary[][][]): Binary[] {
    const interleavedDataBlocks = this.interleaveGroupsOfBlocks(groupsOfBlocksOfDataCodewords)
    const interleavedErrorCorrectionCodewords = this.interleaveGroupsOfBlocks(groupsOfBlocksOfErrorCorrectionCodewords)
  
    return compose(interleavedDataBlocks, interleavedErrorCorrectionCodewords)
  }

  splitDataCodewords(version: Version, errorCorrectionLevel: ErrorCorrection, codewords: Binary[]): Binary[][][] {
    const contentConfig = VERSION.getContentConfig(version, errorCorrectionLevel)

    const blocksPerGroup = contentConfig.groupContent.map(group => group.blocks * group.dataCodewordsPerBlock)
    const groupsOfCodewords = cut(codewords, blocksPerGroup)

    const groupsOfBlocksOfCodewords = groupsOfCodewords.map((group, index) => {
      return cutByLength(group, contentConfig.groupContent[index].dataCodewordsPerBlock)
    })

    return groupsOfBlocksOfCodewords
  }
  getErrorCorrectionCodewords(groupsOfBlocks: Binary[][][], errorCorrectionCodewordsAmount: number): Binary[][][] {
    return groupsOfBlocks.map(group => {
      return group.map(block => {
        const blockPolynomial = block.map(binary => CONVERTER.convertBinaryToDecimal(binary))
        const shiftedBlock = POLYNOMIALS_GF_256.shiftLeft(blockPolynomial, errorCorrectionCodewordsAmount)

        const errorCorrectionPolynomial = REED_SOLOMON.getErrorCorrectionPolynomial(shiftedBlock, errorCorrectionCodewordsAmount)
        const errorCorrectionCodewords = errorCorrectionPolynomial.map(value => CONVERTER.convertDecimalToBinary(value))

        return errorCorrectionCodewords
      })
    })
  }
  
  getDataCodewords(version: Version, errorCorrectionLevel: ErrorCorrection, dataBits: Binary): Binary[] {
    const contentConfig = VERSION.getContentConfig(version, errorCorrectionLevel)
    const paddedDataBits = this.addPaddingDataBits(dataBits, contentConfig.dataCodewordsAmount)

    const paddedDataBitsArray = CONVERTER.convertBinaryToArray(paddedDataBits)
    const dataCodewordsArrays = cutByLength(paddedDataBitsArray, BYTE_LENGTH)

    const dataCodewords = dataCodewordsArrays.map<Binary>(array => CONVERTER.convertArrayToBinary(array))
  
    return dataCodewords
  }
  createDataBits(binaryParts: Binary[]): Binary {
    return CONVERTER.convertBinaryArrayToBitStream(binaryParts)
  }

  private interleaveGroupsOfBlocks(groupsOfBlocks: Binary[][][]): Binary[] {
    const maxBlocksAmountPerGroup = max(groupsOfBlocks.flat().map(group => group.length))

    const interleavedBlocks = new Array(maxBlocksAmountPerGroup).fill(null)
      .map((_, index) => {
        return groupsOfBlocks.map(group => {
          return group.map(blocks => blocks[index])
        }).filter(Boolean)
      }).flat(2)

    return interleavedBlocks
  }

  private addPaddingDataBits(dataBits: Binary, codewordsAmount: number): Binary {
    const requiredLength = codewordsAmount * BYTE_LENGTH
    const padBitsLength = requiredLength - dataBits.length

    if (padBitsLength <= 0) return dataBits

    const paddingBits = this.getContentPaddingBits()
    const paddingBitsArray = CONVERTER.convertBinaryToArray(paddingBits)

    const dataPaddingArray = loop(paddingBitsArray, padBitsLength)
    const dataPaddingBits = CONVERTER.convertArrayToBinary(dataPaddingArray)

    const paddedData = `${dataBits}${dataPaddingBits}`

    return paddedData
  }
  private getContentPaddingBits() {
    const paddingBits = this.CONTENT_PAD_BYTES.map(byte => CONVERTER.convertDecimalToBinary(byte))
    const paddingBitStream = CONVERTER.convertBinaryArrayToBitStream(paddingBits)
    return paddingBitStream
  }
}

export const CONTENT_ENCODER = new ContentEncoder()
