const { ipcMain } = require('electron');
const { initElectron, register } = require('../dist');

initElectron(ipcMain);

register('_dsb.hasNativeMethod', (evt: Event, msg: string) => {
  evt.returnValue = false;
});
