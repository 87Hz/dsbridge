const { ipcRenderer } = require('electron');
const { initWeb } = require('../dist');

initWeb(window, ipcRenderer);
