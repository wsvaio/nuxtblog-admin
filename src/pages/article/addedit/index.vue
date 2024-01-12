<script setup lang="ts">
import { usePayload } from "@wsvaio/use";
import type { FormInst } from "naive-ui";
import { pick } from "@wsvaio/utils";

const formRef = $ref<FormInst>();

const route = useRoute();
const articleId = route.params.id;
const load = usePayload({
  name: "",
});
const list = useListStore();

load.$use("同步类型")(async () => {
  load.$action(await getArticle({ param: { id: articleId } }));
});
const submit = async () => {
  await formRef?.validate();
  if (!articleId) {
    await postArticle({
      b: {
        ...pick(load, ["title", "content", "tags", "type"]),
      },
    });
  } else {
    await putArticle({
      p: {
        id: articleId,
      },
      b: {
        ...pick(load, ["title", "content", "tags", "type"]),
      },
    });
  }
};
</script>

<template>
  <article>
    <n-form ref="formRef" :model="load">
      <n-form-item path="title" label="标题" :rule="{ required: true, message: '请输入标题' }">
        <n-input v-model:value="load.title" placeholder="请输入标题" clearable />
      </n-form-item>

      <n-form-item
        path="type.name"
        label="类型"
        :rule="{ required: true, message: '请选择类型' }"
      >
        <n-select
          :value="load?.type?.name"
          placeholder="请选择类型"
          clearable
          tag
          filterable
          :options="
            list.types?.map(item => ({
              label: item.name,
              value: item.name,
            }))
          "
          to="body"
          @update:value="val => (load.type ? (load.type.name = val) : (load.type = { name: val }))"
        />
      </n-form-item>

      <n-form-item path="tags" label="标签" :rule="{ required: true, message: '请选择标签' }">
        <n-select
          :value="load.tags?.map(item => item.name)"
          placeholder="请选择标签"
          multiple
          clearable
          tag
          filterable
          :options="
            list.tags.map(item => ({
              label: item.name,
              value: item.name,
            }))
          "
          to="body"
          @update:value="(val: any[]) => (load.tags = val.map(item => ({ name: item })))"
        />
      </n-form-item>

      <n-form-item path="content" label="内容" :rule="{ required: true, message: '请输入内容' }">
        <n-input v-model:value="load.content" type="textarea" placeholder="请输入内容" clearable />
      </n-form-item>
    </n-form>

    <div flex="~" justify="center">
      <n-button type="primary" px="2em" @click="submit">保存</n-button>
      <n-button px="2em" ml="1em">取消</n-button>
    </div>
  </article>
</template>

<style lang="less" scoped></style>
