import { defineStore } from "pinia";

export default defineStore("list", () => ({
	types: [] as any[],
	async Types() {
		this.types = await getType();
	},
	tags: [] as any[],
	async Tags() {
		this.tags = await getTag();
	}
}));
