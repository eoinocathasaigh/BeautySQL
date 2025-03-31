const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;
let serverProcess;

app.whenReady().then(() => {
    // Start the Express server from index.js
    serverProcess = exec('node index.js', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error starting server: ${err}`);
            return;
        }
        console.log(`Server Output: ${stdout}`);
        console.error(`Server Errors: ${stderr}`);
    });

    // Create the Electron window
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Wait for the server to start, then load the app
    setTimeout(() => {
        mainWindow.loadURL('http://localhost:3000');
    }, 3000);

    mainWindow.on('closed', () => {
        mainWindow = null;
        if (serverProcess) serverProcess.kill(); // Kill Express when Electron closes
    });
});

app.on('window-all-closed', () => {
    if (serverProcess) serverProcess.kill(); // Ensure server stops
    if (process.platform !== 'darwin') app.quit();
});
