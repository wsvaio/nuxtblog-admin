<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IEditorConfig } from "@wangeditor/editor";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const modleValue = defineModel<string>();

const toolbarConfig = {};
// const editorConfig = { placeholder: "请输入内容..." };

const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    uploadImage: {
      // 自定义上传
      async customUpload(file: File, insertFn) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await upload({ body: formData });
        insertFn(toFileUrl(result.id));
      },
    },
    uploadVideo: {
      // 自定义上传
      async customUpload(file: File, insertFn) {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        const result = await upload({ body: formData });
        insertFn(toFileUrl(result.id));
      },
    },
  },
};

const mode = "default";

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};



</script>

<template>
  <div style="box-sizing: border-box; border: 1px solid #ccc" flex="~ col" >
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor flex="1" v-model="modleValue" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" overflow="hidden" />
  </div>
</template>

<style lang="less" scoped></style>
