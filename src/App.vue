<script setup lang="ts">
import { darkTheme, dateZhCN, lightTheme, zhCN } from "naive-ui";

const setting = useSettingStore();
</script>

<template>
  <n-config-provider
    :theme="setting.isDark ? darkTheme : lightTheme"
    :theme-overrides="{
      common: {
        ...setting.themeVars,
      },
    }"
    :locale="zhCN"
    :date-locale="dateZhCN"
    abstract
  >
    <n-message-provider>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </n-message-provider>
  </n-config-provider>

  <transition name="fade">
    <global-loading v-if="setting.globalLoading" />
  </transition>

  <div
    class="i-material-symbols-article-outline i-ph-bookmarks i-carbon-types i-material-symbols-library-music-outline i-material-symbols-admin-panel-settings-outline i-material-symbols-comment-outline i-ic-sharp-person-outline i-tabler-friends"
    :style="{ display: 'none' }"
  />
</template>

<style lang="less" scoped></style>
