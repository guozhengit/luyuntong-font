import {MENU_INDEX} from "../const/index";

const appMenu = {
    data: [
        {
            index: MENU_INDEX.HOME,
            name: "系统首页",
            icon: "iconfont icon-home",
            main: true
        },
        {
            index: MENU_INDEX.USER,
            name: "用户管理",
            icon: "iconfont icon-file"
        },
        {
            index: MENU_INDEX.BILL,
            name: "单据管理",
            icon: "iconfont icon-icon-test"
        },
        {
            index: MENU_INDEX.COST,
            name: "成本中心",
            icon: "iconfont icon-chengbenfenxi"
        },
        {
            index: MENU_INDEX.AUTHORITY,
            name: "权限管理",
            icon: "iconfont icon-ic_opt_feature"
        },
        {
            index: MENU_INDEX.CITY,
            name: "城市管理",
            icon: "iconfont icon-chengshi"
        },
        {
            index: MENU_INDEX.CUSTOMER,
            name: "客户管理",
            icon: "iconfont icon-kehu"
        },
        {
            index: MENU_INDEX.DEPARTMENT,
            name: "部门管理",
            icon: "iconfont icon-cluster"
        },
        {
            index: MENU_INDEX.DRIVER,
            name: "司机管理",
            icon: "iconfont icon-sijiguanli"
        },
        {
            index: MENU_INDEX.EMPLOYEE,
            name: "职员管理",
            icon: "iconfont icon-team"
        },
        {
            index: MENU_INDEX.PAYMENT,
            name: "费用管理",
            icon: "iconfont icon-icon-test"
        },
        {
            index: MENU_INDEX.ROUTE,
            name: "路线管理",
            icon: "iconfont icon-wulianwang-"
        },
        {
            index: MENU_INDEX.STATION,
            name: "站点管理",
            icon: "iconfont icon-chengshi1"
        },
        {
            index: MENU_INDEX.VEHICLE,
            name: "车辆管理",
            icon: "iconfont icon-wuliuguanli1"
        },
        {
            index: MENU_INDEX.REPORT,
            name: "报表管理",
            icon: "iconfont icon-wuliuxinxi"
        },
        {
            index: MENU_INDEX.LOG,
            name: "日志管理",
            icon: "iconfont icon-rizhixitong"
        }
    ],
    valueOf(index) {
        for (let item of this.data) {
            if (!item.submenu) {
                if (index === item.index) {
                    return item;
                }
            } else {
                if (item.submenu) {
                    for (let subitem of item.submenu) {
                        if (index === subitem.index) {
                            return subitem;
                        }
                    }
                }
            }
        }
    },
    authMenu() {
        //TODO fix this code
        return this.data;
    }
};

export default appMenu;
