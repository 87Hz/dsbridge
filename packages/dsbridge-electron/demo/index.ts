import { app } from 'electron';
import { join } from 'path';
import { initIpc } from './ipc';
import { DSBrowserWindow } from '../src/core/DSBrowerWindow';

const createWindow = () => {
  const mainWindow = new DSBrowserWindow({
    webPreferences: {
      preload: join(__dirname, '../dist/index.js'),
    },
  });

  mainWindow.webContents.loadURL('http://localhost:8080');
  mainWindow.webContents.openDevTools();
  mainWindow.maximize();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

initIpc();
