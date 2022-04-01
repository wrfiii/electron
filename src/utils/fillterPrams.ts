export const firterSongParams = (item: any) => {
    
    return {
        name: item.name,
        songers: item.ar.map((v:any) => {
            return {
                name: v.name,
                id: v.id
            }
        }),
        alName: item.al.name,
        id: item.id,
        dt: item.dt,
        picUrl: item.al.picUrl,
        tns:item.tns,
        mv:item.mv
    }
}