<script setup lang="ts">
import { usePagination } from "vue-request";
import { NButton } from "naive-ui";
import { useAction, usePload } from "@wsvaio/use";
import type { Pload, Action } from "../../";



const pload = usePload<Pload>({ $mode: "inject" });
const action = useAction<Action>({ $mode: "inject" });

const { data, pageSize, current, total, refreshAsync, loading } = $(
  usePagination(async () => {
    return {
      list: [],
    };
  })
);

action.use("刷新表格", refreshAsync);

action.use("打开详情", async ({ id }) => {
  pload.showAddedit = true;
});
</script>

<template>
  <wrapable class="sticky top-0 z-10 bg-[var(--bg-color)]">
    <n-h4 font="bold" m="!0">智慧设备列表</n-h4>

    <template #suffix />
  </wrapable>
  <vtable
    :data="data?.list"
    :loading="loading"
    thead-top="58px"
    :columns="[
      {
        title: '设备名称',
        key: 'name',
      },
      {
        title: '所属单位',
        key: 'companyName',
      },

      {
        title: '操作',
        key: 'id',
        ellipsis: true,
        width: '4em',
        render: rowData =>
          h(
            NButton,
            {
              text: true,
              type: 'primary',
              onClick: () => {
                action.act({ $: '打开详情', id: rowData.id });
              },
            },
            { default: () => '详情' }
          ),
      },
    ]"
  />
  <vpagination
    v-model:page="current"
    v-model:pageSize="pageSize"
    class="sticky bottom-0 z-10 bg-[var(--bg-color)] mt-auto"
    :item-count="total"
  />
</template>

<style lang="less" scoped></style>
