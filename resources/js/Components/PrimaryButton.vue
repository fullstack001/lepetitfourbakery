<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <v-btn :type="type" color="black" variant="flat">
        <slot />
    </v-btn>
</template>
