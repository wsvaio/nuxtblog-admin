<script setup lang="ts">
import { usePagination } from "vue-request";
import { NA, NImage } from "naive-ui";
import { useAction, usePload } from "@wsvaio/use";
import type { Pload, Action } from "../../";

const pload = usePload<Pload>({ $mode: "inject" });
const action = useAction<Action>({ $mode: "inject" });

const { data, pageSize, current, total, refreshAsync, loading } = $(
  usePagination(async pag => {
    return await getUser({
      q: {
        ...pag,
        ...pload.params,
      },
    });
  })
);

action.use("刷新表格", refreshAsync);
</script>

<template>
  <wrapable class="sticky top-0 z-10 bg-[var(--bg-color)]">
    <n-h4 font="bold" m="!0">用户列表</n-h4>

    <template #suffix>
      <!-- <n-button type="primary" @click="pload.$assign({ showAddedit: true, addeditTitle: '添加' })">添加</n-button> -->
    </template>
  </wrapable>

  <vtable
    :data="data?.list"
    :loading="loading"
    thead-top="58px"
    :columns="[
      {
        title: '头像',
        key: 'avatar',
        render: rowData =>
          h(NImage, {
            src: rowData.avatar,
            alt: '头像',
            height: 50,
          }),
      },
      {
        title: '名称',
        key: 'name',
      },
      {
        title: '邮箱',
        key: 'email',
        render: rowData => h(NA, { href: 'mailto:' + rowData.email }, { default: () => rowData.email }),
      },
      {
        title: '站点',
        key: 'site',
        render: rowData => h(NA, { href: rowData.site }, { default: () => rowData.site }),
      },
      {
        title: '接收邮件',
        key: 'acceptEmails',
        render: rowData => (rowData.acceptEmails ? '是' : '否'),
      },
      {
        title: '修改时间',
        key: 'updateAt',
      },
      {
        title: '创建时间',
        key: 'createAt',
      },

      // {
      //   title: '操作',
      //   key: 'id',
      //   ellipsis: true,
      //   width: '4em',
      //   render: rowData =>
      //     h(
      //       NButton,
      //       {
      //         text: true,
      //         type: 'primary',
      //         onClick: () => {
      //           action.act({ $: '打开修改', id: rowData.id });
      //         },
      //       },
      //       { default: () => '修改' }
      //     ),
      // },
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
