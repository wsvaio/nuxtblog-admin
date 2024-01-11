<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const modelValue = defineModel<string>();

const onUploadImg = async (files, callback) => {
	const res = await Promise.all(
		files.map(file => {
			return new Promise((resolve, reject) => {
				const form = new FormData();
				form.append("file", file);

				upload({
					body: form,
				})
					.then(res => resolve(res))
					.catch(error => reject(error));
			});
		})
	);

	callback(res.map(item => toFileUrl(item.id)));
};
</script>

<template>
	<md-editor v-model="modelValue" @on-upload-img="onUploadImg" />
</template>

<style lang="less" scoped></style>
