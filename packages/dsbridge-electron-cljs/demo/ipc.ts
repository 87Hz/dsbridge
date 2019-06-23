const { ipcMain } = require('electron');
const { initElectron, addJavascriptObject } = require('../dist');

initElectron(ipcMain);

// addJavascriptObject(
//   {
//     sync() {
//       return 'world';
//     },
//     async(cb: Function) {
//       cb('world');
//     },
//   },
//   'hello'
// );
