<script setup lang="ts">
const collapsed = defineModel<boolean>();
</script>

<template>
	<n-button text class="h-full px-12px !hover:(bg-[var(--button-color2-hover)])" @click="collapsed = !collapsed">
		<template #icon>
			<!-- <div :class="[!collapsed ? 'i-line-md:menu-fold-left' : 'i-line-md:menu-unfold-right']" /> -->
			<svg v-if="!collapsed" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
				<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
					<path stroke-dasharray="10" stroke-dashoffset="10" d="M7 9L4 12L7 15">
						<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="10;0" />
					</path>
					<path stroke-dasharray="16" stroke-dashoffset="16" d="M19 5H5">
						<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
					</path>
					<path stroke-dasharray="12" stroke-dashoffset="12" d="M19 12H10">
						<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="12;0" />
					</path>
					<path stroke-dasharray="16" stroke-dashoffset="16" d="M19 19H5">
						<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="16;0" />
					</path>
				</g>
			</svg>

			<svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
				<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
					<path stroke-dasharray="10" stroke-dashoffset="10" d="M17 9L20 12L17 15">
						<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="10;0" />
					</path>
					<path stroke-dasharray="16" stroke-dashoffset="16" d="M5 5H19">
						<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
					</path>
					<path stroke-dasharray="12" stroke-dashoffset="12" d="M5 12H14">
						<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="12;0" />
					</path>
					<path stroke-dasharray="16" stroke-dashoffset="16" d="M5 19H19">
						<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="16;0" />
					</path>
				</g>
			</svg>
		</template>
	</n-button>
</template>
