# Slices in library

- ```/core``` - Inner logic of QR Code generation. Key class ```QRCode``` has static method ```create``` that accepts configuration and returns ```Matrix<number>``` that represents QR Code

- ```/printers``` - Contains class ```Printer``` that prints QR Code **matrix** in document

- ```/downloaders``` - Contains class ```Downloader``` that downloads printed QR Code in different image formats

- ```/shared``` - Contains shared utils and constants used in different slices