<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
// post code
const showPostCodeModal = ref(false);
const selectedPostCode = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const props = defineProps({
  errors: Object,
});

const formPostCode = reactive({
  post_code: '',
  extra_fee: 0,
  active: 1,
});
const openPostCode = (post_code = null) => {
  local_errors.value = {};
  if(post_code) {
    modalTitle.value = 'Edit post code';
    selectedPostCode.value = post_code;
    formPostCode.post_code = post_code.post_code;
    formPostCode.extra_fee = post_code.extra_fee;
    formPostCode.active = post_code.active ? 1 : 0;
  } else {
    modalTitle.value = 'Create post code';
    selectedPostCode.value = null;
    formPostCode.post_code = '';
    formPostCode.extra_fee = 0;
    formPostCode.active = 1;
  }
  saveButtonText.value = 'Save post code';
  showPostCodeModal.value = true;
};

const closePostCode = () => {
  showPostCodeModal.value = false;
  selectedPostCode.value = null;
};

const local_errors = ref({});

const savePostCode = () => {
  let url;
  if(selectedPostCode.value) {
    url = route('admin.update_post_code',{post_code: selectedPostCode.value.uid})
  } else {
    url  = route(`admin.create_post_code`);
  }
  router.post(url, formPostCode, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      closePostCode();
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};
//end post code

defineExpose({ openPostCode });

</script>

<template>

<DialogModal
  :show="showPostCodeModal"
  @close="closePostCode"
>
  <template #title>
    {{ modalTitle }}
  </template>
  <template #content>

    <div class="flex flex-col gap-3">
      <div>
        <v-label>Post code</v-label>
        <v-text-field v-model="formPostCode.post_code" />
      </div>

      <div>
        <v-label>Extra fee (per delivery)</v-label>
        <v-text-field v-model="formPostCode.extra_fee" />
      </div>

      <div>
        <v-label>Active</v-label>
        <v-switch v-model="formPostCode.active" color="green" :true-value="1" :false-value="0" inset />
      </div>
    </div>

  </template>
  <template #footer>
    <PrimaryButton
      @click="savePostCode"
      class="me-3"
    >{{ saveButtonText }}</PrimaryButton>
    <SecondaryButton
      @click="closePostCode"
    >Cancel</SecondaryButton>
  </template>
</DialogModal>

</template>