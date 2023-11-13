<script setup lang="ts">
import type { ImageProps } from "naive-ui";
import errorImg from "@/assets/img/error-img.svg?url";
import transparentImg from "@/assets/img/transparent.png";

withDefaults(
	defineProps<{
		src?: ImageProps["src"];
		type?: "type1" | "type2";
		objectFit?: ImageProps["objectFit"];
	}>(),
	{
		type: "type1",
		objectFit: "cover",
	}
);
</script>

<template>
	<n-image
		class="vimage"
		:src="src ? src : transparentImg"
		:class="type"
		:fallback-src="errorImg"
		:img-props="{ style: { width: '100%', height: '100%' } }"
		:object-fit="objectFit"
	/>
</template>

<!-- <style scoped lang="less">
.image {
	&.type1 {

	}
}
</style> -->
