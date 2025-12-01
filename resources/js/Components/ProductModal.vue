<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
import ErrorModule from "@/Components/ErrorModule.vue";
const props = defineProps({
  categories: Object,
  event_menu_categories: Object,
  errors: Object,
});

// product
const showProductModal = ref(false);
const selectedProduct = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const form = reactive({
  name: null,
  description: null,
  in_sneak_peek_menu: false,
  in_catering_menu: false,
  in_add_ons_menu: false,
  active: true,
  categories: [],
  event_menu_categories: [],
  weekend_only: false,
});
const openProduct = (product = null) => {
  local_errors.value = {};
  if(product) {
    modalTitle.value = 'Edit product';
    selectedProduct.value = product;
    form.name = product.name;
    form.description = product.description;
    form.in_sneak_peek_menu = product.in_sneak_peek_menu === 1;
    form.in_catering_menu = product.in_catering_menu === 1;
    form.in_add_ons_menu = product.in_add_ons_menu === 1;
    form.active = product.active === 1;
    form.weekend_only = product.weekend_only === 1;
    form.allow_client_note = product.allow_client_note === 1;
    form.categories = product.category_uids;
    form.event_menu_categories = product.event_menu_category_uids;
  } else {
    modalTitle.value = 'Create product';
    selectedProduct.value = null;
    form.name = null;
    form.description = null;
    form.in_sneak_peek_menu = false;
    form.in_catering_menu = false;
    form.in_add_ons_menu = false;
    form.active = true;
    form.weekend_only = false;
    form.allow_client_note = false;
    form.categories = [];
    form.event_menu_categories = [];
  }
  saveButtonText.value = 'Save product';
  showProductModal.value = true;
};

const local_errors = ref({});

const closeProduct = () => {
  showProductModal.value = false;
  selectedProduct.value = null;
};

const saveProduct = () => {
  let url;
  if(selectedProduct.value) {
    url = route('admin.update_product',{product: selectedProduct.value.uid})
  } else {
    url  = route(`admin.create_product`);
  }
  router.post(url, form, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      closeProduct();
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};
//end product

defineExpose({ openProduct })
</script>

<template>

    <DialogModal
      :show="showProductModal"
      @close="closeProduct"
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
              v-if="selectedProduct"
              class="mb-5 italic w-full text-center">Rename to "delete product" to delete</p>
        </div>

        <div>
          <v-label class="uppercase">Description (optional)</v-label>
          <v-textarea v-model="form.description"
                      :error-messages="local_errors.description"
          />
        </div>

        <div>
          <div>
            <v-label class="uppercase">Appears in</v-label>
          </div>
          <div class="grid grid-cols-3">
            <div>
              <v-checkbox label="Sneak peek" v-model="form.in_sneak_peek_menu"
                          :error-messages="local_errors.in_sneak_peek_menu"
              />
            </div>
            <div v-if="false">
              <v-checkbox label="Catering" v-model="form.in_catering_menu"
                          :error-messages="local_errors.in_catering_menu"
              />
            </div>
            <div>
              <v-checkbox label="Add-ons" v-model="form.in_add_ons_menu"
                          :error-messages="local_errors.in_add_ons_menu"
              />
            </div>
          </div>
        </div>

        <div>
          <v-label class="uppercase">Event menu categories</v-label>
          <v-select
              v-if="props.event_menu_categories.length"
              v-model="form.event_menu_categories"
              :items="props.event_menu_categories"
              item-value="uid"
              item-title="name"
              multiple
              chips
              :error-messages="local_errors.event_menu_categories"
          />
          <div v-else>
            <p class="text-red">You need to create at least one event menu category in able to show this product in the events menu</p>
          </div>
        </div>

        <div>
          <v-label class="uppercase">Settings</v-label>
          <div class="grid grid-cols-3">
            <div>
                <v-checkbox label="Is active" v-model="form.active"
                            :error-messages="props.errors.active"
                />
            </div>
            <div>

              <v-checkbox label="Week-end only" v-model="form.weekend_only"
                          :error-messages="props.errors.weekend_only"
              />
            </div>
            <div>

              <v-checkbox label="Client note" v-model="form.allow_client_note"
                          :error-messages="props.errors.allow_client_note"
              />
            </div>
          </div>
        </div>

        <div>
          <v-label class="uppercase">Categories</v-label>
          <v-select
              v-if="props.categories.length"
              v-model="form.categories"
            :items="props.categories"
            item-value="uid"
            item-title="name"
            multiple
            chips
            :error-messages="local_errors.categories"
          />
          <div v-else>
            <p class="text-red">You need to create at least one category in able to save a product</p>
          </div>
        </div>

      </template>
      <template #footer>
        <PrimaryButton
          @click="saveProduct"
          class="me-3"
        >{{ saveButtonText }}</PrimaryButton>
        <SecondaryButton
          @click="closeProduct"
        >Cancel</SecondaryButton>
      </template>
    </DialogModal>

  <ErrorModule :error_text="local_errors.msg" />

</template>
