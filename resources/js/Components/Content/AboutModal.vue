<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {nextTick, reactive, ref, watch} from "vue";
import {router} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import Grid from "@/Components/Grid.vue";

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
const activeModule = ref('top');

const formContent = reactive({});

const resetContent = () => {

  formContent.title = props.content.title;
  formContent.introduction = props.content.introduction;

  formContent.module_1_image = props.content.module_1_image;
  formContent.module_1_image_upload = null;
  formContent.module_1_title = props.content.module_1_title;
  formContent.module_1_button_text = props.content.module_1_button_text;
  formContent.module_1_button_link = props.content.module_1_button_link;
  formContent.module_2_image = props.content.module_2_image;
  formContent.module_2_image_upload = null;
  formContent.module_2_title = props.content.module_2_title;
  formContent.module_2_button_text = props.content.module_2_button_text;
  formContent.module_2_button_link = props.content.module_2_button_link;
  formContent.module_3_image = props.content.module_3_image;
  formContent.module_3_image_upload = null;
  formContent.module_3_title = props.content.module_3_title;
  formContent.module_3_button_text = props.content.module_3_button_text;
  formContent.module_3_button_link = props.content.module_3_button_link;
  formContent.module_4_image = props.content.module_4_image;
  formContent.module_4_image_upload = null;
  formContent.module_4_title = props.content.module_4_title;
  formContent.module_4_button_text = props.content.module_4_button_text;
  formContent.module_4_button_link = props.content.module_4_button_link;
  formContent.module_5_image = props.content.module_5_image;
  formContent.module_5_image_upload = null;
  formContent.module_5_title = props.content.module_5_title;
  formContent.module_5_button_text = props.content.module_5_button_text;
  formContent.module_5_button_link = props.content.module_5_button_link;
  formContent.module_6_image = props.content.module_6_image;
  formContent.module_6_image_upload = null;
  formContent.module_6_title = props.content.module_6_title;
  formContent.module_6_button_text = props.content.module_6_button_text;
  formContent.module_6_button_link = props.content.module_6_button_link;
  formContent.module_7_image = props.content.module_7_image;
  formContent.module_7_image_upload = null;
  formContent.module_7_title = props.content.module_7_title;
  formContent.module_7_button_text = props.content.module_7_button_text;
  formContent.module_7_button_link = props.content.module_7_button_link;
  formContent.module_8_image = props.content.module_8_image;
  formContent.module_8_image_upload = null;
  formContent.module_8_title = props.content.module_8_title;
  formContent.module_8_button_text = props.content.module_8_button_text;
  formContent.module_8_button_link = props.content.module_8_button_link;
  formContent.module_9_image = props.content.module_9_image;
  formContent.module_9_image_upload = null;
  formContent.module_9_title = props.content.module_9_title;
  formContent.module_9_button_text = props.content.module_9_button_text;
  formContent.module_9_button_link = props.content.module_9_button_link;

  formContent.testimonials_title = props.content.testimonials_title;
  formContent.testimonials_introduction = props.content.testimonials_introduction;
  formContent.testimonial_1_name = props.content.testimonial_1_name;
  formContent.testimonial_1_content = props.content.testimonial_1_content;
  formContent.testimonial_2_name = props.content.testimonial_2_name;
  formContent.testimonial_2_content = props.content.testimonial_2_content;
  formContent.testimonial_3_name = props.content.testimonial_3_name;
  formContent.testimonial_3_content = props.content.testimonial_3_content;

  formContent.instructions_baked_goods_title = props.content.instructions_baked_goods_title;
  formContent.instructions_baked_goods_youtube_video_id = props.content.instructions_baked_goods_youtube_video_id;
};

const openContent = () => {
  local_errors.value = {};
  modalTitle.value = 'La boutique page';
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
  const url = route('admin.update_about_content');

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
              <v-radio label="Top" value="top" />
              <v-radio label="Modules" value="modules" />
              <v-radio label="Testimonials" value="testimonials" />
              <v-radio label="Instructions" value="instructions" />
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
            <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'top'">
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

            <!-- SECTION -->
            <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'modules'">
              <div class="p-4">
                <Col gap="5">

                  <v-card color="grey-lighten-3" rounded="lg">
                    <div class="p-4">
                      <Col gap="4">
                        <p class="modal-title">Modules</p>
                        <Grid cols="1" md="3" lg="3" xl="3" 2xl="3">
                          <template v-for="i in 9">
                            <div :class="`col-span-${props.content[`module_${i}_size`]}`">
                              <div class="p-4 bg-white">
                                <Col gap="4">
                                  <v-img
                                      :src="`/images/content/${props.content[`module_${i}_image`]??'empty.png'}`"
                                      class="h-[200px]"
                                      color="grey"
                                      cover
                                  />
                                  <Col gap="4">
                                    <p>Image ({{ props.content[`module_${i}_size`] === 2 ? '650' : '320' }} x 350)</p>
                                    <v-file-upload
                                        clearable
                                        v-model="formContent[`module_${i}_image_upload`]"
                                        hide-browse density="compact"
                                        width="100%" title="Drop or Select image" icon=""
                                    />
                                    <Col>
                                      <v-label>Title</v-label>
                                      <v-text-field
                                          v-model="formContent[`module_${i}_title`]"
                                          bg-color="white"
                                          rows="2" hide-details
                                      />
                                    </Col>
                                    <Col>
                                      <v-label>Button text</v-label>
                                      <v-text-field
                                          v-model="formContent[`module_${i}_button_text`]"
                                          bg-color="white"
                                          rows="2" hide-details
                                      />
                                    </Col>
                                    <Col>
                                      <v-label>Button link</v-label>
                                      <v-text-field
                                          v-model="formContent[`module_${i}_button_link`]"
                                          bg-color="white"
                                          rows="2" hide-details
                                      />
                                    </Col>
                                  </Col>
                                </Col>
                              </div>

                            </div>
                          </template>
                        </Grid>
                      </Col>
                    </div>
                  </v-card>

                </Col>
              </div>
            </v-card>
            <!-- END SECTION -->

            <!-- SECTION -->
            <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'testimonials'">
              <div class="p-4">
                <Col gap="5">

                  <v-card color="grey-lighten-3" rounded="lg">
                    <div class="p-4">
                      <p class="modal-title">Testimonials</p>

                      <Col gap="5" :center="true">

                        <!-- title -->
                        <Col>
                          <v-label>Title - text between [brackets] will appear orange</v-label>
                          <v-textarea
                              v-model="formContent.testimonials_title"
                              bg-color="white"
                              auto-grow
                              rows="2"
                          />
                        </Col>
                        <!-- introduction -->
                        <Col>
                          <v-label>Intro</v-label>
                          <v-textarea
                              v-model="formContent.testimonials_introduction"
                              bg-color="white"
                              auto-grow
                              rows="2"
                          />
                        </Col>

                        <template v-for="i in 3">
                          <div class="w-full p-4 bg-white">
                            <p class="modal-subtitle">Testimonial #{{ i }}</p>
                            <Col gap="4">
                              <!-- name -->
                              <Col>
                                <v-label>Name</v-label>
                                <v-text-field
                                    v-model="formContent[`testimonial_${i}_name`]"
                                    bg-color="white"
                                />
                              </Col>
                              <!-- content -->
                              <Col>
                                <v-label>Content</v-label>
                                <v-textarea
                                    v-model="formContent[`testimonial_${i}_content`]"
                                    bg-color="white"
                                    auto-grow
                                    rows="2"
                                />
                              </Col>
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

            <!-- SECTION -->
            <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'instructions'">
              <div class="p-4">
                <Col gap="5">

                  <v-card color="grey-lighten-3" rounded="lg">
                    <div class="p-4">
                      <p class="modal-title">Top</p>

                      <Col gap="5" :center="true">

                        <!-- title -->
                        <Col>
                          <v-label>Title - text between [brackets] will appear orange</v-label>
                          <v-textarea
                              v-model="formContent.instructions_baked_goods_title"
                              bg-color="white"
                              auto-grow
                              rows="2"
                          />
                        </Col>
                        <!-- introduction -->
                        <Col>
                          <Row gap="1">
                            <v-label>YouTube ID</v-label>
                            <v-label>(only the part in&nbsp;<span class="text-red font-bold">red</span>)</v-label>
                          </Row>
                          <p>https://www.youtube.com/watch?v=<span class="text-red font-bold">dQw4w9WgXcQ</span></p>
                          <v-text-field
                              v-model="formContent.instructions_baked_goods_youtube_video_id"
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
