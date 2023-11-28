<script setup lang="ts">
import { usePagination } from "vue-request";
import { NButton, NImage, NPopconfirm } from "naive-ui";
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
		return await getMusic({
			q: {
				...pag,
				...params,
			},
		});
	})
);

payload.$use("刷新列表")(async () => refreshAsync());
payload.$use("删除")(async () => {
	await delMusic({ p: { id: payload.id } });
	await refreshAsync();
});
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
			<n-h4 font="bold" m="!0">类型列表</n-h4>
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
					title: '封面图片',
					key: 'coverId',
					render: (rowData) => h(NImage, { src: toFileUrl(rowData.coverId), width: 100, height: 100 }),
				},
				{
					title: '名称',
					key: 'name',
				},
				{
					title: '艺术家',
					key: 'artist',
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
					width: '6.5em',
					render: rowData => [
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

						h(
							NPopconfirm,
							{
								onPositiveClick: () => {
									payload.$action({ $name: '删除', id: rowData.id });
								},
							},
							{
								default: () => h('span', '确定删除？'),
								trigger: () =>
									h(
										NButton,
										{
											text: true,
											type: 'error',
											class: 'ml-0.5em',
											onClick: () => {},
										},
										{ default: () => '删除' },
									),
							},
						),
					],
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
