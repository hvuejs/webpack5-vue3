import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
import App from './App.vue' // 引入 APP 页面组建
import Router from "./router"
import "@/assets/css/reset.css";
const app = createApp(App) // 通过 createApp 初始化 app
app.use(Router)
app.mount('#root') // 将页面挂载到 root 节点
