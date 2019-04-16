import { MENU_INDEX, STORAGE_KEY } from "@/libs/const";
import appMenu from "@/libs/menu";
import util from "@/libs/util";

const application = {
  state: {
    openedMenu: [],
    activeMenu: {}
  },
  mutations: {
    initOpenedMenu(state) {
      console.log("init opened menu");
      let jsonObject = util.getSessionStorageItem(STORAGE_KEY.OPENED_MENU);
      if (jsonObject) {
        state.activeMenu = jsonObject.activeMenu;
        state.openedMenu = jsonObject.openedMenu;
      } else {
        let activeMenu = appMenu.valueOf(MENU_INDEX.HOME);
        state.openedMenu = [activeMenu];
        state.activeMenu = activeMenu;
      }
    },
    addOpenedMenu(state, menu) {
      let opened = state.openedMenu.find(m => m.index === menu.index);
      if (!opened) {
        state.openedMenu.push(menu);
      }
      state.activeMenu = menu;
      util.setSessionStorageItem(STORAGE_KEY.OPENED_MENU, {
        activeMenu: state.activeMenu,
        openedMenu: state.openedMenu
      });
    },
    removeOpenedMenu(state, menu) {
      let openedMenu = state.openedMenu;
      for (let i = 0; i < openedMenu.length; i++) {
        if (openedMenu[i].index === menu.index) {
          if (state.activeMenu.index === menu.index) {
            state.activeMenu = openedMenu[i - 1];
          }
          openedMenu.splice(i, 1);
        }
      }
      util.setSessionStorageItem(STORAGE_KEY.OPENED_MENU, {
        activeMenu: state.activeMenu,
        openedMenu: state.openedMenu
      });
    },
    setActiveMenu(state, menu) {
      state.activeMenu = menu;
      util.setSessionStorageItem(STORAGE_KEY.OPENED_MENU, {
        activeMenu: state.activeMenu,
        openedMenu: state.openedMenu
      });
    }
  },
  actions: {},
  getters: {}
};

export default application;
