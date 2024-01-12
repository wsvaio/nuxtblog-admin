<script setup lang="ts">
import { useAction, usePload } from "@wsvaio/use";
import type { Pload, Action } from "../../";



const pload = usePload<Pload>({ $mode: "inject" });
const action = useAction<Action>({ $mode: "inject" });
</script>

<template>
  <wrapable>
    <n-input v-model:value="pload.params.name" class="!w-256px" placeholder="请输入" />

    <template #suffix>
      <n-button @click="pload.$reset('params'), action.act('刷新表格')">重置</n-button>
      <n-button type="primary" @click="action.act('刷新表格')">搜索</n-button>
    </template>
  </wrapable>
</template>

<style lang="less" scoped></style>
