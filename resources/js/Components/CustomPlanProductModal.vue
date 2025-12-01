<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";

// product
const showProductModal = ref(false);
const selectedProduct = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const props = defineProps({
  products: Object,
});

const formProduct = reactive({
  uid: null,
  quantity: 0,
});
const openProduct = (product = null) => {
  local_errors.value = {};
  if(product) {
    modalTitle.value = 'Select an item';
    selectedProduct.value = product;
    formProduct.uid = product.uid;
    formProduct.quantity = product.quantity;
  } else {
    modalTitle.value = 'Select an item';
    selectedProduct.value = null;
    formProduct.uid = null;
    formProduct.quantity = 0;
  }
  saveButtonText.value = 'Save product';
  showProductModal.value = true;
};

const closeProduct = () => {
  showProductModal.value = false;
  selectedProduct.value = null;
};

const local_errors = ref({});

const saveProduct = () => {
  let url;
  if(selectedProduct.value) {
    url = route('update_premium_subscription_item',{item: selectedProduct.value.uid})
  } else {
    url  = route(`create_premium_subscription_item`);
  }
  router.post(url, formProduct, {
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

const selectProduct = (variation, quantity) => {
  formProduct.uid = variation.uid;
  formProduct.quantity = quantity;
  saveProduct();
};

const removeProduct = (variation, quantity) => {
  formProduct.uid = variation.uid;
  formProduct.quantity = 0;
  saveProduct();
};

defineExpose({ openProduct });

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

        <div class="flex flex-col gap-3">
          <div v-for="(product, index) in props.products">
            <v-menu>
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="cursor-pointer">
                  <v-card :color="selectedProduct && selectedProduct.product.uid === product.uid ? '#f99c19' : 'grey-lighten-4'" rounded="lg">
                    <v-card-item>
                      <div class="flex flex-row flex-wrap gap-6 items-center">
                        <div class="shrink-0">
                          <v-img rounded="lg" width="50px" aspect-ratio="1" cover class="zoom-image shadow-sm" :src="product.image_url" alt="">
                            <template v-slot:placeholder>
                              <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular
                                    color="grey-lighten-4"
                                    indeterminate
                                ></v-progress-circular>
                              </div>
                            </template>
                          </v-img>
                        </div>
                        <div class="grow flex flex-row items-center">
                          <div>
                            <p class="font-bold text-lg">{{ product.name }}</p>
                          </div>
                        </div>
                      </div>
                    </v-card-item>
                  </v-card>
                </div>
              </template>
              <v-list elevation="3" color="blue" class="flex flex-col gap-1">
                <v-list-item v-for="variation in product.variations">
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <div v-bind="props" class="cursor-pointer">
                      <v-card class="cursor-pointer"
                              :color="selectedProduct && selectedProduct.variation.uid === variation.uid ? '#f99c19' : 'grey-lighten-4'"
                              rounded="lg">
                        <v-card-item>
                          <div class="flex flex-row flex-wrap gap-6 items-center">
                            <div class="shrink-0">
                              <v-img rounded="lg" width="50px" aspect-ratio="1" cover class="zoom-image shadow-sm" :src="variation.image_url" alt="">
                                <template v-slot:placeholder>
                                  <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular
                                        color="grey-lighten-4"
                                        indeterminate
                                    ></v-progress-circular>
                                  </div>
                                </template>
                              </v-img>
                            </div>
                            <div class="grow flex flex-row items-center">
                              <div>
                                <p class="font-bold text-lg">{{ variation.name }}</p>
                              </div>
                            </div>
                          </div>
                        </v-card-item>
                      </v-card>
                      </div>
                    </template>
                    <div class="p-4">
                      <v-list elevation="2" rounded="lg">
                        <v-list-item>
                          <div class="flex flex-row items-center gap-2 w-full">
                            <div class="flex flex-row items-center gap-2 w-full"
                                v-if="variation.possible_quantity">
                              <div
                                  @click.prevent="selectProduct(variation, quantity)"
                                  class="bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                  v-for="quantity in variation.possible_quantity">
                                x{{ quantity }}
                              </div>
                            </div>
                            <div v-else>
                              <p>The subscription has reached the maximum of 9 items.</p>
                            </div>
                            <div
                                @click.prevent="removeProduct(variation, quantity)"
                                class="bg-grey-darken-4 text-white px-3 py-1 rounded-lg cursor-pointer"
                                v-if="selectedProduct && selectedProduct.variation.uid === variation.uid">
                              Remove
                            </div>
                          </div>
                        </v-list-item>
                      </v-list>
                    </div>
                  </v-menu>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>

      </template>
      <template #footer>
        <SecondaryButton
          @click="closeProduct"
        >Cancel</SecondaryButton>
      </template>
    </DialogModal>

</template>
