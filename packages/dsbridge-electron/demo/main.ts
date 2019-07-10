import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import './native-methods';
import { addNativeAsyncMethod, callHandler } from 'dsbridge-electron';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  mainWindow.webContents.loadURL('https://87hz.github.io/dsbridge/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.maximize();

  addNativeAsyncMethod('callWeb', async () => {
    const resJson = await callHandler(mainWindow.webContents, 'append', [
      200,
      50,
      1,
    ]);

    const {
      data: { data },
    } = JSON.parse(resJson);

    return JSON.stringify({ data });
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
