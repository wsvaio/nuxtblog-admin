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
});

load.$use("同步标签")(async () => {
	load.$action(await getTag({ param: { id: payload.tagId } }));
});
const submit = async () => {
	await formRef?.validate();
	if (payload.addeditTitle == "添加") {
		await postTag({
			p: {
				id: payload.tagId,
			},
			b: {
				name: load.name,
			},
		});
	}
	else {
		await putTag({
			p: {
				id: payload.tagId,
			},
			b: {
				name: load.name,
			},
		});
	}
	payload.$action({
		$name: "刷新标签列表",
		showAddedit: false,
	});
};
</script>

<template>
	<vmodel
		v-model:show="payload.showAddedit"
		width="var(--sm)"
		:loading="load.$loading"
		@before-enter="payload.addeditTitle == '修改' && load.$action('同步标签')"
		@after-leave="load.$reset('name')"
	>
		<template #header>
			<span>{{ payload.addeditTitle }}</span>
		</template>

		<n-form ref="formRef" :model="load">
			<n-form-item path="name" label="标签名称" :rule="{ required: true, message: '请输入标签名称' }">
				<n-input v-model:value="load.name" placeholder="请输入标签名称" clearable />
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
