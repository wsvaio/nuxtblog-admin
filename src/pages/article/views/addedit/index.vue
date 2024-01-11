<script setup lang="ts">
import { usePayload } from "@wsvaio/use";
import type { FormInst } from "naive-ui";
import { pick } from "@wsvaio/utils";
import type { Payload } from "../..";

const formRef = $ref<FormInst>();
const payload = usePayload<Payload>({
	$mode: "inject",
});
const load = usePayload({
	name: "",
});
const list = useListStore();

load.$use("同步类型")(async () => {
	load.$action(await getArticle({ param: { id: payload.id } }));
});
const submit = async () => {
	await formRef?.validate();
	if (payload.addeditTitle == "添加") {
		await postArticle({
			b: {
				...pick(load, ["title", "content", "tags", "type"]),
			},
		});
	}
	else {
		await putArticle({
			p: {
				id: payload.id,
			},
			b: {
				...pick(load, ["title", "content", "tags", "type"]),
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
		:loading="load.$loading"
		@before-enter="payload.addeditTitle == '修改' && load.$action('同步类型'), list.Types(), list.Tags()"
		@after-leave="load.$reset()"
	>
		<template #header>
			<span>{{ payload.addeditTitle }}</span>
		</template>

		<n-form ref="formRef" :model="load">
			<n-form-item path="title" label="标题" :rule="{ required: true, message: '请输入标题' }">
				<n-input v-model:value="load.title" placeholder="请输入标题" clearable />
			</n-form-item>

			<n-form-item path="type" label="类型" :rule="{ required: true, message: '请选择类型' }">
				<n-select
					:value="load?.type?.name"
					placeholder="请选择类型"
					clearable
					tag
					filterable
					:options="
						list.types?.map(item => ({
							label: item.name,
							value: item.name,
						}))
					"
					to="body"
					@update:value="val => (load.type ? (load.type.name = val) : (load.type = { name: val }))"
				/>
			</n-form-item>

			<n-form-item path="tags" label="标签" :rule="{ required: true, message: '请选择标签' }">
				<n-select
					:value="load.tags?.map(item => item.name)"
					placeholder="请选择标签"
					multiple
					clearable
					tag
					filterable
					:options="
						list.tags.map(item => ({
							label: item.name,
							value: item.name,
						}))
					"
					to="body"
					@update:value="(val: any[]) => (load.tags = val.map(item => ({ name: item })))"
				/>
			</n-form-item>

			<!-- <n-form-item path="content" label="内容" :rule="{ required: true, message: '请输入内容' }">
				<div class="w-full h-512px">
					<markdown-editor v-model="load.content" class="!w-full !h-full" />
				</div>

        <div class="w-full h-512px">
					<wang-editor v-model="load.content" class="!w-full !h-full" />
				</div>
			</n-form-item> -->



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
