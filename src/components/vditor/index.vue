<script setup lang="ts">
import { onMounted } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";

let value = $(defineModel<string>("value", { default: "" }));
let vditor = $ref<Vditor>();
watch(
	() => value,
	val => {
		let v = vditor?.getValue();
		if (v !== val) vditor?.setValue(val);
	}
);

onMounted(() => {
	vditor = new Vditor("vditor", {
		after: () => {
			vditor?.setValue(value);
		},
		input(_value) {
			value = _value;
		},
		upload: {
			url: "/api/file",
			fieldName: "file",
			format(_, responseText) {
				let res = JSON.parse(responseText);
				Array.isArray(res) || (res = [res]);
				const succMap: Record<any, any> = {};
				for (const item of res) succMap[item.name] = toFileUrl(item.id);
				return JSON.stringify({
					msg: "",
					code: 0,
					data: {
						errFiles: [],
						succMap,
					},
				});
			},
			max: 1048576 * 100,

		},
	});
});
</script>

<template>
	<div id="vditor" />
</template>

<style></style>
