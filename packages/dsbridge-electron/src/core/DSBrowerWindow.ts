import { BrowserWindow, ipcMain } from 'electron';
import { DSBrowser, CallHandlerParams } from '.';
import { getResHandlerName } from './utils';

export class DSBrowserWindow extends BrowserWindow implements DSBrowser {
  callHandler(params: CallHandlerParams) {
    const { handlerName, args, callback } = params;
    this.webContents.send(handlerName, args);

    if (callback) {
      const resHandlerName = getResHandlerName(handlerName);
      ipcMain.once(resHandlerName, callback);
    }
  }
}
