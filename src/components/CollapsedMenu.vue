<template>
  <div>
    <Menu
      :collapse="value"
      :unique-opened="accordion"
      :router="false"
      :default-active="active"
      :background-color="background_color"
      :text-color="text_color"
      :active-text-color="active_text_color"
      :collapse-transition="false"
      @select="handleSelect"
    >
      <template v-for="menu in data">
        <Submenu
          v-if="menu.submenu"
          :index="menu.index"
          :key="menu.index"
          :disabled="menu.disabled"
        >
          <template slot="title">
            <i
              :class="menu.icon"
              style="padding-right: 5px; font-size: 16px"
            ></i>
            <span slot="title" v-text="menu.name"></span>
          </template>
          <MenuItem
            v-for="item in menu.submenu"
            :index="item.index"
            :key="item.index"
            :class="collapseClasses"
            :disabled="item.disabled"
          >
            <i
              :class="item.icon"
              style="padding-right: 5px; font-size: 16px"
            ></i>
            <span slot="title" v-text="item.name"></span>
          </MenuItem>
        </Submenu>
        <MenuItem
          v-else
          :index="menu.index"
          :key="menu.index"
          :disabled="menu.disabled"
        >
          <i :class="menu.icon" style="padding-right: 5px; font-size: 16px"></i>
          <span slot="title" v-text="menu.name"></span>
        </MenuItem>
      </template>
    </Menu>
  </div>
</template>

<script>
import { Menu, Submenu, MenuItem, MenuItemGroup } from "element-ui";
export default {
  components: {
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup
  },
  name: "CollapsedMenu",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    accordion: {
      type: Boolean
    },
    data: {
      type: Array,
      required: true
    },
    active: {
      type: String
    }
  },
  data() {
    return {
      background_color: "#081726",
      text_color: "#A9AEB3",
      active_text_color: "#3F85FF"
    };
  },
  computed: {
    collapseClasses() {
      return ["collapse-menu-item"];
    }
  },
  methods: {
    handleSelect(key, path) {
      this.$emit("on-select", key, path);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~element-ui/lib/theme-chalk/index.css";
.el-menu {
  border: none;
}
.collapse-menu-item {
  height: 46px;
  line-height: 46px;
}
</style>
<style lang="less">
.el-menu--vertical {
  .el-menu {
    min-width: 120px;
  }
}
</style>
