<script lang="ts" setup>
import type { UploadFileInfo, UploadInst, UploadProps } from "naive-ui";
import type { OnFinish } from "naive-ui/es/upload/src/interface";

defineProps<{
	uploadProps?: UploadProps;

}>();
const { VITE_BASE_API, DEV } = import.meta.env;
const action = `${DEV ? "/api" : VITE_BASE_API}/file`;
const uploadRef = $ref<UploadInst>();
let modelValue = $(defineModel<number[]>({ default: [] }));
const map = reactive(new Map<number, UploadFileInfo>());

let fileList = $ref<UploadFileInfo[]>([]);
watch(
	() => modelValue,
	async (val, oldVal) => {
		if (!modelValue || !modelValue?.length || oldVal.join("") == val.join("")) return;
		for (const id of modelValue) {
			if (!map.get(id)) {
				const fileInfo = await getFile({
					p: { id },
				});
				map.set(id, {
					id: fileInfo.id,
					name: fileInfo.name,
					type: fileInfo.type,
					status: "finished",
					url: toFileUrl(fileInfo.id),
				});
			}
		}

		fileList = modelValue.map(item => map.get(item)!);
	},

);

const handleFinish: OnFinish = ({ file, event }) => {
	console.log(file, event);
	if (!event) return;
	const res = JSON.parse((event?.target as any)?.response);
	file.url = toFileUrl(res.id);
	map.set(res.id, file);
	if (!modelValue.includes(res.id))
		modelValue = [...modelValue, res.id];

	return file;
};

const handleRemove = ({ file }) => {
	for (const [k, v] of map.entries()) {
		if (v.id == file.id) {
			let t = [...modelValue];
			t.splice(modelValue.indexOf(k), 1);
			modelValue = t;
		}
	}
};
</script>

<template>
	<n-upload
		ref="uploadRef"
		v-model:file-list="fileList"

		:action="action"
		:="uploadProps"
		@finish="handleFinish"
		@remove="handleRemove"
	>
		<slot>
			<n-upload-dragger v-if="uploadProps?.directoryDnd">
				<div style="margin-bottom: 12px">
					<n-icon size="48" :depth="3">
						<div class="i-solar-archive-up-broken" />
					</n-icon>
				</div>
				<n-text style="font-size: 16px">
					点击或者拖动文件到该区域来上传
				</n-text>
				<n-p depth="3" style="margin: 8px 0 0">
					请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
				</n-p>
			</n-upload-dragger>
		</slot>
	</n-upload>
</template>
