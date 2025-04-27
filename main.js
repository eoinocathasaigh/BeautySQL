// main.js
const { app: electronApp, BrowserWindow } = require('electron');
const expressApp = require('./index');      // your Express app
let expressServer, mainWindow;

//Various methods for handling opening and closing the express server and the electron app
async function startExpress() {
  return new Promise(resolve => {
    expressServer = expressApp.listen(4000, () => {
      console.log('Express listening on port 4000');
      resolve();
    });
  });
}

//Shutting down the express server cleanly
//This is important to avoid port conflicts when restarting the app
function stopExpress() {
  if (expressServer) expressServer.close();
}

//Function to create the main window of the Electron app
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
