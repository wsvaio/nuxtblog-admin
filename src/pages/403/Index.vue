<script setup lang="ts"></script>

<template>
	<n-result status="403" title="403 禁止访问" description="总有些门是对你关闭的" p="48px">
		<template #footer>
			<n-button @click="$router.push('/')">放轻松</n-button>
		</template>
	</n-result>
</template>

<style lang="less"></style>
