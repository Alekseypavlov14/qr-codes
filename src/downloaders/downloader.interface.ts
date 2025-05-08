export interface IDownloader {
  download<T extends Element>(element: T): void
  
  downloadFromCanvas(canvas: HTMLCanvasElement): void
  downloadFromCanvasContainer(container: HTMLElement): void

  downloadFromSVG(svg: SVGSVGElement): void
  downloadFromSVgContainer(container: HTMLElement): void
}
