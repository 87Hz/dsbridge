const { ipcMain } = require('electron');
const { initElectron, register } = require('../dist');

initElectron(ipcMain);

register('hello', (evt: any, arg: string) => {
  evt.returnValue = 'how are you';
});
