const { ipcRenderer } = require('electron');
const { initWeb } = require('../dist');

initWeb(ipcRenderer);
