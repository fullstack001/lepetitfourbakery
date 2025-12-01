<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {nextTick, reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
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
const titleInput = ref(null);
const selectedType = ref('');

const formCategory = reactive({});
const openCategory = (type, category = null) => {
  local_errors.value = {};
  selectedType.value = type;
  if(category) {
    modalTitle.value = `Edit ${type} category`;
    selectedCategory.value = category;
    formCategory.title = category.title;
  } else {
    modalTitle.value = `Create ${type} category`;
    selectedCategory.value = null;
    formCategory.title = '';
  }
  saveButtonText.value = 'Save';
  showCategoryModal.value = true;
  nextTick(() => {
    titleInput.value.focus();
  });
};

const closeCategory = () => {
  showCategoryModal.value = false;
};

const local_errors = ref({});

const saveCategory = () => {
  let url;
  if(selectedCategory.value) {
    url = route(`admin.update_${selectedType.value}_category`,{category: selectedCategory.value.id})
  } else {
    url  = route(`admin.create_${selectedType.value}_category`);
  }
  router.post(url, formCategory, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (response) => {
      emit('complete');
      closeCategory();
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};
//end category

defineExpose({ openCategory });

const emit = defineEmits(['complete']);

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
                <v-label>Title</v-label>
                <v-text-field
                    ref="titleInput"
                    v-model="formCategory.title"
                    :error-messages="local_errors.title"
                />
              </Col>

            </Col>
          </div>
        </v-card>

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
