<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import {ref} from "vue";

const props = defineProps({
  errors: Object,
});

const termsModal = ref(null);
const privacyModal = ref(null);

</script>

<template>
  <AdmLayout title="Content">

    <Col gap="4">
      <div>
        <v-btn
            @click.prevent="$inertia.visit(route('admin.terms'))">Terms & Conditions</v-btn>
      </div>
      <div>
        <v-btn
            @click.prevent="$inertia.visit(route('admin.privacy'))">Privacy Policy</v-btn>
      </div>
    </Col>

  </AdmLayout>
</template>
