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
const printer = new Printer({
  lightColor: '#FFFFFF',
  darkColor: '#000000',
})

printer.print(qrMatrix)
```

[See Configuration Options](#configuration-options)

---

## Downloading QR Codes
The `Downloader` class allows you to download QR codes as image files in various formats (e.g., PNG, JPEG, WebP).

### Example:
```typescript
const downloader = new Downloader({
  fileName: 'my-qr-code',
  fileType: fileTypePNG
})

downloader.download(canvasElement)
```

[See Configuration Options](#configuration-options)

---

## Configuration Options

### QRCodeConfig
| Property               | Type                | Description                                   |
|------------------------|---------------------|-----------------------------------------------|
| `message`              | `string`           | The message to encode in the QR code.         |
| `minimalErrorCorrection` | `ErrorCorrection` | (Optional) Error correction level (`L`, `M`, `Q`, `H`). |

### PrinterConfig
| Property                     | Type      | Description                                      |
|------------------------------|-----------|--------------------------------------------------|
| `lightColor`                 | `string`  | The background color of the QR code.            |
| `darkColor`                  | `string`  | The foreground color of the QR code.            |
| `paddingCells`               | `number`  | The padding around the QR code.                 |
| `design`                     | `Design`  | The design pattern for QR code customization.    |
| `resolutionIncreaseCoefficient` | `number` | The resolution scaling factor.                  |

### Downloader Config
| Property      | Type      | Description                                  |
|---------------|-----------|----------------------------------------------|
| `fileName`    | `string`  | The name of the downloaded file.             |
| `fileType`    | `FileType`| The file format (e.g., `png`, `jpeg`, `webp`).|

---

## Exported Constants

### File Types
- `fileTypePNG`
- `fileTypeJPEG`
- `fileTypeWebp`

### Designs (for rendering)
- `designClassic`
- `designCircles`
- `designLiquid`
- `designLiquidOil`
- `designOil`

---
