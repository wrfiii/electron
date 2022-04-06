import { forMateCommentTime } from "./formatTime";


export interface Comment {
    content: string
    time: string
    avatarUrl: string
    userId: number
    nickname: string
    likedCount: number
}

export const filterSongParams = (item: any) => {
    return {
        name: item.name,
        songers: item.ar.map((v: any) => {
            return {
                name: v.name,
                id: v.id
            }
        }),
        alName: item.al.name,
        id: item.id,
        dt: item.dt,
        picUrl: item.al.picUrl,
        tns: item.tns,
        mv: item.mv
    }
}


export const filterMomment = (item: any) => {
    return {
        content: item.content,
        time: forMateCommentTime(item.time),
        avatarUrl: item.user.avatarUrl,
        userId: item.user.userId,
        nickname: item.user.nickname,
        likedCount: item.likedCount || 0,
        beReplied: item.beReplied.map((v: any) => {
            return {
                content: v.content,
                nickname: v.user.nickname,
                userId: v.user.userId
            }
        })
    }
}