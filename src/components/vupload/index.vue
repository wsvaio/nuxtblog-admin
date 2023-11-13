<script setup lang="ts">
const { VITE_BASE_API, DEV } = import.meta.env;

const id = defineModel<string>("id");
const url = defineModel<string>("url");

const action = `${DEV ? "/api" : VITE_BASE_API}/file/upload-pic-file`;
</script>

<template>
	<n-upload
		:action="action"
		list-type="image-card"
		name="multipartFile"
		:default-file-list="url ? [
			{ name: url, url, status: 'finished', id: url },
		] : []"
		:max="1"
		response-type="json"
		@finish="
			({ file, event }) => {
				const data = (event?.target as XMLHttpRequest).response?.data;
				file.url = data?.completeUrl;
				id = data?.id;
				url = data?.completeUrl;

				return file;
			}
		"
		@remove="(id = ''), (url = '')"
	>
		+
	</n-upload>
</template>

<style lang="less" scoped></style>
