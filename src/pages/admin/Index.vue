<script setup lang="ts">
import { useAction, usePload } from "@wsvaio/use";
import type { Pload, Action } from ".";
import SiderHeader from "@/layouts/sider-header/index.vue";
import FilterView from "./views/filter/index.vue";
import TableView from "./views/table/index.vue";
import AddeditView from "./views/addedit/index.vue";
// import PasswordView from "./views/password/index.vue";
defineOptions({
  name: "",
});
usePload<Pload>({
  $mode: "provide",
  addeditTitle: "",
  params: {},
  showAddedit: false,
  showPassword: false,
});

useAction<Action>({ $mode: "provide" });

const setting = useSettingStore();
</script>

<template>
  <sider-header
    :style="{
      height: setting.type == 'mini' ? undefined : 'var(--container-height)',
    }"
  >
    <template #header>
      <filter-view></filter-view>
    </template>

    <addedit-view></addedit-view>
    <!-- <password-view></password-view> -->

    <table-view></table-view>
  </sider-header>
</template>

<style lang="less" scoped></style>
