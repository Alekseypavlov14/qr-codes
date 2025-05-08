# @oleksii-pavlov/qr-codes

## Overview
This library provides a flexible and powerful solution for generating QR codes, customizing their design, and downloading them as images. It is designed to handle a variety of use cases, such as encoding messages, setting error correction levels, and exporting QR codes in different file formats.

---

## Installation
To install the library, run the following command:

```bash
npm install @oleksii-pavlov/qr-codes
```

---

## Usage

### Importing the Library
```typescript
import { QRCode, Printer, Downloader } from '@oleksii-pavlov/qr-codes'
```

---

## Generating a QR Code
To generate a QR code, use the `QRCode.create` method. It accepts a configuration object with the `message` to encode and an optional `minimalErrorCorrection` parameter.

### Example:
```typescript
const qrMatrix = QRCode.create({
  message: 'Hello, QR Code!',
  minimalErrorCorrection: 'M' // Optional: L, M, Q, H
})

console.log(qrMatrix) // Matrix representation of the QR Code
```

[See Configuration Options](#configuration-options)

---

## Rendering QR Code
You can use the `Printer` class to render the QR code

### Example:
```typescript
const qrMatrix = QRCode.create({
  message: 'Hello, QR Code!',
  minimalErrorCorrection: 'M'
})

const printer = new Printer({
  lightColor: '#FFFFFF',
  darkColor: '#000000',
})

const inject = printer.getInjectorBySelector('#container')
inject(qrMatrix)
```

[See Printer Config Options](#printerconfig) for configuring ``Printer``

[See Injection Options](#injection-options)

---

## Downloading QR Codes
The `Downloader` class allows you to download QR codes as image files in various formats (e.g., PNG, JPEG, WebP).

### Example:
```typescript
const qrMatrix = QRCode.create({
  message: 'Hello, QR Code!',
  minimalErrorCorrection: 'M' // or use ERROR_CORRECTION_M from this package
})

const printer = new Printer({
  lightColor: '#FFFFFF',
  darkColor: '#000000',
  output: 'canvas' // or use canvasEngine from this package
})

const downloader = new Downloader({
  fileName: 'my-qr-code',
  fileType: 'png' // or use fileTypePNG
})

// create a canvas containing QR Code
const canvasElement = printer.print(qrCodeMatrix)

// download canvas as PNG
downloader.download(canvasElement)
```

[See Configuration Options](#configuration-options)

[See Download Options](#download-options)

---

## Configuration Options

### QRCodeConfig
| Property               | Type                | Description                                   |
|------------------------|---------------------|-----------------------------------------------|
| `message`              | `string`           | The message to encode in the QR code.         |
| `minimalErrorCorrection` | `ErrorCorrection` | (Optional) Error correction level (`L`, `M`, `Q`, `H`). |

### Injection options
- `getInjectorBySelector(selector: string)` - returns injection callback by selector (created element will fill container)
- `getInjectorByElement(element: HTMLElement)` - returns injection callback by element (created element will fill container)
- `injectContent<T extends HTMLElement>(container: T, content: QRCodeContent): void` - injects QR Code content to specified container (fills container)
- `injectElement<C extends HTMLElement, E extends Element>(container: C, element: E): void` - injects Graphic Element (Canvas or SVG) to container (fills container)
- `print<T extends Element>(content: QRCodeContent, size?: number): T` - creates Graphic Element (Canvas or SVG) with given size

### PrinterConfig
| Property                     | Type      | Description                                      |
|------------------------------|-----------|--------------------------------------------------|
| `lightColor`                 | `string`  | The background color of the QR code.            |
| `darkColor`                  | `string`  | The foreground color of the QR code.            |
| `output`                     | `EngineToken` | The output mode 
| `paddingCells`               | `number`  | The padding around the QR code.                 |
| `design`                     | `DesignToken`  | The design pattern for QR code customization.    |
| `resolutionIncreaseCoefficient` | `number` | The resolution scaling factor.                  |

### Downloader Config
| Property      | Type      | Description                                  |
|---------------|-----------|----------------------------------------------|
| `fileName`    | `string`  | The name of the downloaded file.             |
| `fileType`    | `FileType`| The file format (e.g., `png`, `jpeg`, `webp`).|

### Download options
- `download<T extends Element>(element: T): void` - downloads image from given element (considering fileType)
- `downloadFromCanvas(canvas: HTMLCanvasElement): void` - downloads image from canvas
- `downloadFromCanvasContainer(container: HTMLElement): void` - downloads image from element that contains canvas
- `downloadFromSVG(svg: SVGSVGElement): void` - downloads image from svg
- `downloadFromSVGContainer(container: HTMLElement): void` - downloads image from element that contains svg

---

## Exported Constants

### File Types
- `fileTypePNG`
- `fileTypeJPEG`
- `fileTypeWebp`
- `fileTypeSVG`

### Designs (for rendering)
- `designClassic`
- `designCircles`
- `designLiquid`
- `designLiquidOil`
- `designOil`

### EngineToken
- `canvasEngine`
- `svgEngine`

### Error Correction Levels
- `ERROR_CORRECTION_L`
- `ERROR_CORRECTION_M`
- `ERROR_CORRECTION_Q`
- `ERROR_CORRECTION_H`
