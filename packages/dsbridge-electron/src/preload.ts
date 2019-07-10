import { ipcRenderer } from 'electron';
import { IpcEvent } from './';

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
      ipcRenderer.once(retChannel, (_event: IpcEvent, ret: string) => {
        global[_dscbstub](ret);
      });
      ipcRenderer.send(method, argJson);
    },
  };
})();
