<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {router} from "@inertiajs/vue3";
import SecondaryButton from "@/Components/SecondaryButton.vue";
const props = defineProps({
    entities: Object,
});

//VARIABLES

//FORMS

//FUNCTIONS

</script>

<template>
    <div class="pagination">

        <div class="flex justify-center mt-5 mb-3">
            <span>Page {{ props.entities.current_page }} of {{ props.entities.last_page }}</span>
        </div>

        <div class="flex justify-center">
            <SecondaryButton
                class="mx-2"
                v-if="props.entities.prev_page_url"
                @click="router.visit(props.entities.prev_page_url)"
            >
                Previous
            </SecondaryButton>
            <SecondaryButton
                class="mx-2"
                v-if="props.entities.next_page_url"
                @click="router.visit(props.entities.next_page_url)"
            >
                Next
            </SecondaryButton>
        </div>
    </div>
</template>


