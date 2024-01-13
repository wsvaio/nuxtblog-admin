<script setup lang="ts">
import { usePagination } from "vue-request";
import { NButton, NPopconfirm } from "naive-ui";
import { useAction, usePload } from "@wsvaio/use";
import type { Action, Pload } from "../../";

const pload = usePload<Pload>({ $mode: "inject" });
const action = useAction<Action>({ $mode: "inject" });

const { data, pageSize, current, total, refreshAsync, loading } = $(
  usePagination(async pag => {
    return await getFriend({
      q: {
        ...pag,
        ...pload.params,
      },
    });
  })
);

action.use("刷新表格", refreshAsync);

action.use("删除", async ({ id }) => {
  await delFriend({
    p: {
      id,
    },
  });
  action.act("刷新表格");
});
</script>

<template>
  <wrapable class="sticky top-0 z-10 bg-[var(--bg-color)]">
    <n-h4 font="bold" m="!0">管理员列表</n-h4>

    <template #suffix>
      <n-button type="primary" @click="pload.$assign({ showAddedit: true, addeditTitle: '添加' })">添加</n-button>
    </template>
  </wrapable>
  <vtable
    :data="data?.list"
    :loading="loading"
    thead-top="58px"
    :columns="[
      {
        title: '名称',
        key: 'name',
      },
      {
        title: '链接',
        key: 'link',
      },
      {
        title: '描述',
        key: 'descr',
      },
      {
        title: '头像',
        key: 'avatar',
      },
      {
        title: '截图',
        key: 'screenshot',
      },
      {
        title: '修改时间',
        key: 'updateAt',
      },
      {
        title: '创建时间',
        key: 'createAt',
      },

      {
        title: '操作',
        key: 'id',
        ellipsis: true,
        render: rowData => [
          h(
            NButton,
            {
              text: true,
              type: 'primary',
              onClick: () => {
                action.act({ $: '打开修改', id: rowData.id });
              },
            },
            { default: () => '修改' },
          ),
          h(
            NPopconfirm,
            {
              onPositiveClick: () => {
                action.act({ $: '删除', id: rowData.id });
              },
            },
            {
              default: () => h('span', '确定删除？'),
              trigger: () =>
                h(
                  NButton,
                  {
                    text: true,
                    type: 'error',
                    class: 'ml-.5em',
                    onClick: () => {},
                  },
                  { default: () => '删除' },
                ),
            },
          ),
        ],
      },
    ]"
  />
  <vpagination
    v-model:page="current"
    v-model:pageSize="pageSize"
    class="sticky bottom-0 z-10 mt-auto bg-[var(--bg-color)]"
    :item-count="total"
  />
</template>

<style lang="less" scoped></style>
