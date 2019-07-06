// import { ipcRenderer } from 'electron';

/** ---------------------------------------------------------
 * init
 */
(() => {
  (window as any)._dsbridge = {
    call: (method: string, arg: string) => {
      console.log(method, arg);
    },
  };
})();
