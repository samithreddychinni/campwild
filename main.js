const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'icon.ico'), // Optional: add your custom icon here
    webPreferences: {
      contextIsolation: true
    }
  });

  win.loadURL('https://campwild.vercel.app');

  win.setMenuBarVisibility(false); // Optional: hide the menu bar
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
