<script setup>
import TeamLayout from '@/Layouts/TeamLayout.vue';
import {Head} from "@inertiajs/vue3";
import {ref} from "vue";
const props = defineProps({});

const title = ref('Dashboard');

</script>

<template>

  <TeamLayout title="Dashboard">

    <p class="text-red text-sm uppercase font-bold my-4">redirect admin and bakers to bakery section, redirect front team members to orders section</p>

  </TeamLayout>

</template>