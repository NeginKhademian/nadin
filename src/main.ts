import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import Antd from "ant-design-vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);

app.config.globalProperties.$antDirection = i18n.global.t("direction");

app.use(Antd);
app.use(i18n);
app.use(router);
app.use(store);

app.mount("#app");
