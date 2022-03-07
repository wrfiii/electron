import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import routes from './router/index';

import App from './App.vue';
import './index.css'

const router = createRouter({ routes, history: createWebHashHistory() })



createApp(App).use(router).mount('#app')