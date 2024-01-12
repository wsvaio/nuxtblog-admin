<script setup lang="ts">
const setting = useSettingStore();
const contentRef = $ref<HTMLDivElement>();
let collapse = $ref(false);
let isNeedCollapse = $ref(false);
let collapseHeight = $ref(0);
let suffixHeight = $ref(0);
let scrollHeight = $ref(0);
let isUpdated = $ref(false);
const updated = () => {
  if (!contentRef) return;
  scrollHeight = contentRef.scrollHeight;
  const offsetTops: number[] = [];

  for (const item of [...(contentRef?.children || [])]) {
    // @ts-expect-error pass
    let top = item.offsetTop + item.clientHeight / 2;
    top = offsetTops.find(sub => Math.abs(sub - top) < 5) || top;
    offsetTops.push(top);
  }
  isNeedCollapse = new Set(offsetTops).size > 1;

  collapseHeight = 0;
  for (const index in offsetTops.filter(item => item == offsetTops[0])) {
    const clientHeight = contentRef.children[index].clientHeight;
    if (clientHeight > collapseHeight) collapseHeight = clientHeight;
  }

  if (collapse) {
    suffixHeight = collapseHeight;
  } else {
    for (const index in offsetTops) {
      if (offsetTops[index] != offsetTops[offsetTops.length - 1]) continue;
      const clientHeight = contentRef.children[index].clientHeight;
      if (clientHeight > suffixHeight) suffixHeight = clientHeight;
    }
  }
  isUpdated = true;
};

useResizeObserver($$(contentRef), updated);

onActivated(() => (isUpdated = false));
</script>

<template>
  <div class="wrapable" :class="[collapse && 'collapse', setting.type]">
    <div
      class="content-box"
      :style="{
        height: isUpdated ? (collapse ? `${collapseHeight}px` : `${scrollHeight}px`) : undefined,
      }"
    >
      <div ref="contentRef" class="content">
        <slot />
      </div>
    </div>
    <div
      class="suffix-box"
      :style="{
        height: isUpdated ? (setting.type != 'mini' ? `${suffixHeight}px` : undefined) : undefined,
      }"
    >
      <slot name="suffix" />
      <div
        v-if="isNeedCollapse"
        cursor="pointer"
        text="[var(--primary-color)] 12px"
        flex="~ items-center"
        @click="collapse = !collapse"
      >
        <span class="align-middle">{{ collapse ? "展开" : "收起" }}</span>
        <div
          class="i-ion:arrow-down-b align-middle arrow transition-all"
          :style="{
            transform: `rotate(${collapse ? '0deg' : '180deg'})`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapable {
  display: grid;
  grid-template-columns: 1fr max-content;
  padding: var(--spacing);
  overflow: hidden;
  gap: var(--spacing);

  & > .content-box {
    overflow: hidden;
    transition: all 0.3s var(--cubic-bezier-ease-in-out);

    & > .content {
      display: flex;
      position: relative;
      flex-wrap: wrap;
      align-items: center;
      align-self: flex-start;
      overflow: hidden;
      gap: var(--spacing);
    }
  }

  & > .suffix-box {
    display: flex;
    align-items: center;
    align-self: end;
    transition: all 0.3s var(--cubic-bezier-ease-in-out);
    gap: 8px;
  }

  &.mini {
    // grid-template-columns: 1fr;
    // grid-template-rows: max-content max-content;
    display: flex;
    flex-wrap: wrap;

    & > .content-box {
      width: min-content;
      white-space: nowrap;
    }

    & > .suffix-box {
      margin-left: auto;
    }
  }
}
</style>
