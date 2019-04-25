import Vue from "vue";
import Router from "vue-router";
import { MENU_INDEX } from "@/libs/const";

Vue.use(Router);

import Main from "../views/Main.vue";
import Login from "../views/login/LoginPage.vue";

import Home from "../views/home/homeIndex";
import User from "../views/user/userIndex";
import Log from "../views/log/logIndex";
import Bill from "../views/bill/billIndex";
import Physical from "../views/physical/physicalIndex";
import Cost from "../views/cost/costIndex";
import Report from "../views/report/reportIndex";
import City from "../views/city/CityIndex";
import Goods from "../views/goods/GoodsIndex";
import Vehicle from "../views/vehicle/VehicleIndex";
import Customer from "../views/customer/CustomerIndex";
import Drive from "../views/drive/DriveIndex";
import Employee from "../views/employee/EmployeeIndex";
import Department from "../views/department/DepartmentIndex";
import Authority from "../views/authority/AuthorityIndex";
import Payment from "../views/payment/PaymentIndex";
import Route from "../views/route/RouteIndex";
import Station from "../views/station/StationIndex";

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
                path: "/login",
                name: MENU_INDEX.LOGIN,
                meta: {keepAlive: false},
                component: Login
            },
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
                path: "/city",
                name: MENU_INDEX.CITY,
                meta: {keepAlive: true},
                component: City
            },
            {
                path: "/customer",
                name: MENU_INDEX.CUSTOMER,
                meta: {keepAlive: true},
                component: Customer
            },
            {
                path: "/drive",
                name: MENU_INDEX.DRIVER,
                meta: {keepAlive: true},
                component: Drive
            },
            {
                path: "/employee",
                name: MENU_INDEX.EMPLOYEE,
                meta: {keepAlive: true},
                component: Employee
            },
            {
                path: "/route",
                name: MENU_INDEX.ROUTE,
                meta: {keepAlive: true},
                component: Route
            },
            {
                path: "/payment",
                name: MENU_INDEX.PAYMENT,
                meta: {keepAlive: true},
                component: Payment
            },
            {
                path: "/station",
                name: MENU_INDEX.STATION,
                meta: {keepAlive: true},
                component: Station
            },
            {
                path: "/vehicle",
                name: MENU_INDEX.VEHICLE,
                meta: {keepAlive: true},
                component: Vehicle
            },
            {
                path: "/authority",
                name: MENU_INDEX.AUTHORITY,
                meta: {keepAlive: true},
                component: Authority
            },
            {
                path: "/department",
                name: MENU_INDEX.DEPARTMENT,
                meta: {keepAlive: true},
                component: Department
            },
            {
                path: "/goods",
                name: MENU_INDEX.GOODS,
                meta: {keepAlive: true},
                component: Goods
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
