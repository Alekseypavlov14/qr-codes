export interface IDownloader {
  downloadFromCanvas(canvas: HTMLCanvasElement): void
  downloadFromSVG(svg: SVGSVGElement): void
}
