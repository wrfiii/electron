import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import path from "path";
export default defineConfig({
    base:'./',
    server: {
        port: 9527
    },
    plugins:[vue()],
    resolve:{
        alias:{
            "@/":path.join(path.resolve(),'src/')
        }
    },
    css:{
        preprocessorOptions:{
            scss:{
                additionalData:"@import 'src/assets/css/var.scss';@import 'src/assets/css/iconfont.css';"
            }
        }
    }
    
})