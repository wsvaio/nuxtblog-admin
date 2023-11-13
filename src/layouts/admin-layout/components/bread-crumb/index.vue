<script setup lang="ts">
withDefaults(defineProps<{
	showIcon?: boolean;
}>(), {
	showIcon: true,
});

const route = useRoute();
const auth = useAuthStore();

const matcheds = computed(() => {
	const result = [] as any[];

	const f = (list?: any[]) => {
		if (!list || !list?.length) return false;
		for (const item of list) {
			if (item.path == route.path || f(item.children)) {
				if (item.path == route.path)
					result.push(route);
				else
					result.push(item);
				return true;
			}
		}
		return false;
	};

	f(auth.routes);

	return result.reverse();
});
</script>

<template>
	<n-breadcrumb>
		<n-breadcrumb-item v-for="item in matcheds">
			<!-- <icon v-if="item.meta.icon && showIcon" :component="h('div', { class: item.meta.icon })" /> -->
			<icones v-if="item.meta.icon && showIcon" :name="item.meta.icon" />
			{{ item.meta.tabName || item.meta.title }}
		</n-breadcrumb-item>
	</n-breadcrumb>
</template>

<style lang="less"></style>
