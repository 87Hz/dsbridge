# DSBridge-Electron

## DSBriget for Electron

### global variables that DSBridge-JS relies on

- \_dsbridge: it should have a `call` method (method:string, arg:string)

- \_dsaf: async registry, func -> root, obj -> .obs

- \_dsf: sync registry, func -> root, obj -> .obs

- \_dsInit: boolean, indicating whether initialized or not

- dscb: number, increase per callback added
