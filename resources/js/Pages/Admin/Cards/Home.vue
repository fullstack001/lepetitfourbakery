<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head} from "@inertiajs/vue3";
const props = defineProps({
  cards: Object,
});

</script>

<template>
  <AdmLayout title="Gift cards">

    <div v-if="props.cards.data.length > 0">

    </div>
    <div v-else>
        <p>No gift cards were purchased at this time.</p>
    </div>

  </AdmLayout>
</template>