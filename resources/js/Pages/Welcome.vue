<script setup>
import {Head, router} from "@inertiajs/vue3";
import Wrapper from "@/Components/Wrapper.vue";
import {ref} from "vue";

const props = defineProps({
  errors: Object,
});

const key = ref(null);

const local_errors = ref({});

const resetErrors = () => {
  local_errors.value = {};
};

const validateKey = () => {
    router.post(route('validate_key'), {
      key: key.value,
    }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (response) => {

        },
        onError: (error) => {
            local_errors.value = props.errors;
        }
    });
};

</script>

<template>

  <Head title="Welcome" />


    <div class="my-20 py-20 max-w-lg mx-auto text-center">

      <v-label class="mb-3">Password:</v-label>
      <v-text-field
          @keyup="resetErrors"
          v-model="key" />
      <v-btn
          @click.prevent="validateKey"
          class="rounded-pill">Enter</v-btn>

      <div class="my-10">
        <div v-for="error in local_errors">
          <p class="text-red">{{ error }}</p>
        </div>
      </div>

    </div>


  

</template>