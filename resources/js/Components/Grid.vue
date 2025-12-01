<script setup>

const props = defineProps({
  'cols': { type: String, default: '1' },
  'md': { type: String, default: '2' },
  'lg': { type: String, default: '2' },
  'xl': { type: String, default: '2' },
  '2xl': { type: String, default: '2' },
  'gap': { type: String, default: '3' },
});

</script>

<template>

  <div :class="`grid w-full grid-cols-${props['cols']} md:grid-cols-${props['md']} lg:grid-cols-${props['']} xl:grid-cols-${props['lg']} 2xl:grid-cols-${props['2xl']} gap-${props['gap']}`">

    <slot />

  </div>

</template>