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
const activeModule = ref('hero');

const formContent = reactive({});

const resetContent = () => {
  formContent.hero_background_image_desktop = props.content.hero_background_image_desktop;
  formContent.hero_background_image_mobile = props.content.hero_background_image_mobile;
  formContent.hero_background_image_desktop_upload = null;
  formContent.hero_background_image_mobile_upload = null;
  formContent.hero_title = props.content.hero_title;
  formContent.hero_introduction = props.content.hero_introduction;
  formContent.hero_button_1_text = props.content.hero_button_1_text;
  formContent.hero_button_1_url = props.content.hero_button_1_url;
  formContent.hero_button_1_active = props.content.hero_button_1_active === 1;
  formContent.hero_button_2_text = props.content.hero_button_2_text;
  formContent.hero_button_2_url = props.content.hero_button_2_url;
  formContent.hero_button_2_active = props.content.hero_button_2_active === 1;

  formContent.sneak_peek_title = props.content.sneak_peek_title;
  formContent.sneak_peek_button_text = props.content.sneak_peek_button_text;

  formContent.origins_image = props.content.origins_image;
  formContent.origins_image_upload = null;
  formContent.origins_title = props.content.origins_title;
  formContent.origins_content_1 = props.content.origins_content_1;
  formContent.origins_content_2 = props.content.origins_content_2;

  formContent.team_1_name = props.content.team_1_name;
  formContent.team_1_title = props.content.team_1_title;
  formContent.team_1_quote = props.content.team_1_quote;
  formContent.team_1_quote_source = props.content.team_1_quote_source;
  formContent.team_1_quote_date = props.content.team_1_quote_date;
  formContent.team_1_photo = props.content.team_1_photo;
  formContent.team_1_photo_upload = null;
  formContent.team_1_content_1 = props.content.team_1_content_1;
  formContent.team_1_content_2 = props.content.team_1_content_2;

  formContent.team_2_name = props.content.team_2_name;
  formContent.team_2_title = props.content.team_2_title;
  formContent.team_2_quote = props.content.team_2_quote;
  formContent.team_2_quote_source = props.content.team_2_quote_source;
  formContent.team_2_quote_date = props.content.team_2_quote_date;
  formContent.team_2_photo = props.content.team_2_photo;
  formContent.team_2_photo_upload = null;
  formContent.team_2_content_1 = props.content.team_2_content_1;
  formContent.team_2_content_2 = props.content.team_2_content_2;

  formContent.tour_title = props.content.tour_title;

  formContent.tour_1_image = props.content.tour_1_image;
  formContent.tour_1_image_upload = null;
  formContent.tour_1_title = props.content.tour_1_title;
  formContent.tour_1_introduction = props.content.tour_1_introduction;
  formContent.tour_1_button_text = props.content.tour_1_button_text;
  formContent.tour_1_button_link = props.content.tour_1_button_link;
  formContent.tour_1_button_active = props.content.tour_1_button_active === 1;

  formContent.tour_2_image = props.content.tour_2_image;
  formContent.tour_2_image_upload = null;
  formContent.tour_2_title = props.content.tour_2_title;
  formContent.tour_2_introduction = props.content.tour_2_introduction;
  formContent.tour_2_button_text = props.content.tour_2_button_text;
  formContent.tour_2_button_link = props.content.tour_2_button_link;
  formContent.tour_2_button_active = props.content.tour_2_button_active === 1;
};

const openContent = () => {
  local_errors.value = {};
  modalTitle.value = 'Homepage';
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
  const url = route('admin.update_homepage_content');

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
                <v-radio label="Hero" value="hero" />
                <v-radio label="Catering" value="catering" />
                <v-radio label="Origins" value="origins" />
                <v-radio label="Management" value="management" />
                <v-radio label="Tour" value="tour" />
              </v-radio-group>
            </div>
          </Row>
          <p class="text-sm text-red">Changing sections will cancel unsaved changes</p>
        </Row>
      </template>
      <template #content>

        <Col gap="5">
          <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'hero'">
            <div class="p-4">
              <Col gap="5">

                <v-card color="grey-lighten-3" rounded="lg">
                  <div class="p-4">
                    <p class="modal-title">Hero</p>

                    <Col gap="5" :center="true">
                      <div class="flex flex-col xl:flex-row justify-center gap-3 w-full">
                        <div class="w-full max-w-[250px]">
                          <!-- image mobile -->
                          <p>Mobile image</p>
                          <div>
                            <v-img color="grey"
                                   aspect-ratio="0.5"
                                   :src="`/images/content/${formContent.hero_background_image_mobile}`"
                                   cover
                            />
                          </div>
                        </div>
                        <div class="w-full">
                          <div class="w-full max-w-[500px]">
                            <!-- image desktop -->
                            <p>Desktop image</p>
                            <div>
                              <v-img color="grey"
                                     aspect-ratio="2"
                                     :src="`/images/content/${formContent.hero_background_image_desktop}`"
                                     cover
                              />
                            </div>
                          </div>
                          <div class="py-4">
                            <Col gap="4">
                              <Col>
                                <p>Mobile image (600 x 1200)</p>
                                <v-file-upload
                                    clearable
                                    v-model="formContent.hero_background_image_mobile_upload"
                                    hide-browse density="compact"
                                    width="100%" title="Drop or Select mobile image" icon="mdi-cellphone"
                                />
                              </Col>
                              <Col>
                                <p>Desktop image (1800 x 900)</p>
                                <v-file-upload
                                    clearable
                                    v-model="formContent.hero_background_image_desktop_upload"
                                    hide-browse density="compact"
                                    width="100%" title="Drop or Select desktop image" icon="mdi-monitor"
                                />
                              </Col>
                            </Col>
                          </div>
                        </div>
                      </div>

                      <!-- title -->
                      <Col>
                        <v-label>Hero title</v-label>
                        <v-textarea
                            v-model="formContent.hero_title"
                            bg-color="white"
                            auto-grow
                            rows="2"
                        />
                      </Col>
                      <!-- introduction -->
                      <Col>
                        <v-label>Hero intro</v-label>
                        <v-textarea
                            v-model="formContent.hero_introduction"
                            bg-color="white"
                            auto-grow
                            rows="2"
                        />
                      </Col>
                      <Grid cols="1" md="2" lg="2" xl="2" 2xl="2">
                        <!-- button 1 -->
                        <v-card color="grey-lighten-2" rounded="lg">
                          <div class="p-4">
                            <Col gap="2">
                              <p class="modal-subtitle">Button 1</p>
                              <Col>
                                <v-label>Text</v-label>
                                <v-text-field
                                    v-model="formContent.hero_button_1_text"
                                />
                              </Col>
                              <Col>
                                <v-label>URL</v-label>
                                <v-text-field
                                    v-model="formContent.hero_button_1_url"
                                />
                              </Col>
                              <Col>
                                <v-switch inset
                                          v-model="formContent.hero_button_1_active"
                                          :true-value="true"
                                          :false-value="false"
                                          color="success"
                                          label="Is active"
                                />
                              </Col>
                            </Col>
                          </div>
                        </v-card>
                        <!-- button 2 -->
                        <v-card color="grey-lighten-2" rounded="lg">
                          <div class="p-4">
                            <Col gap="2">
                              <p class="modal-subtitle">Button 2</p>
                              <Col>
                                <v-label>Text</v-label>
                                <v-text-field
                                    v-model="formContent.hero_button_2_text"
                                />
                              </Col>
                              <Col>
                                <v-label>URL</v-label>
                                <v-text-field
                                    v-model="formContent.hero_button_2_url"
                                />
                              </Col>
                              <Col>
                                <v-switch inset
                                          v-model="formContent.hero_button_2_active"
                                          :true-value="true"
                                          :false-value="false"
                                          color="success"
                                          label="Is active"
                                />
                              </Col>
                            </Col>
                          </div>
                        </v-card>
                      </Grid>
                    </Col>
                  </div>
                </v-card>

              </Col>
            </div>
          </v-card>

          <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'catering'">
            <div class="p-4">
              <v-card color="grey-lighten-3" rounded="lg">
                  <div class="p-4">
                    <p class="modal-title">Catering menu sneak peek</p>
                    <Col>
                        <v-label>Title - text between [brackets] will appear orange</v-label>
                      <v-textarea
                          v-model="formContent.sneak_peek_title"
                          bg-color="white"
                          auto-grow
                          rows="2"
                      />
                    </Col>
                    <Col>
                        <v-label>Button text</v-label>
                      <v-text-field
                          v-model="formContent.sneak_peek_button_text"
                          bg-color="white"
                          auto-grow
                          rows="2"
                      />
                    </Col>
                  </div>
              </v-card>
            </div>
          </v-card>

          <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'origins'">
            <div class="p-4">
              <v-card color="grey-lighten-3" rounded="lg">
                  <div class="p-4">
                    <Col gap="4">
                      <p class="modal-title">Origins of creation</p>
                      <Col>
                        <Grid cols="1" md="2" lg="2" xl="2" 2xl="2">
                            <div>
                              <div class="w-[300px]">
                                <v-img color="grey"
                                       :src="`/images/content/${formContent.origins_image}`"
                                       cover
                                />
                              </div>
                            </div>
                          <div>
                            <Col>
                              <p>Image (620 x 480)</p>
                              <v-file-upload
                                  clearable
                                  v-model="formContent.origins_image_upload"
                                  hide-browse density="compact"
                                  width="100%" title="Drop or Select mobile image" icon="mdi-upload-box-outline"
                              />
                            </Col>
                          </div>
                        </Grid>
                      </Col>
                      <Col>
                        <v-label>Title</v-label>
                        <v-text-field
                            v-model="formContent.origins_title"
                            bg-color="white"
                            rows="2"
                        />
                      </Col>
                      <Col>
                        <v-label>Content 1 (advice: 2 lines max on desktop)</v-label>
                        <v-textarea
                            v-model="formContent.origins_content_1"
                            bg-color="white"
                            auto-grow
                            rows="2"
                        />
                      </Col>
                      <Col>
                        <v-label>Content 2 (folded on mobile)</v-label>
                        <v-textarea
                            v-model="formContent.origins_content_2"
                            bg-color="white"
                            auto-grow
                            rows="2"
                        />
                      </Col>
                    </Col>
                  </div>
              </v-card>
            </div>
          </v-card>

          <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'management'">
            <div class="p-4">
              <v-card color="grey-lighten-3" rounded="lg">
                  <div class="p-4">
                    <Col gap="4">
                      <p class="modal-title">Management</p>
                      <v-card color="grey-lighten-2" rounded="lg">
                        <div class="p-4">

                          <Col gap="4">
                            <p class="modal-subtitle">Valérie</p>
                            <Col>
                              <Grid cols="1" md="2" lg="2" xl="2" 2xl="2">
                                <div>
                                  <div class="w-[300px]">
                                    <v-img color="grey"
                                           :src="`/images/content/${formContent.team_1_photo}`"
                                           cover
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Col>
                                    <p>Image (1080 x 650)</p>
                                    <v-file-upload
                                        clearable
                                        v-model="formContent.team_1_photo_upload"
                                        hide-browse density="compact"
                                        width="100%" title="Drop or Select mobile image" icon="mdi-upload-box-outline"
                                    />
                                  </Col>
                                </div>
                              </Grid>
                            </Col>
                            <Grid cols="1" md="2" lg="2" xl="2" 2xl="2">
                              <Col>
                                <v-label>Name</v-label>
                                <v-text-field
                                    v-model="formContent.team_1_name"
                                    bg-color="white"
                                    rows="2"
                                />
                              </Col>
                              <Col>
                                <v-label>Title</v-label>
                                <v-text-field
                                    v-model="formContent.team_1_title"
                                    bg-color="white"
                                    rows="2"
                                />
                              </Col>
                            </Grid>
                            <Col>
                              <v-label>Quote</v-label>
                              <v-text-field
                                  v-model="formContent.team_1_quote"
                                  bg-color="white"
                                  rows="2"
                              />
                            </Col>
                            <Grid cols="1" md="2" lg="2" xl="2" 2xl="2">
                              <Col>
                                <v-label>Quote source</v-label>
                                <v-text-field
                                    v-model="formContent.team_1_quote_source"
                                    bg-color="white"
                                    rows="2"
                                />
                              </Col>
                              <Col>
                                <v-label>Quote date</v-label>
                                <v-text-field
                                    v-model="formContent.team_1_quote_date"
                                    bg-color="white"
                                    rows="2"
                                />
                              </Col>
                            </Grid>
                            <Col>
                              <v-label>Content 1</v-label>
                              <v-textarea
                                  v-model="formContent.team_1_content_1"
                                  bg-color="white"
                                  auto-grow
                                  rows="2"
                              />
                            </Col>
                            <Col>
                              <v-label>Content 2 (folded on mobile)</v-label>
                              <v-textarea
                                  v-model="formContent.team_1_content_2"
                                  bg-color="white"
                                  auto-grow
                                  rows="2"
                              />
                            </Col>
                          </Col>
                        </div>
                      </v-card>
                      <v-card color="grey-lighten-2" rounded="lg">
                        <div class="p-4">

                          <Col gap="4">
                            <p class="modal-subtitle">Romain</p>
                            <Col>
                              <Grid cols="1" md="2" lg="2" xl="2" 2xl="2">
                                <div>
                                  <div class="w-[300px]">
                                    <v-img color="grey"
                                           :src="`/images/content/${formContent.team_2_photo}`"
                                           cover
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Col>
                                    <p>Image (1080 x 650)</p>
                                    <v-file-upload
                                        clearable
                                        v-model="formContent.team_2_photo_upload"
                                        hide-browse density="compact"
                                        width="100%" title="Drop or Select mobile image" icon="mdi-upload-box-outline"
                                    />
                                  </Col>
                                </div>
                              </Grid>
                            </Col>
                            <Grid cols="1" md="2" lg="2" xl="2" 2xl="2">
                              <Col>
                                <v-label>Name</v-label>
                                <v-text-field
                                    v-model="formContent.team_2_name"
                                    bg-color="white"
                                    rows="2"
                                />
                              </Col>
                              <Col>
                                <v-label>Title</v-label>
                                <v-text-field
                                    v-model="formContent.team_2_title"
                                    bg-color="white"
                                    rows="2"
                                />
                              </Col>
                            </Grid>
                            <Col>
                              <v-label>Quote</v-label>
                              <v-text-field
                                  v-model="formContent.team_2_quote"
                                  bg-color="white"
                                  rows="2"
                              />
                            </Col>
                            <Grid cols="1" md="2" lg="2" xl="2" 2xl="2">
                              <Col>
                                <v-label>Quote source</v-label>
                                <v-text-field
                                    v-model="formContent.team_2_quote_source"
                                    bg-color="white"
                                    rows="2"
                                />
                              </Col>
                              <Col>
                                <v-label>Quote date</v-label>
                                <v-text-field
                                    v-model="formContent.team_2_quote_date"
                                    bg-color="white"
                                    rows="2"
                                />
                              </Col>
                            </Grid>
                            <Col>
                              <v-label>Content 1</v-label>
                              <v-textarea
                                  v-model="formContent.team_2_content_1"
                                  bg-color="white"
                                  auto-grow
                                  rows="2"
                              />
                            </Col>
                            <Col>
                              <v-label>Content 2 (folded on mobile)</v-label>
                              <v-textarea
                                  v-model="formContent.team_2_content_2"
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
            </div>
          </v-card>

          <v-card color="grey-lighten-3" rounded="lg" v-if="activeModule === 'tour'">
            <div class="p-4">
              <v-card color="grey-lighten-3" rounded="lg">
                <div class="p-4">
                  <p class="modal-title">Tour</p>
                  <Grid cols="1" md="2" lg="2" xl="2" 2xl="2">
                    <v-card color="grey-lighten-2" rounded="lg">
                        <div class="p-4">
                          <Col gap="5">
                            <p class="modal-subtitle">#1</p>
                            <Col>
                              <Col>
                                <div>
                                  <div class="w-[300px]">
                                    <v-img color="grey"
                                           :src="`/images/content/${formContent.tour_1_image}`"
                                           cover
                                    />
                                  </div>
                                </div>
                                <div class="mt-3">
                                  <Col>
                                    <p>Image (620 x 450)</p>
                                    <v-file-upload
                                        clearable
                                        v-model="formContent.tour_1_image_upload"
                                        hide-browse density="compact"
                                        width="100%" title="Drop or Select mobile image" icon="mdi-upload-box-outline"
                                    />
                                  </Col>
                                </div>
                              </Col>
                            </Col>
                            <Col>
                              <v-label>Title</v-label>
                              <v-text-field
                                  v-model="formContent.tour_1_title"
                                  bg-color="white"
                                  rows="2"
                              />
                            </Col>
                            <Col>
                              <v-label>Intro</v-label>
                              <v-textarea
                                  v-model="formContent.tour_1_introduction"
                                  bg-color="white"
                                  auto-grow
                                  rows="2"
                              />
                            </Col>
                            <Col gap="2">
                              <p class="modal-subtitle">Button</p>
                              <Col>
                                <v-label>Text</v-label>
                                <v-text-field
                                    v-model="formContent.tour_1_button_text"
                                />
                              </Col>
                              <Col>
                                <v-label>URL</v-label>
                                <v-text-field
                                    v-model="formContent.tour_1_button_link"
                                />
                              </Col>
                              <Col>
                                <v-switch inset
                                          v-model="formContent.tour_1_button_active"
                                          :true-value="true"
                                          :false-value="false"
                                          color="success"
                                          label="Is active"
                                />
                              </Col>
                            </Col>
                          </Col>
                        </div>
                    </v-card>
                    <v-card color="grey-lighten-2" rounded="lg">
                        <div class="p-4">
                          <Col gap="5">
                            <p class="modal-subtitle">#2</p>
                            <Col>
                              <Col>
                                <div>
                                  <div class="w-[300px]">
                                    <v-img color="grey"
                                           :src="`/images/content/${formContent.tour_2_image}`"
                                           cover
                                    />
                                  </div>
                                </div>
                                <div class="mt-3">
                                  <Col>
                                    <p>Image (620 x 450)</p>
                                    <v-file-upload
                                        clearable
                                        v-model="formContent.tour_2_image_upload"
                                        hide-browse density="compact"
                                        width="100%" title="Drop or Select mobile image" icon="mdi-upload-box-outline"
                                    />
                                  </Col>
                                </div>
                              </Col>
                            </Col>
                            <Col>
                              <v-label>Title</v-label>
                              <v-text-field
                                  v-model="formContent.tour_2_title"
                                  bg-color="white"
                                  rows="2"
                              />
                            </Col>
                            <Col>
                              <v-label>Intro</v-label>
                              <v-textarea
                                  v-model="formContent.tour_2_introduction"
                                  bg-color="white"
                                  auto-grow
                                  rows="2"
                              />
                            </Col>
                            <Col gap="2">
                              <p class="modal-subtitle">Button</p>
                              <Col>
                                <v-label>Text</v-label>
                                <v-text-field
                                    v-model="formContent.tour_2_button_text"
                                />
                              </Col>
                              <Col>
                                <v-label>URL</v-label>
                                <v-text-field
                                    v-model="formContent.tour_2_button_link"
                                />
                              </Col>
                              <Col>
                                <v-switch inset
                                          v-model="formContent.tour_2_button_active"
                                          :true-value="true"
                                          :false-value="false"
                                          color="success"
                                          label="Is active"
                                />
                              </Col>
                            </Col>
                          </Col>
                        </div>
                    </v-card>
                  </Grid>
                </div>
              </v-card>
            </div>
          </v-card>

        </Col>

      </template>
      <template #footer>
        <PrimaryButton
            @click="saveContent"
            class="me-3"
        >{{ saveButtonText }}</PrimaryButton>
        <SecondaryButton
            @click="closeContent"
        >Close</SecondaryButton>
      </template>
    </DialogModal>

</template>
