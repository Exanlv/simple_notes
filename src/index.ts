import { app, BrowserWindow } from "electron";
import * as path from 'path';
import { readdirSync } from  'fs';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true
    });

    mainWindow.loadFile(path.join(__dirname, "../index.html"));

    mainWindow.on('closed', () => {
        process.exit();
    })
});
