<script setup lang="ts"></script>

<template>
	<n-result status="500" title="500 服务器错误" description="服务器出错可能说明该雇更多程序员了" p="48px">
		<template #footer>
			<n-button @click="$router.push('/')">散财消灾</n-button>
		</template>
	</n-result>
</template>

<style lang="less"></style>
