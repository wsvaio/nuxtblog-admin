<script setup lang="ts">
import { usePagination } from "vue-request";
import { usePayload } from "@wsvaio/use";
import { NButton, NText } from "naive-ui";
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

	showDetail: false,

	$mode: "provide",
});
const { params } = $(payload);
const list = useListStore();
const { data, pageSize, current, total, refreshAsync, loading } = $(
	usePagination(async () => {
		return {
			list: [],
		};
	})
);
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

		<detail-view />

		<wrapable class="sticky top-0 z-10 bg-[var(--bg-color)]">
			<n-h4 font="bold" m="!0">智慧设备列表</n-h4>

			<template #suffix />
		</wrapable>

		<vtable
			:data="data?.list"
			:loading="loading"
			thead-top="58px"
			:columns="[
				{
					title: '设备名称',
					key: 'name',
				},
				{
					title: '所属单位',
					key: 'companyName',
				},

				{
					title: '所属场地',
					key: 'storeName',
				},
				{
					title: '经度纬度',
					key: 'locationLongitude',
					render: rowData => h('span', `${rowData.locationLongitude}, ${rowData.locationLatitude}`),
				},
				{
					title: '设备类型',
					key: 'productSubType',
				},
				{
					title: '设备序列号',
					key: 'code',
				},
				{
					title: '在线状态',
					key: 'state',
					render: rowData => {
						const finded = list.deviceStates.find(item => item.value === rowData.state);
						return h(NText, { type: finded?.type }, { default: () => finded?.label });
					},
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
									payload.$action({ showDetail: true, id: rowData.id });
								},
							},
							{ default: () => '详情' },
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
