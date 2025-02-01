export function isEven(value: number) {
  return value % 2 === 0 
}

export function min(values: number[]): number {
  return Math.min(...values)
}

export function max(values: number[]): number {
  return Math.max(...values)
}
