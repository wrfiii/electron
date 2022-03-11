
export const netHttp = (method:'get'|'post',path:string,data:any)=>{
    return new Promise((resolve,reject)=>{
        window.bridge.net.request({
            method,
            path,
            port:3000,
            hostname:'localhost',
        })
    })
}
