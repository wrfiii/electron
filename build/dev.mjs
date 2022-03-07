import { createServer, build as viteBuild } from 'vite';
import electron from 'electron';
import { spawn } from 'child_process';

const server = await createServer({
    configFile: './vite.config.ts',
    server: {
        port: 9527
    },
});

let electronProcess = null;


function buildPack({ name, configFile, writeBundle }) {
    return viteBuild({
        name: 'development',
        build: {

        },
        configFile,
        plugins: [{ name, writeBundle }]
    })
}

const viteServer = await server.listen();


const start = async () => {

    await buildPack({
        name: 'electron-builder-preload',
        configFile: 'package/preload/vite.config.ts',
        writeBundle() {
            console.log('preload ....');
        }
    })
    electronProcess && electronProcess.kill();

    await buildPack(
        {
            name: 'electron-builder',
            configFile: 'package/main/vite.config.ts',
            writeBundle() {
                electronProcess = spawn(String(electron), ['.'],)
            }
        }
    )
}





viteServer.watcher.on('change', (path) => {
    if (path.includes('package')) {
        start()
    }
})

start()






