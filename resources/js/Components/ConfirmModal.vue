<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
// confirm
const showConfirmModal = ref(false);
const selectedConfirm = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const props = defineProps({
  title: null,
  text: null,
});
const openConfirm = () => {
  modalTitle.value = props.title;
  saveButtonText.value = props.text;
  showConfirmModal.value = true;
};

const closeConfirm = () => {
  showConfirmModal.value = false;
  emit('close');
};

const saveConfirm = () => {
  emit('confirm');
};
//end confirm

defineExpose({ openConfirm, closeConfirm });

const emit = defineEmits(['confirm', 'close']);
</script>

<template>

    <DialogModal
      :show="showConfirmModal"
      @close="closeConfirm"
    >
      <template #title>
        Please confirm
      </template>
      <template #content>
        {{ modalTitle }}
      </template>
      <template #footer>
        <PrimaryButton
          @click="saveConfirm"
          class="me-3"
        >{{ saveButtonText }}</PrimaryButton>
        <SecondaryButton
          @click="closeConfirm"
        >Cancel</SecondaryButton>
      </template>
    </DialogModal>

</template>