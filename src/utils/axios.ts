import axios, { } from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000,
    withCredentials: true
});

instance.interceptors.response.use((response)=>{
        if(response.status=== 200){
            return response.data.data || response.data;
        }
        return Promise.reject(null);
})

export const httpGet = (url: string, params: any = {}) :Promise<any>=> {
    return instance.request({
        method: 'get',
        params,
        url
    })
}

export const httpPost = (url: string, data: any = {}):Promise<any> =>  {
    return instance.request({
        method: 'post',
        data,
        url
    })
}
