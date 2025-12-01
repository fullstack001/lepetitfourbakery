<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head} from "@inertiajs/vue3";
import {ref} from "vue";
const props = defineProps({});

const title = ref('Dashboard');

</script>

<template>

  <AdmLayout title="Dashboard">

    <p>Select a section in the sidebar to start.</p>

  </AdmLayout>

</template>