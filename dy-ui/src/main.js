import { createApp } from "vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import registerSvgIcon from "./icons";

const app = createApp(App);
app.use(ElementPlus);
app.use(router);

registerSvgIcon(app);

//整个应用支持路由。
app.mount("#app");
