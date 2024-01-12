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

const sync = async (id: string) => {
  load.$assign(await getAdmin({ p: { id } }));
};

action.use("打开详情", async ({ id }) => {
  sync(id);
  pload.$assign({
    showPassword: true,
    addeditTitle: "详情",
  });
});

const submit = async () => {
  await formRef?.validate();
  if (pload.addeditTitle == "添加") {
    await postAdmin({
      b: load,
    });
  } else {
    await putAdmin({
      p: {
        id: load.id,
      },
      b: load,
    });
  }
  pload.$assign({
    addeditTitle: "",
    showPassword: false,
  });
  action.act("刷新表格");
};
</script>

<template>
  <vmodel v-model:show="pload.showPassword" :loading="action.acting()" @after-leave="load.$reset()">
    <template #header>
      <span>{{ pload.addeditTitle }}</span>
    </template>

    <n-form ref="formRef" :model="load">
      <n-form-item path="name" label="名称" :rule="{ required: true, message: '请输入名称' }">
        <n-input v-model:value="load.name" placeholder="请输入名称" clearable />
      </n-form-item>

      <n-form-item path="username" label="用户名" :rule="{ required: true, message: '请输入用户名' }">
        <n-input v-model:value="load.username" placeholder="请输入用户名" clearable />
      </n-form-item>

      <n-form-item
        path="password"
        label="密码"
        :rule="{ required: true, message: '请输入密码' }"
        v-if="pload.addeditTitle == '添加'"
      >
        <n-input
          v-model:value="load.password"
          type="password"
          show-password-toggle
          placeholder="请输入密码"
          clearable
        />
      </n-form-item>

      <n-form-item path="role" label="权限等级" :rule="{ required: true, message: '请输入权限等级' }">
        <n-input-number v-model:value="load.role" placeholder="请输入权限等级" clearable w="full"></n-input-number>
      </n-form-item>
    </n-form>

    <template #footer>
      <div flex="~" justify="center">
        <n-button type="primary" px="2em" @click="submit">保存</n-button>
        <n-button px="2em" ml="1em" @click="pload.showPassword = false">取消</n-button>
      </div>
    </template>
  </vmodel>
</template>

<style lang="less" scoped></style>
