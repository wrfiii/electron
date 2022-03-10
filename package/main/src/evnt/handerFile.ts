import fs = require('fs');

export const readDir: (path: string) => Promise<boolean|string[]>  = async (path) => {
    return new Promise(res => {
        fs.readdir(path, (err, files) => {
            if (err) {
                fs.mkdir(path, (err: any) => {
                    if (err) {
                        res(false);
                        throw err;
                    }
                })
                return 
            }
            res(files)
        })
    })
}



export const readFileFn: (path: string) => Promise<boolean> = async (path) => {
    return new Promise(res => {
        fs.readFile(path, (err, data) => {
            if (err) {
                res(false);
                return
            };
            res(true)
        })
    })
}

