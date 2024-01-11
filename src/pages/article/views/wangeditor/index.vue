<script setup lang="ts">
import { usePayload } from "@wsvaio/use";
import { pick } from "@wsvaio/utils";
import type { Payload } from "../..";

const payload = usePayload<Payload>({
  $mode: "inject",
});
const load = usePayload({
  content: "",
});

load.$use("同步类型")(async () => {
  load.$action(await getArticle({ param: { id: payload.id } }));
});
const submit = async () => {
  await putArticle({
    p: {
      id: payload.id,
    },
    b: {
      ...pick(load, ["content"]),
    },
  });

  payload.$action({
    $name: "刷新列表",
    showWangeditor: false,
  });
};
</script>

<template>
  <vmodel
    v-model:show="payload.showWangeditor"
    width="var(--xl)"
    height="var(--lg)"
    :loading="load.$loading"
    @before-enter="load.$action('同步类型')"
    @after-leave="load.$reset()"
  >
    <template #header>
      <span>Wangeditor编辑器</span>
    </template>

    <wangeditor v-model="load.content" class="!w-full !h-761px" />

    <template #footer>
      <div flex="~" justify="center">
        <n-button type="primary" px="2em" @click="submit">保存</n-button>
        <n-button px="2em" ml="1em" @click="payload.showWangeditor = false">取消</n-button>
      </div>
    </template>
  </vmodel>
</template>

<style lang="less" scoped></style>
