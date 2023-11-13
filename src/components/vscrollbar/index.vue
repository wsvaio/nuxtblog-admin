<script setup lang="ts">
import { useElementEvent } from "@wsvaio/use";

const vscrollbarRef = $ref<HTMLDivElement>();
const scrollbarRef = $ref<HTMLDivElement>();
const setting = useSettingStore();
let pointerdown = $ref(false);

const update = () => {
	if (!scrollbarRef || !vscrollbarRef || pointerdown) return;
	const ratio = vscrollbarRef.clientHeight / vscrollbarRef.scrollHeight;
	scrollbarRef.style.height = `${ratio * vscrollbarRef.clientHeight}px`;
	scrollbarRef.style.top = `${ratio * vscrollbarRef.scrollTop}px`;
};

const etadpu = (ev: PointerEvent) => {
	if (!scrollbarRef || !vscrollbarRef || !pointerdown) return;

	const ratio = vscrollbarRef.clientHeight / vscrollbarRef.scrollHeight;

	scrollbarRef.style.top = `${Number.parseInt(scrollbarRef.style.top) + ev.movementY}px`;

	if (Number.parseInt(scrollbarRef.style.top) < 0) scrollbarRef.style.top = "0px";
	else if (Number.parseInt(scrollbarRef.style.top) > vscrollbarRef.clientHeight - scrollbarRef.clientHeight)
		scrollbarRef.style.top = `${vscrollbarRef.clientHeight - scrollbarRef.clientHeight}px`;

	vscrollbarRef.scrollTop = Number.parseInt(scrollbarRef.style.top) / ratio;
};

const windowEvent = useElementEvent(window);
windowEvent.on("pointerup", () => (pointerdown = false));
windowEvent.on("pointermove", ev => etadpu(ev as PointerEvent));

useResizeObserver($$(vscrollbarRef), update);
</script>

<template>
	<article ref="vscrollbarRef" class="vscrollbar hide-scrollbar" :class="setting.type" @scroll="update">
		<slot />
		<div ref="scrollbarRef" class="scrollbar" @pointerdown="pointerdown = true" />
	</article>
</template>

<style lang="less" scoped>
.vscrollbar {
	position: relative;
	overflow: auto;

	& > .scrollbar {
		position: fixed;
		z-index: 9999;
		top: 0;
		right: 4px;
		width: 5px;
		border-radius: 5px;
		background-color: red;
		user-select: none;
	}

	&.mini {
		overflow: visible;

		& > .scrollbar {
			display: none;
		}
	}
}
</style>
