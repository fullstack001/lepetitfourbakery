<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
// delivery day
const showDeliveryDayModal = ref(false);
const selectedDeliveryDay = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const formDeliveryDay = reactive({
  day: null,
});
const openDeliveryDay = (day = null) => {
  local_errors.value = {};
  if(day) {
    modalTitle.value = 'Edit delivery day';
    selectedDeliveryDay.value = day;
    formDeliveryDay.day = day;
    saveButtonText.value = 'Save delivery day';
    showDeliveryDayModal.value = true;
  }
};

const closeDeliveryDay = () => {
  showDeliveryDayModal.value = false;
  selectedDeliveryDay.value = null;
};

const local_errors = ref({});

const saveDeliveryDay = () => {
  let url;
  if(selectedDeliveryDay.value) {
    url = route('update_delivery_day')
    router.post(url, formDeliveryDay, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (page) => {
        closeDeliveryDay();
      },
      onError: (error) => {
        local_errors.value = props.errors;
      }
    });
  }
};
//end delivery day

defineExpose({ openDeliveryDay });

</script>

<template>

<DialogModal
  :show="showDeliveryDayModal"
  @close="closeDeliveryDay"
>
  <template #title>
    {{ modalTitle }}
  </template>
  <template #content>

    <div class="flex flex-row items-center justify-center">
      <v-radio-group v-model="formDeliveryDay.day" inline>
        <v-radio label="Friday" value="friday" />
        <v-radio label="Saturday" value="saturday" />
      </v-radio-group>
    </div>

  </template>
  <template #footer>
    <PrimaryButton
      @click="saveDeliveryDay"
      class="me-3"
    >{{ saveButtonText }}</PrimaryButton>
    <SecondaryButton
      @click="closeDeliveryDay"
    >Cancel</SecondaryButton>
  </template>
</DialogModal>

</template>