import { ipcMain } from "electron";
import { notificationMsg } from './NotificationMsg';

import { resizeWindow } from './resize';

import { openLoginView ,closeLoginView } from './openLoginView'

ipcMain.on('notificationMsg', notificationMsg);

ipcMain.on('maximize', resizeWindow);

ipcMain.on('openLoginView', openLoginView);

ipcMain.on('closeLoginView',closeLoginView);




