import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus"
import Vant from 'vant';
import 'vant/lib/index.css';
import 'element-plus/dist/index.css'
import router from './router/index'

const app = createApp(App)
app.use(ElementPlus)
app.use(Vant)
app.use(router)
app.mount('#app')

