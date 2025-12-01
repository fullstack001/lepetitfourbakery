<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {nextTick, reactive, ref, watch} from "vue";
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
const nameInput = ref(null);
const activeModule = ref('main');

const formContent = reactive({});

const resetContent = () => {

  formContent.title = props.content.title;
  formContent.introduction = props.content.introduction;
  formContent.box_title = props.content.box_title;
  formContent.subscribed_instructions = props.content.subscribed_instructions;

  formContent.feature_1_icon = props.content.feature_1_icon;
  formContent.feature_1_title = props.content.feature_1_title;
  formContent.feature_1_content = props.content.feature_1_content;
  formContent.feature_2_icon = props.content.feature_2_icon;
  formContent.feature_2_title = props.content.feature_2_title;
  formContent.feature_2_content = props.content.feature_2_content;
  formContent.feature_3_icon = props.content.feature_3_icon;
  formContent.feature_3_title = props.content.feature_3_title;
  formContent.feature_3_content = props.content.feature_3_content;


};

const openContent = () => {
  local_errors.value = {};
  modalTitle.value = 'Subscription page';
  selectedContent.value = props.content;
  resetContent();
  saveButtonText.value = 'Save';
  showContentModal.value = true;
};

const closeContent = () => {
  showContentModal.value = false;
};

const local_errors = ref({});

const saveContent = () => {
  const url = route('admin.update_subscription_content');

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

watch(activeModule, async (newValue) => {
  if (newValue) {
    resetContent();
  }
});

</script>

<template>

  <DialogModal
      :show="showContentModal"
      @close="closeContent"
      maxWidth="6xl"
  >
    <template #title>
      <Row :center="true" justify="between">
        <Row :center="true" justify="start">
          <div>
            <v-radio-group
                v-model="activeModule"
                inline hide-details
            >
              <v-radio label="Main" value="main" />
              <v-radio label="Features" value="features" />
            </v-radio-group>
          </div>
        </Row>
        <p class="text-sm text-red">Changing sections will cancel unsaved changes</p>
      </Row>
    </template>
    <template #content>

      <v-card color="grey-lighten-3" rounded="lg">
        <div class="p-0">
          <Col gap="5">

            <!-- SECTION -->
            <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'main'">
              <div class="p-4">
                <Col gap="5">

                  <v-card color="grey-lighten-3" rounded="lg">
                    <div class="p-4">
                      <p class="modal-title">Main</p>

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
                        <Col>
                          <v-label>Page intro</v-label>
                          <v-textarea
                              v-model="formContent.introduction"
                              bg-color="white"
                              auto-grow
                              rows="2"
                          />
                        </Col>
                        <Col>
                          <v-label>Box title</v-label>
                          <v-textarea
                              v-model="formContent.box_title"
                              bg-color="white"
                              auto-grow
                              rows="2"
                          />
                        </Col>
                        <Col>
                          <v-label>Subscribed instructions</v-label>
                          <v-textarea
                              v-model="formContent.subscribed_instructions"
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

            <!-- SECTION -->
            <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'features'">
              <div class="p-4">
                <Col gap="5">

                  <v-card color="grey-lighten-3" rounded="lg">
                    <div class="p-4">
                      <p class="modal-title">Features</p>

                      <Col gap="5" :center="true">

                        <template v-for="i in 3">
                          <div class="p-4 bg-white w-full">
                            <p class="modal-subtitle mb-2">Feature #{{ i }}</p>
                            <Col>
                              <Row :center="true" justify="start" gap="1">
                                <v-label>Icon&nbsp;-&nbsp;<a
                                    class="text-blue-600 underline"
                                    href="https://pictogrammers.com/library/mdi/" target="_blank">List</a>&nbsp;(copy name with "mdi" before it. Example: "mdi-account")</v-label>
                              </Row>
                              <Row :center="true" justify="start">
                                  <p>Icon preview:</p>
                                  <v-icon>{{formContent[`feature_${i}_icon`]}}</v-icon>
                              </Row>
                              <v-text-field
                                  v-model="formContent[`feature_${i}_icon`]"
                                  bg-color="white"
                              />
                            </Col>
                            <Col>
                              <v-label>Title</v-label>
                              <v-text-field
                                  v-model="formContent[`feature_${i}_title`]"
                                  bg-color="white"
                              />
                            </Col>
                            <Col>
                              <v-label>Content - text between [brackets] will appear bold</v-label>
                              <v-textarea
                                  v-model="formContent[`feature_${i}_content`]"
                                  bg-color="white"
                                  auto-grow
                                  rows="2"
                              />
                            </Col>
                          </div>
                        </template>

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
