import { BrowserWindow, app, ipcRenderer } from 'electron'

import getWindow from '../main';
import path = require('path')


let win: BrowserWindow = null;

export const openLoginView = () => {
    if (win) return;
    win = new BrowserWindow({
        width: 328,
        height: 444,
        titleBarStyle: 'hidden',
        frame: false,
        trafficLightPosition: {
            x: -100,
            y: -100
        },
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.cjs'),
            nodeIntegration: true,
        },
        parent: getWindow()
    });
    win.loadURL('http://localhost:9527/#login');
    win.show();
    // win.webContents.openDevTools();

    win.addListener('close', () => {
        win = null;
    })
}

export const closeLoginView = ()=>{
    // win = null;
    win.close();
    win = null;
}

