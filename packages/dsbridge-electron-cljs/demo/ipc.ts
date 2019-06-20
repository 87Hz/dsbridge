import { ipcMain } from 'electron';
import { initElectron } from '../dist';

initElectron(ipcMain);

// register('_dsb.hasNativeMethod', (evt: Event, msg: string) => {
//   evt.returnValue = false;
// });
