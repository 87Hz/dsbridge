import { ipcRenderer, IpcRendererEvent } from 'electron';
import { F, pathOr } from 'ramda';

import { CallHandlerInfo } from './';

const global: any = window;

/** ---------------------------------------------------------
 * init
 */
(() => {
  global['_dsbridge'] = {
    call: (method: string, argsJson: string) => {
      const { _dscbstub } = JSON.parse(argsJson);

      // ----------------------------------------------------
      // sync
      if (!_dscbstub) return ipcRenderer.sendSync(method, argsJson);

      // ----------------------------------------------------
      // async
      const retChannel = `${method}-${_dscbstub}`;
      ipcRenderer.once(retChannel, (_event: IpcRendererEvent, msg: string) => {
        global[_dscbstub](msg);
      });
      ipcRenderer.send(method, argsJson);
    },
  };
})();

/** ---------------------------------------------------------
 * _handleMessageFromNative
 */
ipcRenderer.on(
  '_handleMessageFromNative',
  (_event: IpcRendererEvent, info: CallHandlerInfo) =>
    global['_handleMessageFromNative'](info)
);

/** ---------------------------------------------------------
 * _hasJavascriptMethod
 */
ipcRenderer.on(
  '_hasJavascriptMethod',
  (event: IpcRendererEvent, method: string) => {
    const checkFn = pathOr<(method: string) => boolean>(
      F,
      ['_dsf', '_hasJavascriptMethod'],
      global
    );

    const retChannel = `_hasJavascriptMethod-${method}`;
    const exists = checkFn(method);

    event.sender.send(retChannel, exists);
  }
);
