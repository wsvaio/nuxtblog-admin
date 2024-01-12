<script setup lang="ts">
import { useAction, usePload } from "@wsvaio/use";
import type { Pload, Action } from ".";
import SiderHeader from "@/layouts/sider-header/index.vue";
import FilterView from "./views/filter/index.vue";
import TableView from "./views/table/index.vue";
defineOptions({
  name: "",
});
usePload<Pload>({
  $mode: "provide",
  params: {},
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


    <table-view></table-view>
  </sider-header>
</template>

<style lang="less" scoped></style>
