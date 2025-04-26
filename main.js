// main.js
const { app: electronApp, BrowserWindow } = require('electron');
const expressApp = require('./index');      // your Express app
let expressServer, mainWindow;

async function startExpress() {
  return new Promise(resolve => {
    expressServer = expressApp.listen(4000, () => {
      console.log('Express listening on port 4000');
      resolve();
    });
  });
}

function stopExpress() {
  if (expressServer) expressServer.close();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200, height: 800,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  mainWindow.loadURL('http://localhost:4000');
  mainWindow.on('closed', () => { mainWindow = null; });
}

electronApp.whenReady().then(async () => {
  await startExpress();   // start your server
  createWindow();         // then open the UI
});

electronApp.on('window-all-closed', () => {
  stopExpress();          // shut down server cleanly
  if (process.platform !== 'darwin') electronApp.quit();
});

electronApp.on('activate', () => {
  if (!mainWindow) createWindow();
});
