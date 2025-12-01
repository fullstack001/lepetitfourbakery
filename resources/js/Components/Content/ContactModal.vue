<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {nextTick, reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  content: Object,
  errors: Object,
});

// content
const showContentModal = ref(false);
const selectedContent = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const formContent = reactive({});
const openContent = () => {
  local_errors.value = {};
  modalTitle.value = 'Contact page';
  selectedContent.value = props.content;
  resetContent();
  saveButtonText.value = 'Save';
  showContentModal.value = true;
};

const closeContent = () => {
  showContentModal.value = false;
};

const local_errors = ref({});

const resetContent = () => {
  formContent.title = props.content.title;
  formContent.introduction = props.content.introduction;
};

const saveContent = () => {
  const url = route('admin.update_contact_content');

  router.post(url, formContent, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      resetContent();
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};
//end content

defineExpose({ openContent });

</script>

<template>

  <DialogModal
      :show="showContentModal"
      @close="closeContent"
      maxWidth="6xl"
  >
    <template #title>
      {{ modalTitle }}
    </template>
    <template #content>

      <v-card color="grey-lighten-3" rounded="lg">
        <div class="p-4">
          <Col gap="5">

            <!-- SECTION -->
            <v-card color="grey-lighten-3" rounded="lg">
              <div class="p-4">
                <Col gap="5">

                  <v-card color="grey-lighten-3" rounded="lg">
                    <div class="p-4">
                      <p class="modal-title">Top</p>

                      <Col gap="5" :center="true">

                        <!-- title -->
                        <Col>
                          <v-label>Page title</v-label>
                          <v-textarea
                              v-model="formContent.title"
                              bg-color="white"
                              auto-grow
                              rows="2"
                          />
                        </Col>
                        <!-- introduction -->
                        <Col>
                          <v-label>Page intro</v-label>
                          <v-textarea
                              v-model="formContent.introduction"
                              bg-color="white"
                              auto-grow
                              rows="2"
                          />
                        </Col>
                      </Col>
                    </div>
                  </v-card>

                </Col>
              </div>
            </v-card>
            <!-- END SECTION -->

          </Col>
        </div>
      </v-card>

    </template>
    <template #footer>
      <PrimaryButton
          @click="saveContent"
          class="me-3"
      >{{ saveButtonText }}</PrimaryButton>
      <SecondaryButton
          @click="closeContent"
      >Cancel</SecondaryButton>
    </template>
  </DialogModal>

</template>
