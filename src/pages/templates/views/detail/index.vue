<script setup lang="ts">
import { usePayload } from "@wsvaio/use";
import { useRequest } from "vue-request";
import type { Payload } from "../..";

const payload = usePayload<Payload>({
	showDetail: false,
	$mode: "inject",
});

const { data, refreshAsync, loading } = useRequest(
	async () => {
		return {};
	},
	{
		manual: true,
	}
);
</script>

<template>
	<vmodel v-model:show="payload.showDetail" :loading="loading" @before-enter="refreshAsync" @after-leave="data = {}">
		<template #header>
			<span>详情</span>
		</template>

		<h1>呵呵</h1>
	</vmodel>
</template>

<style lang="less" scoped></style>
