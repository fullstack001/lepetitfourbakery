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

// paragraph
const showParagraphModal = ref(false);
const selectedCategory = ref(null);
const selectedParagraph = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);
const titleInput = ref(null);
const selectedType = ref('');

const formParagraph = reactive({});
const openParagraph = (type, category, paragraph = null) => {
  local_errors.value = {};
  selectedType.value = type;
  selectedCategory.value = category;
  formParagraph.category_id = category.id;
  if(paragraph) {
    modalTitle.value = `Edit ${type} paragraph`;
    selectedParagraph.value = paragraph;
    formParagraph.title = paragraph.title;
    formParagraph.content = paragraph.content;
  } else {
    modalTitle.value = `Create ${type} paragraph`;
    selectedParagraph.value = null;
    formParagraph.title = '';
    formParagraph.content = '';
  }
  saveButtonText.value = `Save paragraph`;
  showParagraphModal.value = true;
  nextTick(() => {
    titleInput.value.focus();
  });
};

const closeParagraph = () => {
  showParagraphModal.value = false;
};

const local_errors = ref({});

const saveParagraph = () => {
  let url;
  if(selectedParagraph.value) {
    url = route(`admin.update_${selectedType.value}_paragraph`,{paragraph: selectedParagraph.value.id})
  } else {
    url  = route(`admin.create_${selectedType.value}_paragraph`);
  }
  router.post(url, formParagraph, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      emit('complete');
      closeParagraph();
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};
//end paragraph

defineExpose({ openParagraph });

const emit = defineEmits(['complete']);

</script>

<template>

  <DialogModal
        :show="showParagraphModal"
        @close="closeParagraph"
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
                    bg-color="white"
                    v-model="formParagraph.title"
                    :error-messages="local_errors.title"
                />
              </Col>

              <Col>
                <v-label>Content</v-label>
                <v-textarea
                    bg-color="white"
                    v-model="formParagraph.content"
                    :error-messages="local_errors.content"
                    auto-grow
                    rows="2"
                />
              </Col>

            </Col>
          </div>
        </v-card>

      </template>
      <template #footer>
        <PrimaryButton
            @click="saveParagraph"
            class="me-3"
        >{{ saveButtonText }}</PrimaryButton>
        <SecondaryButton
            @click="closeParagraph"
        >Cancel</SecondaryButton>
      </template>
    </DialogModal>

</template>
