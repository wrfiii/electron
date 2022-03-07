// import { defineConfig } from "vite"
import vue from '@vitejs/plugin-vue';
import path from "path";
export default ({
    base:'./',
    server: {
        port: 9527
    },
    plugins:[vue()],
    resolve:{
        alias:{
            "@/":path.join(path.resolve(),'./src/')
        }
    }
})