import { ipcRenderer } from 'electron';

export const call = (method: string, arg: object) => {
  console.log(method, arg);
  ipcRenderer.send(method, arg);
};
