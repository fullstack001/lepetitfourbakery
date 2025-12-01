<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
// address
const showAddressModal = ref(false);
const selectedAddress = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const props = defineProps({
  errors: Object,
});

const formAddress = reactive({
  phone: '',
  full_name: '',
  address_1: '',
  address_2: '',
  post_code: '',
  city: '',
});
const openAddress = () => {
  local_errors.value = {};
  modalTitle.value = 'Edit address';
  selectedAddress.value = null;
  formAddress.name = null;
  saveButtonText.value = 'Save address';
  axios.get(route('get_address'))
      .then(response => {
        formAddress.phone = response.data.phone;
        formAddress.full_name = response.data.full_name;
        formAddress.address_1 = response.data.address_1;
        formAddress.address_2 = response.data.address_2;
        formAddress.post_code = response.data.post_code;
        formAddress.city = response.data.city;
        showAddressModal.value = true;
      })
      .catch(error => {
          console.error('error');
      });
};

const closeAddress = () => {
  showAddressModal.value = false;
  selectedAddress.value = null;
};

const local_errors = ref({});

const saveAddress = () => {
  const url = route('update_address')
  router.post(url, formAddress, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      closeAddress();
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};
//end address

defineExpose({ openAddress });

</script>

<template>

    <DialogModal
      :show="showAddressModal"
      @close="closeAddress"
    >
      <template #title>
        {{ modalTitle }}
      </template>
      <template #content>
        <div>
          <v-label>Recipient name</v-label>
          <v-text-field density="compact" v-model="formAddress.full_name"
            :error-messages="local_errors.full_name"
          />
        </div>

        <div>
          <v-label>Address line 1</v-label>
          <v-text-field density="compact" v-model="formAddress.address_1"
            :error-messages="local_errors.address_1"
          />
        </div>

        <div>
          <v-label>Address line 2</v-label>
          <v-text-field density="compact" v-model="formAddress.address_2"
            :error-messages="local_errors.address_2"
          />
        </div>

        <div>
          <v-label>City</v-label>
          <v-text-field density="compact" v-model="formAddress.city"
            :error-messages="local_errors.city"
          />
        </div>

        <div>
          <v-label>Post code</v-label>
          <v-text-field density="compact" v-model="formAddress.post_code"
            :error-messages="local_errors.post_code"
          />
        </div>

        <div>
          <v-label>Phone</v-label>
          <v-text-field density="compact" v-model="formAddress.phone"
            :error-messages="local_errors.phone"
          />
        </div>

      </template>
      <template #footer>
        <PrimaryButton
          @click="saveAddress"
          class="me-3"
        >{{ saveButtonText }}</PrimaryButton>
        <SecondaryButton
          @click="closeAddress"
        >Cancel</SecondaryButton>
      </template>
    </DialogModal>

</template>