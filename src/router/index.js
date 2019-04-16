import Vue from "vue";
import Router from "vue-router";
import { MENU_INDEX } from "@/libs/const";

Vue.use(Router);

import Main from "../views/Main.vue";

import Home from "../views/home/index";
import User from "../views/user/index";
import Log from "../views/log/index";

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [
        {
          path: "/home",
          name: MENU_INDEX.HOME,
          meta: { keepAlive: false },
          component: Home
        },
        {
          path: "/user",
          name: MENU_INDEX.USER,
          meta: { keepAlive: true },
          component: User
        },
        {
          path: "/log",
          name: MENU_INDEX.LOG,
          meta: { keepAlive: true },
          component: Log
        }
      ]
    }
  ]
});
