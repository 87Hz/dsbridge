import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { initIpc } from './ipc';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: join(__dirname, '../dist/web/preload.js'),
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
