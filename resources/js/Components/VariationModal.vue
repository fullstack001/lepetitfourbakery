<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import VuePictureCropper, { cropper } from 'vue-picture-cropper';

import defaultThumbnail from '/public/images/products/default.jpg';

import {reactive, ref, watch} from "vue";
import {router} from "@inertiajs/vue3";
import ErrorModule from "@/Components/ErrorModule.vue";

const props = defineProps({
  products: Object,
  errors: Object,
});

const selectedProduct = ref(null);

// variation
const showVariationModal = ref(false);
const selectedVariation = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const int_type = ref('');

const form = reactive({
  name: null,
  items: 1,
  price: null,
  image: null,
  is_box: 0,
  variation_uids : [],
  variation_quantities : {},
  weekend_only: false,
});
const openVariation = (product, variation = null) => {
  selectedProduct.value = product;
  if(variation) {
    int_type.value = 'edit';
    modalTitle.value = 'Edit variation for "' + product.name + '"';
    selectedVariation.value = variation;
    form.name = variation.name;
    form.items = variation.items;
    form.price = variation.price;
    form.image = null;
    form.is_box = variation.is_box ? 1 : 0;
    form.variation_uids = variation.box_product_uids;
    form.variation_quantities = variation.box_product_quantities;
    form.weekend_only = variation.weekend_only === 1;
  } else {
    int_type.value = 'create';
    modalTitle.value = 'Create variation for "' + product.name + '"';
    selectedVariation.value = null;
    form.name = null;
    form.items = 1;
    form.price = null;
    form.image = null;
    form.is_box = 0;
    form.variation_uids = [];
    form.variation_quantities = {};
    form.weekend_only = false;
  }
  saveButtonText.value = 'Save variation';
  showVariationModal.value = true;
};

const handleCheckboxChange = (uid) => {
  if (form.variation_uids.includes(uid)) {
    if (!form.variation_quantities[uid]) {
      form.variation_quantities = { ...form.variation_quantities, [uid]: 1 };
    }
  } else {
    delete form.variation_quantities[uid];
  }
};

const local_errors = ref({});

const closeVariation = () => {
  showVariationModal.value = false;
  local_errors.value = {};
  uploadedImg.value = '';
  imgDataURL.value = '';
  imgBlobURL.value = '';
};

const saveVariation = () => {

  let url;
  if (selectedVariation.value) {
    url = route('admin.update_variation', { product: selectedProduct.value.uid, variation: selectedVariation.value.uid });
  } else {
    url = route('admin.create_variation', { product: selectedProduct.value.uid });
  }
  form.weekend_only_string = form.weekend_only ? 'true' : 'false'
  if (cropper) {
    const base64 = cropper.getDataURL();
    cropper.getBlob().then(blob => {
      if (!blob) {
        return;
      }
      cropper.getFile({
        fileName: 'default',
      }).then(file => {
        imgDataURL.value = base64;
        imgBlobURL.value = URL.createObjectURL(blob);

        let formData = new FormData();

        formData.append('image', blob, 'image.jpg');

        formData.append('name', form.name);
        formData.append('items', form.items);
        formData.append('price', form.price);
        formData.append('is_box', form.is_box);
        formData.append('weekend_only_string', form.weekend_only_string);


        router.post(url, formData, {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            closeVariation();
          },
          onError: (error) => {
            local_errors.value = props.errors;
          }
        });
      }).catch(error => {
        console.log(error);
      });
    });
  } else {
    router.post(url, form, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (page) => {
        closeVariation();
      },
      onError: (error) => {
        local_errors.value = props.errors;
        console.log(props.errors);
      }
    });
  }
};
//end variation

const onFileChange = (e) => {
  uploadedImg.value = '';
  imgDataURL.value = '';
  imgBlobURL.value = '';
  const files = e.target.files;
  if (!files || !files.length) return;
  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    uploadedImg.value = String(reader.result);
    isCropping.value = true;
    if (!uploadInput.value ) return;
    uploadInput.value = {};
  }
};

const autocomplete = ref(null);
const isCropping = ref(false);

const blurInput = () => {
  if (autocomplete.value && autocomplete.value.blur) {
    autocomplete.value.blur();
  }
};

const defaultImg = ref(defaultThumbnail);
const uploadedImg = ref('');
const imgDataURL = ref('');
const imgBlobURL = ref('');
const uploadInput = ref({});

const options = ref({
  size: [400, 267],
  viewMode: 1,
  dragMode: 'crop',
  aspectRatio: 2 / 3,
});

defineExpose({ openVariation });

watch(form, async (newValue) => {
  if (newValue) {
    if(newValue.is_box === 1) {
      form.items = 1;
    }
  }
});

</script>

<template>

  <DialogModal
      :show="showVariationModal"
      @close="closeVariation"
  >
    <template #title>
      {{ modalTitle }}
    </template>
    <template #content>
      <div>
        <v-label class="uppercase">Name</v-label>
        <v-text-field v-model="form.name"
                      :error-messages="local_errors.name"
        />
        <p
            v-if="selectedVariation"
            class="mb-5 italic w-full text-center">Rename to "delete variation" to delete</p>
      </div>
      <div>
        <v-label>This is a box</v-label>
        <v-radio-group v-model="form.is_box" inline>
          <v-radio label="No" :value="0" />
          <v-radio label="Yes" :value="1" />
        </v-radio-group>
        <div>
          <v-checkbox label="Week-end only" v-model="form.weekend_only"
                      :error-messages="props.errors.weekend_only_string"
          />
        </div>
      </div>
      <div v-if="form.is_box === 0">
        <v-label class="uppercase">Number of items</v-label>
        <v-text-field v-model="form.items"
                      :error-messages="local_errors.items"
        />
      </div>
      <div v-else-if="form.is_box === 1" class="mb-7">
        <v-label>Select products</v-label>
        <p class="text-red-500 my-2" v-if="local_errors.variation_uids">{{ local_errors.variation_uids }}</p>
        <p class="text-red-500 my-2" v-if="local_errors.variation_quantities">{{ local_errors.variation_quantities }}</p>
        <div class="bg-slate-200 px-4 py-3 rounded-lg">
          <template v-for="product in props.products">
            <div>
              <p class="font-bold">Product [{{ product.name }}]</p>
              <div class="border-2 border-gray-400 px-2 py-1 mb-3">
                <div v-if="product.variations.length">
                  <div v-for="variation in product.variations">
                    <div class="w-full" v-if="variation.is_box">
                      <p>You can't add a box to another box</p>
                    </div>
                    <div class="w-full" v-else>
                      <div class="flex flex-row items-center gap-10 w-full my-2">
                        <div class="grow">
                          <v-checkbox
                              v-model="form.variation_uids"
                              :value="variation.uid"
                              :label="`Variation [${variation.name}]`" hide-details density="compact"
                              @change="handleCheckboxChange(variation.uid)"
                          />
                        </div>
                        <div
                            style="width: 200px;"
                            class="shrink-0">
                          <v-number-input
                              v-if="form.variation_uids.includes(variation.uid)"
                              class="shrink-0"
                              v-model="form.variation_quantities[variation.uid]"
                              type="number"
                              density="compact"
                              variant="outlined"
                              control-variant="stacked"
                              :min="1"
                              hide-details
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p>This product doesn't have variations</p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div>
        <v-label class="uppercase">Price</v-label>
        <v-text-field prepend-inner-icon="mdi-currency-usd" v-model="form.price"
                      :error-messages="local_errors.price"
        />
      </div>

      <div>
        <VuePictureCropper
            :boxStyle="{
      width: '200px',
      height: '300px',
      backgroundColor: '#f8f8f8',
      margin: 'auto',
    }"
            :img="uploadedImg"
            :options="options"
            v-if="isCropping"
        />
        <img :src="int_type === 'edit' ? selectedVariation.image_url : '/images/products/default.jpg'" alt="Default Image" width="200" height="300" v-else class="mx-auto">
        <v-file-input v-model="uploadInput" prepend-icon="" variant="outlined" density="compact" prepend-inner-icon="mdi-image" class="form-control mt-5" type="file" id="uploadImage" accept="image/jpg, image/jpeg, image/png" @change="onFileChange" />
      </div>

    </template>
    <template #footer>
      <PrimaryButton
          @click="saveVariation"
          class="me-3"
      >{{ saveButtonText }}</PrimaryButton>
      <SecondaryButton
          @click="closeVariation"
      >Cancel</SecondaryButton>
    </template>
  </DialogModal>

  <ErrorModule :error_text="local_errors.msg" />

</template>
