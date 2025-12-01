<script setup>

// category
import {reactive, ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import DialogModal from "@/Components/DialogModal.vue";
import {router} from "@inertiajs/vue3";
import {de} from "vuetify/locale";

const showCategoryModal = ref(false);
const selectedCategory = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const form = reactive({
  name: null,
});
const openCategory = (category = null) => {
  if(category) {
    modalTitle.value = 'Edit category';
    selectedCategory.value = category;
    form.name = category.name;
  } else {
    modalTitle.value = 'Create category';
    selectedCategory.value = null;
    form.name = null;
  }
  saveButtonText.value = 'Save category';
  showCategoryModal.value = true;
};

const closeCategory = () => {
  showCategoryModal.value = false;
  selectedCategory.value = null;
};

const saveCategory = () => {
  let url;
  if(selectedCategory.value) {
    url = route('admin.update_category',{category: selectedCategory.value.uid})
  } else {
    url  = route(`admin.create_category`);
  }
  router.post(url, form, {
    preserveScroll: true,
    preserveState: true,
    only: [''],
    onSuccess: (page) => {
      emit('refresh');
      closeCategory();
    },
    onError: (error) => {
      console.log(error);
    }
  });
};
//end category

defineExpose({ openCategory })

const emit = defineEmits(['refresh']);

</script>

<template>

  <DialogModal
      :show="showCategoryModal"
      @close="closeCategory"
  >
    <template #title>
      {{ modalTitle }}
    </template>
    <template #content>

      <v-label class="uppercase">Category name</v-label>
      <v-text-field v-model="form.name" density="compact" class="mt-1" />

    </template>
    <template #footer>
      <PrimaryButton
          @click="saveCategory"
          class="me-3"
      >{{ saveButtonText }}</PrimaryButton>
      <SecondaryButton
          @click="closeCategory"
      >Cancel</SecondaryButton>
    </template>
  </DialogModal>

</template>