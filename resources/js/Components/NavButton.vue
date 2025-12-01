<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
  href: String,
  active: Boolean,
  color: { type: String, default: 'black' },
});

const classes = computed(() => {
  return `rounded-pill bg-${props.color} p-6 py-2 text-lg px-lg-5 py-lg-2 text-lg-lg`;
});
</script>

<template>
  <Link :href="href" :class="classes">
    <slot />
  </Link>
</template>
