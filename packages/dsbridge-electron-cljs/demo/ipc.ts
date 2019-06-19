import { ipcMain } from 'electron';
import { forEachObjIndexed } from 'ramda';

const syncIpcHandlers = {
  'sync-msg': (event: any, arg: any) => {
    console.log(arg);
  },
};

const asyncIpcHandlers = {
  'async-msg': (event: any, arg: any) => {
    console.log(arg);
  },
};

const registerIpcHandlers = forEachObjIndexed((listener, channel) => {
  ipcMain.on(channel, listener);
});

export const initIpc = () => {
  ipcMain.on('_dsb.hasNativeMethod', (event: string, arg: string) => {
    const { data } = JSON.parse(arg);
    console.log('here', data);
  });

  registerIpcHandlers(syncIpcHandlers);
  registerIpcHandlers(asyncIpcHandlers);
};
