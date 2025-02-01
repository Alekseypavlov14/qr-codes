import { max, min } from './mathematics'

export function clone<T>(array: T[]): T[] {
  return [...array]
}

export function reverse<T>(array: T[]): T[] {
  return clone(array).reverse()
}

export function cut<T>(array: T[], sliceLengths: number[]): T[][] {
  let restArray = clone(array)
  
  return new Array(sliceLengths.length).fill(null).map<T[]>((_, index) => {
    const templateLength = Math.min(sliceLengths[index], restArray.length)

    const sliceTemplate = new Array(templateLength).fill(null)
    const slice = sliceTemplate.map<T>((_, index) => restArray[index])
    
    restArray = removeFirstElements(restArray, templateLength)

    return slice
  })
}

export function cutByLength<T>(array: T[], length: number): T[][] {
  const slicesAmount = Math.ceil(array.length / length)
  const slicesLengths = new Array(slicesAmount).fill(length)

  return cut(array, slicesLengths)
}

export function loop<T>(array: T[], length: number) {
  return new Array(length).fill(null).map((_, index) => array[index % array.length])
}

export function removeFirstElements<T>(array: T[], amount: number) {
  return clone(array).slice(amount)
}

export function removeLastElements<T>(array: T[], amount: number) {
  return clone(array).slice(0, amount)
}

export function compose<T>(...arrays: T[][]): T[] {
  return arrays.flat()
}

export function getMinIndex(array: number[]) {
  const minItem = min(array)
  return array.findIndex(value => value === minItem)
}

export function getMaxIndex(array: number[]) {
  const maxItem = max(array)
  return array.findIndex(value => value === maxItem) 
}
