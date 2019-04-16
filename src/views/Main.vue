<template>
  <div id="main" class="admin-main">
    <Layout class="admin-layout">
      <Sider
        class="admin-side"
        ref="side"
        breakpoint="sm"
        collapsible
        :hide-trigger="true"
        v-model="isCollapsed"
      >
        <div class="admin-logo">LOGO</div>
        <div class="admin-menu">
          <CollapsedMenu
            v-model="isCollapsed"
            :data="menuList"
            :active="activeMenu.index"
            :accordion="true"
            @on-select="handleSelectMenu"
          ></CollapsedMenu>
        </div>
        <div slot="trigger"></div>
      </Sider>
      <Layout>
        <Header class="admin-header">
          <div class="admin-trigger" @click="collapsedSide">
            <Icon
              :style="{ margin: '0 20px' }"
              :custom="triggerIcon"
              size="20"
            ></Icon>
          </div>
          <div class="admin-function">
            <div class="admin-function-item" @click="handleFullScreen">
              <Icon custom="iconfont icon-fullscreen" size="18"></Icon>
            </div>
            <div class="admin-function-item">
              <Icon custom="iconfont icon-setting" size="21"></Icon>
            </div>
            <div class="admin-user">
              <Dropdown placement="bottom-start">
                <a href="javascript:void(0)">
                  <Avatar
                    class="admin-user-avatar"
                    size="small"
                    src="https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png"
                  ></Avatar>
                  <span class="admin-user-name">夏明凤</span>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownSpace">个人中心</DropdownItem>
                  <DropdownItem name="logout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content class="admin-content">
          <div class="admin-tabs">
            <Tabs
              class="admin-menu-tab"
              type="card"
              :value="activeMenu.index"
              closable
              @on-click="handleClickTab"
              @on-tab-remove="handleRemoveTab"
            >
              <TabPane
                v-for="item in openedMenu"
                :key="item.index"
                :name="item.index"
                :label="item.name"
                :closable="!item.main"
              >
              </TabPane>
            </Tabs>
          </div>
          <div class="admin-content-page">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import CollapsedMenu from "@/components/CollapsedMenu.vue";
import appMenu from "@/libs/menu";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "home",
  components: {
    CollapsedMenu
  },
  data() {
    return {
      isCollapsed: false,
      menuList: [],
      fullScreen: false
    };
  },
  computed: {
    ...mapState({
      openedMenu: state => state.application.openedMenu,
      activeMenu: state => state.application.activeMenu
    }),
    triggerIcon() {
      let name = this.isCollapsed ? "menu-fold" : "menu-unfold";
      return `iconfont icon-${name}`;
    }
  },
  methods: {
    ...mapMutations([
      "initOpenedMenu",
      "addOpenedMenu",
      "setActiveMenu",
      "removeOpenedMenu"
    ]),
    collapsedSide() {
      this.$refs["side"].toggleCollapse();
    },
    handleSelectMenu(key) {
      this.addOpenedMenu(appMenu.valueOf(key));
    },
    handleClickTab(name) {
      this.setActiveMenu(appMenu.valueOf(name));
    },
    handleRemoveTab(name) {
      this.removeOpenedMenu(appMenu.valueOf(name));
    },
    handleFullScreen() {},
    handleExitFullScreen() {}
  },
  watch: {
    activeMenu(menu) {
      console.log(menu.index);
      this.$router.push({ name: menu.index });
    }
  },
  mounted() {
    this.menuList = appMenu.authMenu();
    this.initOpenedMenu();
    /*TODO*/
    this.$util.setSessionStorageItem("Authorization", "TOKEN");
  }
};
</script>

<style lang="less">
@import "Main";
</style>
<style lang="less">
/*
   * rewrite iview style
   */
.admin-function-item {
  .ivu-badge-dot {
    top: 15px;
  }
}

.admin-user {
  .ivu-select-dropdown {
    right: 20px;
  }
}

.admin-content {
  .admin-tabs {
    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar {
      margin-bottom: 5px;
    }
    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
      border-radius: 0;
      background: #fff;
    }
    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
      border-top: 1px solid #3399ff;
    }
    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
