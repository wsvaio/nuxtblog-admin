<script setup lang="ts">
import { usePagination } from "vue-request";
import { NButton, NPopconfirm } from "naive-ui";
import { useAction, usePload } from "@wsvaio/use";
import type { Pload, Action } from "../../";

const pload = usePload<Pload>({ $mode: "inject" });
const action = useAction<Action>({ $mode: "inject" });

const { data, pageSize, current, total, refreshAsync, loading } = $(
  usePagination(async pag => {
    return await getComment({
      q: {
        ...pag,
        ...pload.params,
        include: JSON.stringify({
          article: true,
          comment: true,
        }),
      },
    });
  })
);

action.use("刷新表格", refreshAsync);

action.use("删除", async ({ id }) => {
  await delComment({
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

    <template #suffix></template>
  </wrapable>
  <vtable
    :data="data?.list"
    :loading="loading"
    thead-top="58px"
    :columns="[
      // {
      //   title: 'id',
      //   key: 'id',
      // },
      {
        title: '用户名称',
        key: 'user.name',
      },
      {
        title: '评论内容',
        key: 'content',
      },
      {
        title: '文章',
        key: 'article',
        render: rowData => JSON.stringify(rowData.article),
      },
      {
        title: '评论',
        key: 'comment',
        render: rowData => JSON.stringify(rowData.comment),
      },
      {
        title: '来自',
        key: 'from',
        render: rowData => JSON.stringify(rowData.from),
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
        width: '4em',
        render: rowData => [
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
                    onClick: () => {},
                  },
                  { default: () => '删除' }
                ),
            }
          ),
        ],
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
