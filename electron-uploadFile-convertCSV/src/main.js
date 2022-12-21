const {app, BrowserWindow} = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 600,
      height: 500,
      resizable: false,
      maximizable: false,
      icon: __dirname + "/icon.png"
    });

    win.setMenuBarVisibility(false);
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});

  

