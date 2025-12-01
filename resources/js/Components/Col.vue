<script setup>

const props = defineProps({
  justify: { type: String, default: 'start' },
  gap: { type: String, default: '1' },
  center: { type: Boolean, default: false },
  full: { type: Boolean, default: false },
});

</script>

<template>

  <div class="flex flex-col w-full"
       :class="{
      [`justify-${props.justify}`]: true,
      [`gap-${props.gap}`]: true,
      'items-center': props.center,
      'h-full': props.full,
         }"
  >

    <slot />

  </div>

</template>