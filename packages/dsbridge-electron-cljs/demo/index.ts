import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import './ipc';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  mainWindow.webContents.loadURL('https://87hz.github.io/dsbridge/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.maximize();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
