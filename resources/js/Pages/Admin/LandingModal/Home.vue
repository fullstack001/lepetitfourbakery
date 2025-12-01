<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import Grid from "@/Components/Grid.vue";
import {computed, onMounted, reactive, ref} from "vue";
import LandingModal from "@/Components/LandingModal.vue";

const props = defineProps({
  landing_modal: Object,
  active: Boolean,
  errors: Object,
});

const form = reactive({});

const uploadNewImage = ref(false);

const saving = ref(false);


const resetForm = () => {
  saving.value = false;
  form.image_upload = null;
  uploadNewImage.value = false;
  form.title_top = props.landing_modal.title_top;
  form.content_top = props.landing_modal.content_top;
  form.title_bottom = props.landing_modal.title_bottom;
  form.content_bottom = props.landing_modal.content_bottom;
  form.image = props.landing_modal.image;
  form.generate_new_code = false;
  form.opacity = props.landing_modal.opacity;
  form.delay_seconds = props.landing_modal.delay_seconds;
  form.show_newsletter_form = props.landing_modal.show_newsletter_form === 1;
  form.active_begin_date = props.landing_modal.active_begin_date ? new Date(props.landing_modal.active_begin_date) : null;
  form.active_end_date = props.landing_modal.active_end_date ? new Date(props.landing_modal.active_end_date) : null;
};


const saveContents = () => {
  saving.value = true;
  router.post(route('admin.save_landing_modal_contents'), form, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      resetForm();
    },
    onError: (error) => {
      local_errors.value = props.errors;
      saving.value = false;
    }
  });
};

const clearBeginDate = () => {
  form.active_begin_date = null;
};

const clearEndDate = () => {
  form.active_end_date = null;
};

const formattedBeginDate = computed(() => {
  if (!form.active_begin_date) return null;
  const parts = form.active_begin_date.toDateString().split(' ');
  return `${parts[0]}, ${parts[1]} ${parts[2]}`;
});

const formattedEndDate = computed(() => {
  if (!form.active_end_date) return null;
  const parts = form.active_end_date.toDateString().split(' ');
  return `${parts[0]}, ${parts[1]} ${parts[2]}`;
});

const landingModal = ref(null);

const local_errors = ref({});

const readMore = ref(false);

const toggleReadMore = () => {
  readMore.value = !readMore.value;
};

onMounted(() => {
  resetForm();
})

</script>

<template>

  <AdmLayout>
    <Head :title="`Landing Modal :: Admin`" />
    <div class="max-w-4xl mb-4">
      <Row :center="true" justify="between">
        <div>
          <Row :center="true" justify="start">
            <p class="text-3xl">Landing Modal</p>
            <v-chip
                size="small" class="rounded-pill" variant="flat"
                :color="props.active ? 'green' : 'grey'"
            >{{props.active ? 'Active' : 'Inactive'}}</v-chip>
          </Row>
        </div>
        <Row :center="true">
          <v-btn
              :disabled="saving"
              @click.prevent="saveContents"
          >Update</v-btn>
          <v-btn
              v-if="false"
              :disabled="saving"
              @click.prevent="landingModal.openLanding()"
              variant="outlined">Preview</v-btn>
        </Row>
      </Row>
    </div>

    <Col>
      <div class="max-w-4xl mb-5">
          <v-card color="grey-lighten-1" rounded="lg">
            <v-card-text>
              <Col gap="2">
                <p class="font-bold">How it works:</p>
              <div>
                <p>The popup window will be active as soon as you save it with the following rules:</p>
                <p>1. A begin date that is earlier or equal to today</p>
                <p>2. No end date or an end date that is equal or later than today</p>
              </div>
                <p>Once a user dismisses a popup, we use a unique code to ensure that they don't see it again during their session.</p>
                <div>
                  <p class="font-bold">If you check "Generate new code" and update, all users will see the updated popup, even if they dismissed it recently.</p>
                  <p class="font-bold text-red-darken-3">Use responsibly.</p>
                </div>
              </Col>
            </v-card-text>
          </v-card>
      </div>
    </Col>

    <div class="max-w-4xl">
      <div>
        <v-checkbox label="Generate new code (new announcement only)" v-model="form.generate_new_code" />
      </div>
      <Col gap="2">
        <Col gap="2">

          <div class="module p-4">
            <Col :center="true">
                <v-checkbox
                    label="Show newsletter subscription form"
                    v-model="form.show_newsletter_form" hide-details />
            </Col>
          </div>

          <div class="module p-4">
            <Col>
              <Col>
                <v-label>Title top</v-label>
                <v-textarea
                    v-model="form.title_top"
                    :error-messages="local_errors.title_top"
                    rows="1"
                    auto-grow
                />
              </Col>
              <Col>
                <v-label>Content top</v-label>
                <v-textarea
                    v-model="form.content_top"
                    :error-messages="local_errors.content_top"
                    rows="1"
                    auto-grow
                />
              </Col>
            </Col>
          </div>

          <div class="module p-4">
            <Col>
              <Col>
                <v-label>Title bottom (optional)</v-label>
                <v-textarea
                    v-model="form.title_bottom"
                    :error-messages="local_errors.title_bottom"
                    rows="1"
                    auto-grow
                />
              </Col>
              <Col>
                <v-label>Content bottom (optional)</v-label>
                <v-textarea
                    v-model="form.content_bottom"
                    :error-messages="local_errors.content_bottom"
                    rows="1"
                    auto-grow
                />
              </Col>
            </Col>
          </div>

          <div class="module p-4">
            <Col>
              <Row :center="true" justify="between">
                <v-label>Image</v-label>
                <div>
                  <v-checkbox
                      v-model="uploadNewImage"
                      label="Replace image"
                      hide-details
                  />
                </div>
              </Row>
              <template v-if="uploadNewImage">
                <v-file-upload
                    clearable
                    v-model="form.image_upload"
                    :error-messages="local_errors.image_upload"
                    title="Drop or Select image" icon=""
                />
                <p class="text-center text-red text-sm">Please select an image of at least 1200x600px</p>
              </template>
              <template v-else>
                <template v-if="form.image">
                  <v-img
                      :src="`/storage/assets/images/landing/${form.image}`"
                      aspect-ratio="2" color="grey-lighten-3"
                      cover
                      :gradient="`to bottom, rgba(0,0,0,${form.opacity}), rgba(0,0,0,${form.opacity})`"
                      class="text-white align-center text-center"
                  >
                    <Col>
                      <p class="text-4xl">{{ form.title_top}}</p>
                      <p class="text-xl py-2">{{ form.content_top}}</p>


                      <template v-if="form.title_bottom">
                        <p class="text-4xl">{{ form.title_bottom}}</p>
                      </template>

                      <template v-if="form.content_bottom">
                        <p class="text-xl">{{ form.content_bottom}}</p>
                      </template>
                    </Col>


                  </v-img>
                </template>
                <template v-else>
                  <p>No image</p>
                </template>
              </template>
            </Col>
          </div>

          <div class="module p-4">
            <Col>
              <v-label>Overlay opacity</v-label>
              <v-slider
                  v-model="form.opacity"
                  :error-messages="local_errors.opacity"
                  min="0"
                  max="1"
                  :ticks="['0','0.1','0.2','0.3','0.4','0.5','0.6','0.7','0.8','0.9','1']"
                  show-ticks="always"
                  step="0.1"
              />
            </Col>
          </div>

          <div class="module p-4">
            <Col>
              <v-label>Delay before opens (seconds)</v-label>
              <v-slider
                  v-model="form.delay_seconds"
                  :error-messages="local_errors.delay_seconds"
                  min="0"
                  max="30"
                  :ticks="[0,3,6,9,12,15,18,21,24,27,30]"
                  show-ticks="always"
                  step="3"
              />
            </Col>
          </div>

        </Col>

        <Grid cols="1" md="2" lg="2" xl="2" 2xl="2" gap="2">

          <div class="module p-4">
            <Col>
              <v-label>Active begin date</v-label>
              <v-date-picker
                v-model="form.active_begin_date"
              >
                <template #header>
                  <div class="p-5">
                    <div v-if="form.active_begin_date">
                      <Row :center="true" justify="between">
                        <p class="text-xl text-blue font-bold">{{ formattedBeginDate }}</p>
                        <v-btn
                            @click.prevent="clearBeginDate" color="red"
                            size="small" variant="text">Clear date</v-btn>
                      </Row>
                    </div>
                    <div v-else>
                      <div>
                        <Row :center="true" justify="between">
                          <p class="text-xl font-bold">Select begin date</p>
                        </Row>
                      </div>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </Col>
          </div>

          <div class="module p-4">
            <Col>
              <v-label>Active end date</v-label>
              <v-date-picker
                  v-model="form.active_end_date"
              >
                <template #header>
                  <div class="p-5">
                    <div v-if="form.active_end_date">
                      <Row :center="true" justify="between">
                        <p class="text-xl text-blue font-bold">{{ formattedEndDate }}</p>
                        <v-btn
                            @click.prevent="clearEndDate" color="red"
                            size="small" variant="text">Clear date</v-btn>
                      </Row>
                    </div>
                    <div v-else>
                      <div>
                        <Row :center="true" justify="between">
                          <p class="text-xl font-bold">Select end date</p>
                        </Row>
                      </div>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </Col>
          </div>

        </Grid>
      </Col>
    </div>
    <div class="max-w-4xl my-4">
      <Row :center="true" justify="between">
        <div>
        </div>
        <Row :center="true">
          <v-btn
              :disabled="saving"
              @click.prevent="saveContents"
          >Update</v-btn>
          <v-btn
              v-if="false"
              :disabled="saving"
              @click.prevent="landingModal.openLanding()"
              variant="outlined">Preview</v-btn>
        </Row>
      </Row>
    </div>

  </AdmLayout>

  <LandingModal v-if="false" ref="landingModal" :details="form" />

</template>


<style scoped>
.module {
  background: #fff;
  @apply rounded-lg;
}
</style>
