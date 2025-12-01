<script setup>
const props = defineProps({
  justify: { type: String, default: 'start' },
  gap: { type: String, default: '3' },
  wrap: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
  full: { type: Boolean, default: false },
});
</script>

<template>
  <div
      class="flex flex-row flex-wrap"
      :class="{
      [`justify-${props.justify}`]: true,
      [`gap-${props.gap}`]: true,
      'flex-wrap': props.wrap,
      'items-center': props.center,
      'w-full': props.full,
    }"
  >
    <slot />
  </div>
</template>
