import {MENU_INDEX} from "../const";

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
            icon: "iconfont icon-log"
        },
        {
            index: MENU_INDEX.COST,
            name: "成本中心",
            icon: "iconfont icon-log"
        },
        {
            index: MENU_INDEX.REPORT,
            name: "报表管理",
            icon: "iconfont icon-log"
        },
        {
            index: MENU_INDEX.LOG,
            name: "日志管理",
            icon: "iconfont icon-log"
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
