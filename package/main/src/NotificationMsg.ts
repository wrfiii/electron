
import { ipcMain ,Notification} from 'electron'
const fs = require('fs')
const { dialog } = require('electron')

ipcMain.on('NotificationMsg', (event, dataObj) => {
    const { title, body, cb } = JSON.parse(dataObj);
    // console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
    // event.reply('asynchronous-reply', 'pong')

    // setTimeout(() => {
    new Notification({title:'卧槽',body}).show()
        
    // }, 10000);

})




