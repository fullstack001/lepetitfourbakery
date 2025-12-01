<script setup>
import {Head} from "@inertiajs/vue3";
const props = defineProps({
  title: String,
});

</script>

<template>

  <div class="text-center">
    <div>
      <h1 class="text-5xl"><slot /></h1>
      <div v-if="$slots.description" class="mt-10">
        <p class="text-xl"><slot name="description" /></p>
      </div>
    </div>
  </div>

</template>