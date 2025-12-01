<script setup>

const props = defineProps({
  error_text: { type: String, default: null },
});

</script>

<template>

    <div v-if="props.error_text"
         class="fixed bottom-0 right-0 p-10 bg"
         style="z-index: 999000;"
    >

        <p class="bg-red-darken-1 px-5 py-2">{{ props.error_text }}</p>

    </div>

</template>