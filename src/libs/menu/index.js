import { MENU_INDEX } from "../const/index";

const appMenu = {
  data: [
    {
      index: MENU_INDEX.HOME,
      name: "系统首页",
      icon: "iconfont icon-setting-fill",
      main: true
    },
    {
      index: MENU_INDEX.USER,
      name: "用户管理",
      icon: "iconfont icon-quanxian"
    },
    {
      index: MENU_INDEX.COMPANY,
      name: "企业管理",
      icon: "iconfont icon-bumen",
      main: true,
      submenu: [
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
          index: MENU_INDEX.VEHICLE,
          name: "车辆管理",
          icon: "iconfont icon-wuliuguanli1"
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
        }
      ]
    },
    {
      index: MENU_INDEX.BILL,
      name: "单据管理",
      icon: "iconfont icon-weibiaoti4",
      main: true,
      submenu: [
        {
          index: MENU_INDEX.TYBILL,
          name: "托运单据",
          icon: "iconfont icon-wuliuguanli"
        },
        {
          index: MENU_INDEX.CarBILL,
          name: "运输单据",
          icon: "iconfont icon-wuliufeiguanli"
        },
        {
          index: MENU_INDEX.SZBILL,
          name: "收支单据",
          icon: "iconfont icon-yiqianshou"
        },
        {
          index: MENU_INDEX.JSBILL,
          name: "结算单据",
          icon: "iconfont icon-kehu1"
        }
      ]
    },
    {
      index: MENU_INDEX.FINANCE,
      name: "财务统计",
      icon: "iconfont icon-baobiao4",
      main: true,
      submenu: [
        {
          index: MENU_INDEX.SALARY,
          name: "工资成本",
          icon: "iconfont icon-chengbenfenxi"
        },
        {
          index: MENU_INDEX.YXZC,
          name: "运营支出",
          icon: "iconfont icon-feiyong"
        },
        {
          index: MENU_INDEX.KHJS,
          name: "客户结算",
          icon: "iconfont icon-kehu1"
        },
        {
          index: MENU_INDEX.YLTJ,
          name: "盈利统计",
          icon: "iconfont icon-cost"
        }
      ]
    },

    {
      index: MENU_INDEX.REPORT,
      name: "报表管理",
      icon: "iconfont icon--baobiaozhongxin",
      main: true,
      submenu: [
        {
          index: MENU_INDEX.WLREPORT,
          name: "物流跟踪报表",
          icon: "iconfont icon-baobiao2"
        },
        {
          index: MENU_INDEX.TYREPORT,
          name: "业务单据报表",
          icon: "iconfont icon-baobiao3"
        }
      ]
    }

    // {
    //     index: MENU_INDEX.AUTHORITY,
    //     name: "权限管理",
    //     icon: "iconfont icon-ic_opt_feature"
    // },
    /*        {
                index: MENU_INDEX.DEPARTMENT,
                name: "部门管理",
                icon: "iconfont icon-cluster"
            },*/
    // {
    //     index: MENU_INDEX.LOG,
    //     name: "日志管理",
    //     icon: "iconfont icon-rizhixitong"
    // }
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
