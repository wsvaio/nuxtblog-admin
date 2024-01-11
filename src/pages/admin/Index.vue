<script setup lang="ts">
import { useAction, usePload } from "@wsvaio/use";
import type { Pload, Action } from ".";
import SiderHeader from "@/layouts/sider-header/index.vue";

import FilterView from "./views/filter/index.vue";
import TableView from "./views/table/index.vue";
import AddeditView from "./views/addedit/index.vue";

defineOptions({
  name: '',
});

const pload = usePload<Pload>({ $mode: "provide", addeditTitle: "", params: {}, showAddedit: false });
const action = useAction<Action>({ $mode: "provide" });
</script>

<template>
  <sider-header
    :style="{
      height: useSettingStore().type == 'mini' ? undefined : 'var(--container-height)',
    }"
  >
    <template #header>
      <filter-view></filter-view>
    </template>

    <addedit-view></addedit-view>

    <table-view></table-view>
  </sider-header>
</template>

<style lang="less" scoped></style>
