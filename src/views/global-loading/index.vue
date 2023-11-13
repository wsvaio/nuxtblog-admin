<script setup lang="ts"></script>

<template>
	<div class="global-loading">
		<div class="loader" />
	</div>
</template>

<style lang="less" scoped>
.global-loading {
	@keyframes jump7456 {
		15% {
			border-bottom-right-radius: 3px;
		}

		25% {
			transform: translateY(9px) rotate(22.5deg);
		}

		50% {
			transform: translateY(18px) scale(1, 0.9) rotate(45deg);
			border-bottom-right-radius: 40px;
		}

		75% {
			transform: translateY(9px) rotate(67.5deg);
		}

		100% {
			transform: translateY(0) rotate(90deg);
		}
	}

	@keyframes shadow324 {
		0%,
		100% {
			transform: scale(1, 1);
		}

		50% {
			transform: scale(1.2, 1);
		}
	}

	position:fixed;
	inset: 0;
	z-index: 999;

	.loader {
		position: relative;
		width: 48px;
		height: 48px;
		margin: auto;
	}

	.loader::before {
		content: "";
		position: absolute;
		top: 60px;
		left: 0;
		width: 48px;
		height: 5px;
		animation: shadow324 0.5s linear infinite;
		border-radius: 50%;
		background: #f0808050;
	}

	.loader::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		animation: jump7456 0.5s linear infinite;
		border-radius: 4px;
		background: #f08080;
	}
}
</style>
