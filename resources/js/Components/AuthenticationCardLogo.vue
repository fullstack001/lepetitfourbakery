<script setup>
import { Link } from '@inertiajs/vue3';
import Logo from "@/Components/Logo.vue";
</script>

<template>
    <Link :href="'/'">
      <div>
        <Logo class="mx-auto" style="width: 207px;" />
      </div>
    </Link>
</template>
