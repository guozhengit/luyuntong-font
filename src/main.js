import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import iView from "iview";
import "./assets/index.less";
import axios from "./libs/axios/index";
import global from "./libs/global/index";
import util from "./libs/util/index";
import "./assets/iconfont/iconfont.css";
// 导入组件库
import vueParticleLine from "vue-particle-line";
import "vue-particle-line/dist/vue-particle-line.css";
// 注册组件库
Vue.use(vueParticleLine);

Vue.use(iView);
Vue.use(axios);
Vue.use(global);
Vue.use(util);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
