<script setup lang="ts">
const setting = useSettingStore();
</script>

<template>
	<vrect #="{ height }" class="scrollbar" :class="setting.type">
		<n-spin>
			<n-scrollbar />
		</n-spin>
	</vrect>
</template>

<style lang="less">
.n-scrollbar.scrollbar {
	&.mini {
		overflow: visible;

		& > .n-scrollbar-container {
			overflow: visible;

			& > .n-scrollbar-content {
				height: 100%;
				overflow: visible;
			}
		}
	}
}
</style>
