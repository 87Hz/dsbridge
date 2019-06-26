const { ipcMain } = require('electron');
const { initElectron, addJavascriptObject } = require('../dist');

initElectron(ipcMain);

addJavascriptObject(
  {
    sync: (evt: any, args: string) => {
      const { data } = JSON.parse(args);
      evt.returnValue = JSON.stringify({ data });
    },

    async: () => {},
  },
  'hello'
);

addJavascriptObject(
  {
    async: (evt: any, args: string) => {
      const { data, _dscbstub } = JSON.parse(args);
      evt.reply(_dscbstub, JSON.stringify({ data }));
    },
  },
  'helloAsync'
);
