import { app, BrowserWindow, Menu } from 'electron'
import path = require('path');
import './evnt/index';
let win: BrowserWindow;
function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 668,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.cjs'),
      nodeIntegration: true,
    },
    minWidth: 1000,
    minHeight: 668,
    titleBarStyle: 'hidden',
    trafficLightPosition: {
      x: 10,
      y: 10
    },
    frame: false
  })
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../index.html'))
  } else {
    win.loadURL('http://localhost:9527')
  }
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'


app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   alert()
    app.quit();
  // }
})

export default ()=>{
  return win
};


