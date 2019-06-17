import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../dist/index.js'),
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
