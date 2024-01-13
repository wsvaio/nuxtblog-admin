<script setup lang="ts">
import { useAction, usePload } from "@wsvaio/use";
import type { FormInst } from "naive-ui";
import type { Action, Pload } from "../..";

const formRef = $ref<FormInst>();

const pload = usePload<Pload>({
  $mode: "inject",
});
const load = usePload<Record<any, any>>({});
const action = useAction<Action>({ $mode: "inject" });

async function sync(id: string) {
  load.$assign(await getFriend({ p: { id } }));
}

action.use("打开修改", async ({ id }) => {
  sync(id);
  pload.$assign({
    showAddedit: true,
    addeditTitle: "修改",
  });
});

async function submit() {
  await formRef?.validate();
  if (pload.addeditTitle == "添加") {
    await postFriend({
      b: load,
    });
  }
  else {
    await putFriend({
      p: {
        id: load.id,
      },
      b: load,
    });
  }
  pload.$assign({
    addeditTitle: "",
    showAddedit: false,
  });
  action.act("刷新表格");
}
</script>

<template>
  <vmodel v-model:show="pload.showAddedit" :loading="action.acting()" @after-leave="load.$reset()">
    <template #header>
      <span>{{ pload.addeditTitle }}</span>
    </template>

    <n-form ref="formRef" :model="load">
      <n-form-item path="name" label="名称" :rule="{ required: true, message: '请输入名称' }">
        <n-input v-model:value="load.name" placeholder="请输入名称" clearable />
      </n-form-item>

      <n-form-item path="link" label="链接" :rule="{ required: true, message: '请输入链接' }">
        <n-input v-model:value="load.link" placeholder="请输入链接" clearable />
      </n-form-item>

      <n-form-item path="descr" label="描述">
        <n-input v-model:value="load.descr" placeholder="请输入描述" clearable />
      </n-form-item>

      <n-form-item path="avatar" label="头像地址">
        <n-input v-model:value="load.avatar" placeholder="请输入头像地址" clearable />
      </n-form-item>

      <n-form-item path="screenshot" label="截图地址">
        <n-input v-model:value="load.screenshot" placeholder="请输入网站截图地址" clearable />
      </n-form-item>
    </n-form>

    <template #footer>
      <div flex="~" justify="center">
        <n-button type="primary" px="2em" @click="submit">保存</n-button>
        <n-button px="2em" ml="1em" @click="pload.showAddedit = false">取消</n-button>
      </div>
    </template>
  </vmodel>
</template>

<style lang="less" scoped></style>
