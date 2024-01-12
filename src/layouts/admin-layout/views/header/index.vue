<script setup lang="ts">
import Collapse from "../../components/collapse/index.vue";
import BreadCrumb from "../../components/bread-crumb/index.vue";
import FullScreen from "../../components/full-screen/index.vue";
import Avatar from "../../components/avatar/index.vue";
import DarkModeSwitch from "../../components/dark-mode-switch/index.vue";
import Refresh from "../../components/refresh/index.vue";
import SettingComp from "../../components/setting/index.vue";
import Logo from "../../components/logo/index.vue";
// import AdminPic from "@/assets/img/AdminPic.svg";
import IPdx from "@/assets/img/pdx.gif";
import LoginComp from "../../components/login/index.vue";

const setting = useSettingStore();
const { sider, header } = $(setting);

const menu = useMenuStore();
// const { currentActiveMenuKey, currentActiveTopLevelMenu, menuOptions, subMenuOptions, topLevelMenuOptions } = $(menu);

const tab = useTabStore();
const router = useRouter();
const auth = useAuthStore();
let show = $ref(false);
let showLogin = $ref(false);

const handleSelect = (key: string) => {
  if (key == "系统设置") show = true;
  if (key == "退出登录") auth.logout();
  if (key == "登录") showLogin = true;
};

const menuOptions = computed(() => {
  if (setting.typeHas("top-mix-split")) return menu.topLevelMenuOptions;

  return menu.menuOptions;
});

const handleTopMixSplitMenuSelect = (path: string) => {
  if (!setting.typeHas("top-mix-split")) return;
  const finded = deepFind(menu.menuOptions, item => item.key == path);
  if (finded && finded.children.length >= 1) router.push(finded.children[0].key);
};

const currentActiveMenuKey = computed(() => {
  if (setting.typeHas("top-mix-split")) return menu.currentActiveTopLevelMenu?.key;
  return menu.currentActiveMenuKey;
});
</script>

<template>
  <n-layout-header
    class="header"
    :class="[setting.type, setting.header.fixed && 'fixed']"
    :inverted="header.inverted"
    :style="{
      height: `${header.height}px`,
    }"
  >
    <logo
      v-if="setting.typeHas('top', 'top-mix', 'top-mix-split', 'mini')"
      :show-title="setting.typeHas('top', 'top-mix', 'top-mix-split')"
      title-width="100%"
      class="w-max"
    />
    <collapse
      v-if="setting.typeHas('left', 'left-mix', 'mini', 'top-mix', 'top-mix-split')"
      v-model="sider.collapsed"
    />
    <refresh @click="tab.refresh($route.name)" />
    <bread-crumb
      v-if="setting.typeHas('left', 'left-mix', 'top-mix') && setting.header.crumbVisible"
      :show-icon="setting.header.crumbShowIcon"
      class="p-8px"
    />

    <n-menu
      v-if="setting.typeHas('top', 'top-mix-split')"
      class="flex-1"
      :style="{
        'justify-content': { left: 'flex-start', center: 'center', right: 'flex-end' }[setting.header.menuPosition],
      }"
      :value="currentActiveMenuKey"
      :options="menuOptions"
      mode="horizontal"
      :inverted="setting.header.inverted"
      @select="handleTopMixSplitMenuSelect"
    />
    <full-screen class="ml-auto" />
    <dark-mode-switch v-model="setting.isDark" :customize-transition="setting.customizeDarkModeTransition" />

    <avatar
      :style="{
        filter: auth.isLogin ? undefined : 'grayscale(100%)',
      }"
      :url="IPdx"
      :title="auth.name || ''"
      :options="[
        !auth.isLogin
          ? { label: '登录', key: '登录', icon: () => h('div', { class: 'i-ant-design-login-outlined' }) }
          : { label: '退出登录', key: '退出登录', icon: () => h('div', { class: 'i-ant-design-logout-outlined' }) },
        { label: '系统设置', key: '系统设置', icon: () => h('div', { class: 'i-ant-design-setting-outlined' }) },
      ]"
      @select="handleSelect"
    />

    <n-drawer v-model:show="show" width="min(100%, 330px)">
      <setting-comp />
    </n-drawer>

    <login-comp v-model="showLogin"></login-comp>
  </n-layout-header>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  z-index: 1000;
  flex: none;
  align-items: center;
  transition: all 0.3s var(--cubic-bezier-ease-in-out);
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);

  &.fixed {
    position: sticky;
    top: 0;
  }

  &.left,
  &.left-mix {
    padding-left: var(--sider-real-width);
  }

  &.top,
  &.top-mix,
  &.top-mix-split {
    z-index: 1300;
  }
}
</style>
