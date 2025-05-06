export interface IDownloader {
  downloadFromCanvas(canvas: HTMLCanvasElement): void
  downloadFromCanvasContainer(container: HTMLElement): void

  downloadFromSVG(svg: SVGSVGElement): void
  downloadFromSVgContainer(container: HTMLElement): void
}
