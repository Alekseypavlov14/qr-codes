# Slices in ```/core```

- ```/encoding``` - Contains mathematical algorithms to encode data for QR Code. Particularly, **Reed-Solomon** and **BCH** algorithms are defined here. They are build on **Polynomials** that are build on **Galois Fields** of different size (2 and 256) which are also defined here.

- ```/configuration``` - Contains QR Code configuration logic (version, mode, error correction level, mask and so on). 

- ```/graphics``` - Contains logic that displays patterns and templates (inserts in qr code **matrix**). **Pattern** is a static figure that depends only on version number. **Template** is a dynamic figure that depends on version number and on content (configuration). **Drawers** are classes that create final figures.

- ```/content``` - Contains logic to insert QR Code message in a matrix.

- ```/shared``` - Contains shared utils and constants.

- ```qr-code.ts``` - Contains class that handles creation of ready QR Codes
