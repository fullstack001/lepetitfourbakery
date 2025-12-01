<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
});
</script>

<template>
    <v-btn :type="type" color="black" variant="outlined">
        <slot />
    </v-btn>
</template>
