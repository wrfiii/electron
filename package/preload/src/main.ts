import fs from 'fs'
import { contextBridge, ipcRenderer ,net } from 'electron';

contextBridge.exposeInMainWorld('fs', fs)
contextBridge.exposeInMainWorld('net', net)
contextBridge.exposeInMainWorld('ipcRenderer', {...ipcRenderer,on:ipcRenderer.on});