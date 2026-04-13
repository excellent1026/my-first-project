import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 新增：导入路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router) // 新增：使用路由

app.mount('#app')