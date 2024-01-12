<script setup lang="ts">
import { sleep } from "@wsvaio/utils";
import Vditor from "vditor";
import "vditor/dist/index.css";

let value = $(defineModel<string>({ default: "" }));
let vditor = $ref<Vditor>();
const vditorRef = $ref<HTMLDivElement>();
let isVditorInit = $ref(false);
// watch(
//   () => value,
//   val => {
//     if (!isVditorInit) return;
//     let v = vditor?.getValue();
//     if (val && v !== val) vditor?.setValue(val);
//   }
// );

onMounted(() => {
  if (!vditorRef) return;
  console.log(vditorRef, '1');
  vditor = new Vditor(vditorRef, {
    after: () => {
      vditor?.setValue(value);
      isVditorInit = true;
    },
    input(_value) {
      value = _value;
    },
    toolbarConfig: {
      pin: true,
    },
    cache: {
      enable: false,
      id: '6'
    },
    upload: {
      url: "/api/file",
      fieldName: "file",
      format(_, responseText) {
        let res = JSON.parse(responseText);
        Array.isArray(res) || (res = [res]);
        const succMap: Record<any, any> = {};
        for (const item of res) succMap[item.name] = toFileUrl(item.id);
        return JSON.stringify({
          msg: "",
          code: 0,
          data: {
            errFiles: [],
            succMap,
          },
        });
      },
      max: 1048576 * 100,
    },
  });
});
</script>

<template>
  <div id="vditor" ref="vditorRef" />
</template>

<style></style>
