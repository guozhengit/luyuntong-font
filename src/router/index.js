import Vue from "vue";
import Router from "vue-router";
import { MENU_INDEX } from "@/libs/const";
import Main from "../views/Main.vue";
import Login from "../views/login/loginPage.vue";

import Home from "../views/home/homeIndex";
import User from "../views/user/userIndex";

import jsBill from "../views/bill/jsBill.vue";
import szBill from "../views/bill/szBill.vue";
import tyBill from "../views/bill/tyBill.vue";
import carBill from "../views/bill/carBill.vue";

import Salary from "../views/cost/salary.vue";
import Yxzc from "../views/cost/yxzc.vue";
import Khjs from "../views/cost/khjs.vue";
import Yltj from "../views/cost/yltj.vue";

import wlReport from "../views/report/wlReportIndex.vue";
import tyReport from "../views/report/tyReportIndex.vue";

import City from "../views/bak/city/CityIndex";
import Vehicle from "../views/company/vehicle/VehicleIndex";
import Customer from "../views/bak/customer/CustomerIndex";
import Drive from "../views/company/drive/DriveIndex";
import Employee from "../views/company/employee/EmployeeIndex";
import Department from "../views/bak/department/DepartmentIndex";
import Payment from "../views/bak/payment/PaymentIndex";
import Route from "../views/company/route/RouteIndex";
import Station from "../views/company/station/StationIndex";
import CarTree from "../views/carmanager/CarTree";
import CarRent from "../views/carmanager/CarRent";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login", // 必须项
      name: MENU_INDEX.LOGIN, // 必须项，后面缓存页面需要用到，且这个name是唯一的
      meta: {
        title: "登录",
        hideInMenu: true // 是否在左侧菜单中隐藏，默认为false
      },
      component: Login
    },
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
        // {
        //   path: "/bill",
        //   name: MENU_INDEX.BILL,
        //   meta: { keepAlive: true },
        //   component: Bill
        // },
        {
          path: "/carbill",
          name: MENU_INDEX.CarBILL,
          meta: { keepAlive: true },
          component: carBill
        },
        {
          path: "/tybill",
          name: MENU_INDEX.TYBILL,
          meta: { keepAlive: true },
          component: tyBill
        },
        {
          path: "/szbill",
          name: MENU_INDEX.SZBILL,
          meta: { keepAlive: true },
          component: szBill
        },
        {
          path: "/jsbill",
          name: MENU_INDEX.JSBILL,
          meta: { keepAlive: true },
          component: jsBill
        },
        {
          path: "/salary",
          name: MENU_INDEX.SALARY,
          meta: { keepAlive: true },
          component: Salary
        },
        {
          path: "/yxzc",
          name: MENU_INDEX.YXZC,
          meta: { keepAlive: true },
          component: Yxzc
        },
        {
          path: "/khjs",
          name: MENU_INDEX.KHJS,
          meta: { keepAlive: true },
          component: Khjs
        },
        {
          path: "/yltj",
          name: MENU_INDEX.YLTJ,
          meta: { keepAlive: true },
          component: Yltj
        },
        {
          path: "/wlReport",
          name: MENU_INDEX.WLREPORT,
          meta: { keepAlive: true },
          component: wlReport
        },
        {
          path: "/tyReport",
          name: MENU_INDEX.TYREPORT,
          meta: { keepAlive: true },
          component: tyReport
        },
        {
          path: "/city",
          name: MENU_INDEX.CITY,
          meta: { keepAlive: true },
          component: City
        },
        {
          path: "/customer",
          name: MENU_INDEX.CUSTOMER,
          meta: { keepAlive: true },
          component: Customer
        },
        {
          path: "/drive",
          name: MENU_INDEX.DRIVER,
          meta: { keepAlive: true },
          component: Drive
        },
        {
          path: "/employee",
          name: MENU_INDEX.EMPLOYEE,
          meta: { keepAlive: true },
          component: Employee
        },
        {
          path: "/route",
          name: MENU_INDEX.ROUTE,
          meta: { keepAlive: true },
          component: Route
        },
        {
          path: "/payment",
          name: MENU_INDEX.PAYMENT,
          meta: { keepAlive: true },
          component: Payment
        },
        {
          path: "/station",
          name: MENU_INDEX.STATION,
          meta: { keepAlive: true },
          component: Station
        },
        {
          path: "/vehicle",
          name: MENU_INDEX.VEHICLE,
          meta: { keepAlive: true },
          component: Vehicle
        },
        {
          path: "/department",
          name: MENU_INDEX.DEPARTMENT,
          meta: { keepAlive: true },
          component: Department
        },
        {
              path: "/carmanage",
              name: MENU_INDEX.CARMANAGE,
              meta: { keepAlive: true },
         },
         {
              path: "/cartree",
              name: MENU_INDEX.CARTREE,
              meta: { keepAlive: true },
              component: CarTree
          },
         {
              path: "/carrent",
              name: MENU_INDEX.CARRENT  ,
              meta: { keepAlive: true },
              component: CarRent
          }
      ]
    }
  ]
});
