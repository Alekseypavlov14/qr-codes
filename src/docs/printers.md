```/printers``` slice contains ```printer.ts``` file where QR Code printing (displaying) logic is defined.

There are several designs for QR Code that are listed in ```/printers/designs``` directory.

There are several implemented output modes built on different engines. ```Engine``` is a class that defines methods to draw basic graphics (geometric figures) and stores drawing context in its private field ```context```. 

```Drawer``` class built on ```Engine``` instance contains reusable methods to work with graphics.

```DesignSetup``` is built on a ```drawer``` instance. DesignSetup prints different styles of QR Codes depending on set design.

```Processes``` encapsulate the whole process of context creating, filling and returning ready-to-use element.
