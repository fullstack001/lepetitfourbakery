<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {nextTick, ref} from "vue";
import {router, useForm} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  errors: Object,
});

// category
const showCategoryModal = ref(false);
const selectedCategory = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const formCategory = useForm({
  name: '',
});

const openCategory = (category = null) => {
  if(category) {
    modalTitle.value = 'Edit category';
    selectedCategory.value = category;
    formCategory.name = category.name;
  } else {
    modalTitle.value = 'Create category';
    selectedCategory.value = null;
    formCategory.name = '';
  }
  saveButtonText.value = 'Save category';
  showCategoryModal.value = true;
};

const closeCategory = () => {
  showCategoryModal.value = false;
};

const resetFormCategory = () => {
  formCategory.reset('name');
};

const saveCategory = () => {
  let url;
  if(selectedCategory.value) {
    url = route('admin.events_menu.update_category',{category: selectedCategory.value.uid})
  } else {
    url  = route('admin.events_menu.create_category');
  }
  formCategory.post(url, {
    onSuccess: () => {
      resetFormCategory();
      closeCategory();
    },
  });
};
//end category

defineExpose({ openCategory });

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

        <v-card color="grey-lighten-3" rounded="lg">
          <div class="p-4">
            <Col gap="5">

              <Col>
                <v-label>Name</v-label>
                <v-text-field
                    ref="nameInput"
                    v-model="formCategory.name"
                />
              </Col>

            </Col>
          </div>
        </v-card>

      </template>
      <template #footer>
        <PrimaryButton
                :disabled="formCategory.processing"
            @click="saveCategory"
            class="me-3"
        >{{ saveButtonText }}</PrimaryButton>
        <SecondaryButton
            @click="closeCategory"
        >Cancel</SecondaryButton>
      </template>
    </DialogModal>

</template>
