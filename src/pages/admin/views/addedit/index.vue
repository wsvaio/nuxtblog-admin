<script setup lang="ts">
import { useAction, usePload } from "@wsvaio/use";
import type { Pload, Action } from "../../";



const pload = usePload<Pload>({ $mode: "inject" });
const action = useAction<Action>({ $mode: "inject" });


</script>

<template>
	<vmodel v-model:show="pload.showAddedit" >
		<template #header>
			<span>详情</span>
		</template>

		<h1>呵呵</h1>
	</vmodel>
</template>

<style lang="less" scoped></style>
