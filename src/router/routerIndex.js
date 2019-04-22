import Vue from "vue";
import Router from "vue-router";
import { MENU_INDEX } from "@/libs/const";

Vue.use(Router);

import Main from "../views/Main.vue";

import Home from "../views/home/homeIndex";
import User from "../views/user/userIndex";
import Log from "../views/log/logIndex";
import Bill from "../views/bill/billIndex";
import Physical from "../views/physical/physicalIndex";
import Cost from "../views/cost/costIndex";
import Report from "../views/report/reportIndex";

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
                meta: {keepAlive: false},
                component: Home
            },
            {
                path: "/user",
                name: MENU_INDEX.USER,
                meta: {keepAlive: true},
                component: User
            },
            {
                path: "/bill",
                name: MENU_INDEX.BILL,
                meta: {keepAlive: true},
                component: Bill
            },
            {
                path: "/physcal",
                name: MENU_INDEX.PHYSICAL,
                meta: {keepAlive: true},
                component: Physical
            },
            {
                path: "/cost",
                name: MENU_INDEX.COST,
                meta: {keepAlive: true},
                component: Cost
            },
            {
                path: "/report",
                name: MENU_INDEX.REPORT,
                meta: {keepAlive: true},
                component: Report
            },
            {
                path: "/log",
                name: MENU_INDEX.LOG,
                meta: {keepAlive: true},
                component: Log
            }
        ]
    }
  ]
});
