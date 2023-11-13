<script setup lang="ts">
import { usePagination } from "vue-request";
import { NButton, NSpace, NTag } from "naive-ui";
import { usePayload } from "@wsvaio/use";
import AddeditView from "./views/addedit/index.vue";
import type { Payload } from ".";
import SiderHeader from "@/layouts/sider-header/index.vue";

defineOptions({
	name: "",
});

const payload = usePayload<Payload>({
	params: {
		name: "",
		productSubType: "",
		code: "",
	},
	showAddedit: false,
	addeditTitle: "",
	id: "",
	$mode: "provide",
});
const { params } = $(payload);

const { data, pageSize, current, total, refreshAsync, loading } = $(
	usePagination(async pag => {
		return await getArticle({
			q: {
				...pag,
				...params,
			},
		});
	})
);

payload.$use("刷新列表")(async () => refreshAsync());
</script>

<template>
	<sider-header
		:style="{
			height: useSettingStore().type == 'mini' ? undefined : 'var(--container-height)',
		}"
	>
		<template #header>
			<wrapable>
				<n-input v-model:value="params.name" class="!w-256px" placeholder="请输入" />

				<template #suffix>
					<n-button @click="payload.$reset('params'), refreshAsync()">重置</n-button>
					<n-button type="primary" @click="refreshAsync">搜索</n-button>
				</template>
			</wrapable>
		</template>

		<addedit-view />

		<wrapable class="sticky top-0 z-10 bg-[var(--bg-color)]">
			<n-h4 font="bold" m="!0">文章列表</n-h4>
			<template #suffix>
				<n-button type="primary" @click="payload.$action({ showAddedit: true, addeditTitle: '添加' })">添加</n-button>
			</template>
		</wrapable>

		<vtable
			:data="data?.list"
			:loading="loading"
			thead-top="58px"
			:columns="[
				{
					title: '标题',
					key: 'title',
				},
				{
					title: '类型',
					key: 'type.name',
				},
				{
					title: '标签',
					key: 'tags',
					render: rowData =>
						h(
							NSpace,
							{},
							{ default: () => rowData.tags.map(tag => h(NTag, { type: 'primary' }, { default: () => tag.name })) },
						),
				},
				{
					title: '修改时间',
					key: 'updateAt',
				},
				{
					title: '创建时间',
					key: 'createAt',
				},

				{
					title: '操作',
					key: 'id',
					ellipsis: true,
					width: '4em',
					render: rowData =>
						h(
							NButton,
							{
								text: true,
								type: 'primary',
								onClick: () => {
									payload.$action({ showAddedit: true, addeditTitle: '修改', id: rowData.id });
								},
							},
							{ default: () => '修改' },
						),
				},
			]"
		/>
		<vpagination
			v-model:page="current"
			v-model:pageSize="pageSize"
			class="sticky bottom-0 z-10 bg-[var(--bg-color)] mt-auto"
			:item-count="total"
		/>
	</sider-header>
</template>

<style lang="less" scoped></style>
