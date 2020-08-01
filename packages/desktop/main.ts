import {app, BrowserWindow } from 'electron';

let win;

const startApp = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('./app/renderer/index.html')

    win.webContents.openDevTools();
}

app.whenReady()
    .then(startApp);

app.on('window-all-closed', () => {
    app.quit()
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length===0){
        startApp()
    }
})