<script setup lang="ts"></script>

<template>
	<n-scrollbar class="header-footer">
		<header>
			<slot name="header" />
		</header>
		<section>
			<slot />
		</section>
		<footer>
			<slot name="footer" />
		</footer>
	</n-scrollbar>
</template>

<style lang="less">
.n-scrollbar.header-footer {
	& > .n-scrollbar-container {
		& > .n-scrollbar-content {
			display: flex;
			flex-direction: column;
			min-height: 100%;

			& > header {
				position: sticky;
				z-index: 10;
				top: 0;
				flex: none;
			}

			& > section {
				flex: 1 1 0;
			}

			& > footer {
				position: sticky;
				z-index: 10;
				bottom: 0;
				flex: none;
			}
		}
	}

	& > .n-scrollbar-rail {
		z-index: 20;
	}
}
</style>
