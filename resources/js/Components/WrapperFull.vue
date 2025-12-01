<script setup>
import {Head} from "@inertiajs/vue3";
const props = defineProps({
  wrapper: { type: String, default: 'wrapper' },
  background: { type: String, default: 'rgba(255, 255, 255, 0)' },
});

</script>

<template>

  <div :class="props.wrapper" :style="`background: ${props.background}`">
    <div class=" w-full mx-auto">
      <slot />
    </div>
  </div>

</template>