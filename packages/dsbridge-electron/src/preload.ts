import { ipcRenderer } from 'electron';

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
      if (!_dscbstub) {
        const ret = ipcRenderer.sendSync(method, argJson);
        return ret;
      }

      // ----------------------------------------------------
      // async
      const retChannel = `${method}-${_dscbstub}`;
      ipcRenderer.once(retChannel, (_event: any, ret: any) => {
        global[_dscbstub](ret);
      });
      ipcRenderer.send(method, argJson);
    },
  };
})();
