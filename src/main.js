import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import iView from "iview";
import "./style/index.less";
import axios from "./libs/axios";
import global from "./libs/global";
import util from "./libs/util";

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
