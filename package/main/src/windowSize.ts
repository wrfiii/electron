import { ipcMain, Notification, BrowserWindow } from 'electron'


export default (win: BrowserWindow) => {
    let isMaxSize = false;

    ipcMain.on('maximize', (event, dataObj) => {
        isMaxSize = !isMaxSize;
        if (isMaxSize) {
            win.maximize()
        }
        else {
            win.unmaximize()
        }
    })
}