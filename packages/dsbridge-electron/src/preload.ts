import { ipcRenderer } from 'electron';
import { IpcEvent, CallHandlerInfo } from './';

const global: any = window;

/** ---------------------------------------------------------
 * init
 */
(() => {
  global['_dsbridge'] = {
    call: (method: string, argJson: string) => {
      const { _dscbstub } = JSON.parse(argJson);

      // ----------------------------------------------------
      // sync
      if (!_dscbstub) return ipcRenderer.sendSync(method, argJson);

      // ----------------------------------------------------
      // async
      const retChannel = `${method}-${_dscbstub}`;
      ipcRenderer.once(retChannel, (_event: IpcEvent, msg: string) => {
        global[_dscbstub](msg);
      });
      ipcRenderer.send(method, argJson);
    },
  };
})();

/** ---------------------------------------------------------
 * _handleMessageFromNative
 */
ipcRenderer.on(
  '_handleMessageFromNative',
  (_event: IpcEvent, info: CallHandlerInfo) =>
    global['_handleMessageFromNative'](info)
);
