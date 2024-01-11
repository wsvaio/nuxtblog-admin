<script setup lang="ts">
import { usePagination } from "vue-request";
import { NButton, NPopconfirm, NSpace, NTag } from "naive-ui";
import { usePayload } from "@wsvaio/use";
import AddeditView from "./views/addedit/index.vue";
import type { Payload } from ".";
import SiderHeader from "@/layouts/sider-header/index.vue";
import MdEditorV3View from "./views/md-editor-v3/index.vue";
import WangeditorView from "./views/wangeditor/index.vue";
import VditorView from "./views/vditor/index.vue";

defineOptions({
  name: "",
});

const payload = usePayload<Payload>({
  params: {
    name: "",
    productSubType: "",
    code: "",
  },
  showAddedit: false,
  showMdEditorV3: false,
  showWangeditor: false,
  showVditor: false,
  addeditTitle: "",
  id: "",
  $mode: "provide",
});

const { params } = $(payload);

const { data, pageSize, current, total, refreshAsync, loading } = $(
  usePagination(async pag => {
    return await getArticle({
      q: {
        ...pag,
        ...params,
      },
    });
  })
);

payload.$use("刷新列表")(async () => refreshAsync());

payload.$use("删除")(async () => {
  await delArticle({ p: { id: payload.id } });
  await refreshAsync();
});
</script>

<template>
  <sider-header
    :style="{
      height: useSettingStore().type == 'mini' ? undefined : 'var(--container-height)',
    }"
  >
    <template #header>
      <wrapable>
        <n-input v-model:value="params.name" class="!w-256px" placeholder="请输入" />

        <template #suffix>
          <n-button @click="payload.$reset('params'), refreshAsync()">重置</n-button>
          <n-button type="primary" @click="refreshAsync">搜索</n-button>
        </template>
      </wrapable>
    </template>

    <addedit-view />
    <md-editor-v3-view></md-editor-v3-view>
    <wangeditor-view></wangeditor-view>
    <vditor-view></vditor-view>

    <wrapable class="sticky top-0 z-10 bg-[var(--bg-color)]">
      <n-h4 font="bold" m="!0">文章列表</n-h4>
      <template #suffix>
        <n-button type="primary" @click="payload.$action({ showAddedit: true, addeditTitle: '添加' })">添加</n-button>
      </template>
    </wrapable>

    <vtable
      :data="data?.list"
      :loading="loading"
      thead-top="58px"
      :columns="[
        {
          title: '标题',
          key: 'title',
        },
        {
          title: '类型',
          key: 'type.name',
        },
        {
          title: '标签',
          key: 'tags',
          render: rowData =>
            h(
              NSpace,
              {},
              { default: () => rowData.tags.map(tag => h(NTag, { type: 'primary' }, { default: () => tag.name })) }
            ),
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
          render: rowData => [
            h(
              NButton,
              {
                text: true,
                type: 'primary',

                onClick: () => {
                  payload.$action({ showAddedit: true, addeditTitle: '修改', id: rowData.id });
                },
              },
              { default: () => '修改' }
            ),
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                class: 'ml-0.5em',
                onClick: () => {
                  payload.$action({ showMdEditorV3: true, id: rowData.id });
                },
              },
              { default: () => 'MdEditorV3' }
            ),
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                class: 'ml-0.5em',
                onClick: () => {
                  payload.$action({ showWangeditor: true, id: rowData.id });
                },
              },
              { default: () => 'Wangeditor' }
            ),
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                class: 'ml-0.5em',
                onClick: () => {
                  payload.$action({ showVditor: true, id: rowData.id });
                },
              },
              { default: () => 'Vditor' }
            ),
            h(
              NPopconfirm,
              {
                onPositiveClick: () => {
                  payload.$action({ $name: '删除', id: rowData.id });
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
                      class: 'ml-0.5em',
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
  </sider-header>
</template>

<style lang="less" scoped></style>
