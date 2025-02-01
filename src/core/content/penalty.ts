import { PERCENTS } from '../shared/constants'
import { Matrix } from '../shared/types/matrix'

export class PenaltyScore {
  // For test 1
  private readonly CONSECUTIVE_PENALTY = 3
  private readonly CONSECUTIVE_LIMIT = 5
  // For test 2
  private readonly BLOCK_PENALTY = 3
  // For test 3
  private readonly FINGER_PATTERN_PENALTY = 40
  private readonly FINGER_PATTERN = [1, 0, 1, 1, 1, 0, 1]
  // For test 4
  private readonly PROPORTION_BLACK_WHITE_MODULES_COEFFICIENT = 10

  // Compute total penalty score
  compute(matrix: Matrix<number>): number {
    const score =
      this.testConsecutiveModules(matrix) +
      this.testBlockPatterns(matrix) +
      this.testFinderPatterns(matrix) +
      this.testBlackWhiteProportion(matrix)

    return score
  }

  // Test 1: Consecutive modules of the same color (row or column)
  private testConsecutiveModules(matrix: Matrix<number>): number {
    let score = 0

    // Check rows
    matrix.forEach(row => {
      let consecutive = 1
      
      for (let index = 1; index < row.length; index++) {

        if (row[index] === row[index - 1]) {
          consecutive++ 
        }
        else {
          if (consecutive >= this.CONSECUTIVE_LIMIT) {
            score += this.CONSECUTIVE_PENALTY + (consecutive - this.CONSECUTIVE_LIMIT)
          }
          
          consecutive = 1
        }
      }

      if (consecutive >= this.CONSECUTIVE_LIMIT) {
        score += this.CONSECUTIVE_PENALTY + (consecutive - this.CONSECUTIVE_LIMIT)
      }
    })

    // Check columns
    matrix[0].forEach((_, columnIndex) => {
      let consecutive = 1

      for (let rowIndex = 1; rowIndex < matrix.length; rowIndex++) {
        if (matrix[rowIndex][columnIndex] === matrix[rowIndex - 1][columnIndex]) {
          consecutive++
        } 
        else {
          if (consecutive >= this.CONSECUTIVE_LIMIT) {
            score += this.CONSECUTIVE_PENALTY + (consecutive - this.CONSECUTIVE_LIMIT)
          }

          consecutive = 1
        }
      }

      if (consecutive >= this.CONSECUTIVE_LIMIT) {
        score += this.CONSECUTIVE_PENALTY + (consecutive - this.CONSECUTIVE_LIMIT)
      }
    })

    return score
  }

  // Test 2: 2x2 blocks of the same color
  private testBlockPatterns(matrix: Matrix<number>): number {
    let score = 0

    for (let row = 0; row < matrix.length - 1; row++) {
      for (let col = 0; col < matrix[row].length - 1; col++) {
        if (
          matrix[row][col] === matrix[row][col + 1] && // compare with right
          matrix[row][col] === matrix[row + 1][col] && // compare with bottom
          matrix[row][col] === matrix[row + 1][col + 1] // compare with bottom right
        ) {
          score += this.BLOCK_PENALTY
        }
      }
    }

    return score
  }

  // Test 3: Finder-like patterns in rows and columns
  private testFinderPatterns(matrix: Matrix<number>): number {
    let score = 0

    // Check rows
    for (const row of matrix) {
      for (let i = 0; i < row.length - this.FINGER_PATTERN.length + 1; i++) {
        if (this.matchesFingerPattern(row, i)) {
          score += this.FINGER_PATTERN_PENALTY
        }
      }
    }

    // Check columns
    for (let col = 0; col < matrix[0].length; col++) {
      for (let row = 0; row < matrix.length - this.FINGER_PATTERN.length + 1; row++) {
        const columnSlice = matrix.slice(row, row + this.FINGER_PATTERN.length).map(r => r[col])

        if (this.matchesFingerPattern(columnSlice, 0)) {
          score += this.FINGER_PATTERN_PENALTY
        }
      }
    }

    return score
  }
  private matchesFingerPattern(line: number[], start: number) {
    if (start + this.FINGER_PATTERN.length > line.length) return false

    return this.FINGER_PATTERN.every((value, index) => line[start + index] === value)
  }

  // Test 4: Proportion of black modules
  private testBlackWhiteProportion(matrix: Matrix<number>): number {
    const totalModules = matrix.length * matrix[0].length
    const blackModules = matrix.flat().reduce((sum, module) => sum + module, 0)

    const blackPercentage = (blackModules / totalModules) * PERCENTS
    const deviation = Math.abs(blackPercentage - PERCENTS / 2) / 5

    return Math.floor(deviation) * this.PROPORTION_BLACK_WHITE_MODULES_COEFFICIENT
  }
}

export const PENALTY = new PenaltyScore()
