<script setup lang="ts">
import { usePayload } from "@wsvaio/use";
import type { FormInst } from "naive-ui";
import type { Payload } from "../..";

const formRef = $ref<FormInst>();
const payload = usePayload<Payload>({
	$mode: "inject",
});
const load = usePayload({
	name: "",
	artist: "",
	coverId: 0,
	fileId: 0,
	lrcId: 0,
});

load.$use("同步类型")(async () => {
	load.$action(await getMusic({ param: { id: payload.id } }));
});
const submit = async () => {
	await formRef?.validate();
	if (payload.addeditTitle == "添加") {
		await postMusic({
			b: {
				name: load.name,
				artist: load.artist,
				coverId: load.coverId,
				fileId: load.fileId,
				lrcId: load.lrcId,
			},
		});
	}
	else {
		await putMusic({
			p: {
				id: payload.id,
			},
			b: {
				name: load.name,
				artist: load.artist,
				coverId: load.coverId,
				fileId: load.fileId,
				lrcId: load.lrcId,
			},
		});
	}
	payload.$action({
		$name: "刷新列表",
		showAddedit: false,
	});
};
</script>

<template>
	<vmodel
		v-model:show="payload.showAddedit"
		width="var(--sm)"
		:loading="load.$loading"
		@before-enter="payload.addeditTitle == '修改' && load.$action('同步类型')"
		@after-leave="load.$reset()"
	>
		<template #header>
			<span>{{ payload.addeditTitle }}</span>
		</template>

		<n-form ref="formRef" :model="load">
			<n-form-item path="name" label="名称" :rule="{ required: true, message: '请输入名称' }">
				<n-input v-model:value="load.name" placeholder="请输入名称" clearable />
			</n-form-item>
			<n-form-item path="artist" label="艺术家" :rule="{ required: true, message: '请输入艺术家' }">
				<n-input v-model:value="load.artist" placeholder="请输入艺术家" clearable />
			</n-form-item>

			<n-form-item path="coverId" label="封面图片" :rule="{ required: true, message: '请上传封面图片' }">
				<vupload
					list-type="image-card"
					:model-value="load.coverId ? [load.coverId] : []"
					:upload-props="{ max: 1, accept: 'image/*' }"
					@update:model-value="([val]) => (load.coverId = val)"
				/>
			</n-form-item>

			<n-form-item path="fileId" label="音频文件" :rule="{ required: true, message: '请上传音频文件' }">
				<vupload
					:model-value="load.fileId ? [load.fileId] : []"
					:upload-props="{ max: 1, accept: 'audio/*', directoryDnd: true }"
					@update:model-value="([val]) => (load.fileId = val)"
				/>
			</n-form-item>

			<n-form-item path="lrcId" label="歌词文件" :rule="{ required: true, message: '请上传歌词文件' }">
				<vupload
					:model-value="load.lrcId ? [load.lrcId] : []"
					:upload-props="{ max: 1, accept: '*', directoryDnd: true }"
					@update:model-value="([val]) => (load.lrcId = val)"
				/>
			</n-form-item>
		</n-form>

		<template #footer>
			<div flex="~" justify="center">
				<n-button type="primary" px="2em" @click="submit">保存</n-button>
				<n-button px="2em" ml="1em" @click="payload.showAddedit = false">取消</n-button>
			</div>
		</template>
	</vmodel>
</template>

<style lang="less" scoped></style>
