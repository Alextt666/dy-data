import { createApp } from "vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import registerSvgIcon from "./icons";
import { plugin as vueTyped } from 'vue3-typed.js';



const app = createApp(App);

app.use(vueTyped);
app.use(ElementPlus);
app.use(router);

registerSvgIcon(app);

//整个应用支持路由。
app.mount("#app");
