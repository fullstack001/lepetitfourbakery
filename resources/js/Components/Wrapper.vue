<script setup>
import {Head} from "@inertiajs/vue3";
const props = defineProps({
  wrapper: { type: String, default: 'wrapper' },
  background: { type: String, default: 'rgba(255, 255, 255, 0)' },
  maxWidth: { type: String, default: 'max-w-6xl' },
});

</script>

<template>

  <div :class="props.wrapper" :style="`background: ${props.background}`">
    <div class="mx-auto p-5 lg:p-20 py-6" :class="maxWidth">
      <slot />
    </div>
  </div>

</template>

<style scoped>
.section {
  padding: 90px 0;
}
</style>