<script setup lang="ts">
import { usePload } from "@wsvaio/use";
import { FormInst } from "naive-ui";
import { useRequest } from "vue-request";

const formRef = $ref<FormInst>();

let modelValue = $(defineModel<boolean>());
const load = usePload<Record<any, any>>({});
const auth = useAuthStore();
const feedback = useFeedbackStore();
const { runAsync: submit, loading } = useRequest(
  async () => {
    await formRef?.validate();
    await auth.login(load);
  },
  {
    manual: true,
    onSuccess() {
      feedback.message.success("登录成功");
      modelValue = false;
    },
  }
);
</script>

<template>
  <vmodel v-model:show="modelValue" :loading="loading" title="登录" @after-leave="load.$reset()">
    <n-form ref="formRef" :model="load">
      <n-form-item path="username" label="用户名" :rule="{ required: true, message: '请输入用户名' }">
        <n-input v-model:value="load.username" placeholder="请输入用户名" clearable />
      </n-form-item>

      <n-form-item path="password" label="密码" :rule="{ required: true, message: '请输入密码' }">
        <n-input
          v-model:value="load.password"
          type="password"
          show-password-toggle
          placeholder="请输入密码"
          clearable
          @keydown.enter="submit"
        />
      </n-form-item>
    </n-form>

    <template #footer>
      <div flex="~" justify="center">
        <n-button type="primary" px="2em" @click="submit">登录</n-button>
        <n-button px="2em" ml="1em" @click="modelValue = false">取消</n-button>
      </div>
    </template>
  </vmodel>
</template>

<style lang="less" scoped></style>
