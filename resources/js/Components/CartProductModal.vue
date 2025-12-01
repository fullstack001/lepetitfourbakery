<script setup>
import {computed, reactive, ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import DialogModal from "@/Components/DialogModal.vue";
import {router} from "@inertiajs/vue3";

const props = defineProps({
  event_menu_category: { type: Object, default: null },
});

// product
const showProductModal = ref(false);
const selectedProduct = ref(null);
const selectedVariation = ref(null);
const selectedVariationUID = ref(null);
const selectedQuantity = ref(1);
const selectedNote = ref('');
const canOpen = ref(true);

const selectedPrice = computed(() => {
  if(selectedProduct.value && selectedVariation.value) {
    const value = selectedVariation.value.price * selectedQuantity.value;
    return value.toFixed(2);
  } else {
    return 0;
  }
});

const modalTitle = ref(null);
const saveButtonText = ref(null);

const increaseQuantity = (product) => {
  if(selectedQuantity.value < 20) {
    selectedQuantity.value++;
  }
};

const decreaseQuantity = (product) => {
  if(selectedQuantity.value > 1) {
    selectedQuantity.value--;
  }
};

const openProduct = (product = null) => {
  if(product && canOpen.value) {
    modalTitle.value = product.name;
    selectedProduct.value = product;
    selectedVariation.value = product.variations[0];
    selectedVariationUID.value = product.variations[0].uid;
    saveButtonText.value = 'Add to cart';
    selectedProduct.value = product;
    selectedNote.value = '';
    showProductModal.value = true;
    canOpen.value = false;
  } else {
    showProductModal.value = false;
  }
};

const closeProduct = () => {
  resetAll();
};

const resetAll = () => {
  showProductModal.value = false;
  setTimeout(() => {
    selectedQuantity.value = 1;
    selectedNote.value = '';
    canOpen.value = true;
  }, 500);
};

const resetQuantity = () => {
  selectedQuantity.value = 1;
  selectedVariation.value = selectedProduct.value.variations.find(variation => variation.uid === selectedVariationUID.value);
};

const saveProduct = () => {
  router.post(route('add_to_cart'), {
    product_name: selectedProduct.value.name,
    product_uid: selectedProduct.value.uid,
    variation_name: selectedVariation.value.name,
    variation_uid: selectedVariation.value.uid,
    price: selectedVariation.value.price,
    quantity: selectedQuantity.value,
    note: selectedNote.value,
    thumbnail: selectedVariation.value.image_url,
    event_menu_category_uid: props.event_menu_category?.uid ?? null,
  }, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (page) => {
      resetAll();
    },
    only: [''],
    preserveScroll: true,
    preserveState: true
  });
};
//end product

defineExpose({ openProduct });

</script>

<template>
  <DialogModal
      :show="showProductModal"
      @close="closeProduct"
      maxWidth="7xl"
  >
    <template #content>
      <div>
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div class="col-span-2">

            <v-card v-if="selectedProduct && selectedVariation">
              <v-img aspect-ratio="0.6667" class="rounded-lg" :src="selectedVariation.image_url">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                        color="grey-lighten-4"
                        indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </v-card>

          </div>
          <div class="col-span-3">
            <div class="p-4" v-if="selectedProduct && selectedVariation">
              <p class="text-3xl brand">{{ selectedProduct.name }}</p>
              <p class="text-lg mt-3">{{ selectedProduct.description }}</p>
              <p class="text-lg my-3"><strong>{{ selectedProduct.price_string }}</strong></p>

              <div class="flex flex-row items-center gap-3">
                <template v-if="selectedProduct.weekend_only">
                  <div class="mb-5">
                    <v-chip
                        color="black" variant="outlined"
                        size="x-small">Week-end only</v-chip>
                  </div>
                </template>
                <template v-if="selectedProduct.allow_client_note">
                  <div class="mb-5">
                    <v-chip
                        color="black" variant="outlined"
                        size="x-small">A note can be added</v-chip>
                  </div>
                </template>
              </div>

              <v-select
                v-model="selectedVariationUID"
                :items="selectedProduct.variations"
                item-title="name"
                item-value="uid"
                @update:modelValue="resetQuantity"
              >
                <template #selection="{ item }">
                  {{ item.raw.name }}
                  <template v-if="item.raw.weekend_only">
                    <v-chip class="ms-2" size="x-small" variant="outlined">Week-end only</v-chip>
                  </template>
                </template>
                <template #item="{ item, props }">
                  <v-list-item
                      :value="props.value"
                      @click="props.onClick"
                  >
                    {{ item.raw.name }}
                    <template v-if="item.raw.weekend_only">
                        <v-chip class="ms-2" size="x-small" variant="outlined">Week-end only</v-chip>
                    </template>
                  </v-list-item>
                </template>
              </v-select>

                <div v-if="selectedVariation" class="mb-5">
                  <p class="text-xl">{{ `${selectedVariation.name} - ${selectedVariation.price_string}` }}</p>
                </div>
              <div class="flex flex-row mb-7">
                <div><v-btn icon="mdi-minus" size="x-small" @click.prevent="decreaseQuantity"></v-btn></div>
                <div class="h-100 text-center text-lg" style="width: 60px;"><p>{{ selectedQuantity }}</p></div>
                <div><v-btn icon="mdi-plus" size="x-small" @click.prevent="increaseQuantity"></v-btn></div>
              </div>
              <div v-if="selectedVariation.is_box">
                <div class="hidden lg:block">
                  <p class="text-lg mb-2">This is a box of items. The contents are:</p>
                  <v-table class="border" v-if="selectedVariation.box_products && selectedVariation.box_products.length">
                    <thead>
                    <tr class="border-b">
                      <th class="px-0">
                        <v-img style="width: 50px;" aspect-ratio="1" cover />
                      </th>
                      <th><p class="font-bold">Product</p></th>
                      <th><p class="font-bold">Variation</p></th>
                      <th><p class="font-bold">Quantity</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="box_product in selectedVariation.box_products">
                      <td class="px-0 align-top">
                        <v-img :src="box_product.display_data.image" style="width: 50px;" aspect-ratio="1" cover />
                      </td>
                      <td>
                        <p>{{ box_product.display_data.product_name }}</p>
                      </td>
                      <td>
                        <p>{{ box_product.display_data.variation_name }}</p>
                      </td>
                      <td>
                        <p>{{ box_product.display_data.quantity }}</p>
                      </td>
                    </tr>
                    </tbody>
                  </v-table>
                  <div v-else>
                    <p class="text-red">An error occurred.</p>
                  </div>
                </div>
                <div class="block lg:hidden">
                  <p class="text-lg mb-2">This is a box of items. The contents are:</p>
                  <v-table class="border" v-if="selectedVariation.box_products && selectedVariation.box_products.length">
                    <tbody>
                    <tr v-for="box_product in selectedVariation.box_products">
                      <td class="px-0 align-top">
                        <v-img :src="box_product.display_data.image" style="width: 50px;" aspect-ratio="1" cover />
                      </td>
                      <td>
                        <p><strong>{{ `${box_product.display_data.product_name}` }}</strong>&nbsp;{{ `(${box_product.display_data.variation_name}) ${box_product.display_data.quantity}` }}</p>
                      </td>
                    </tr>
                    </tbody>
                  </v-table>
                  <div v-else>
                    <p class="text-red">An error occurred.</p>
                  </div>
                </div>
              </div>
              <template v-if="selectedProduct.allow_client_note">
                <p>Note (optional)</p>
                <div>
                  <v-textarea rows="3" auto-grow v-model="selectedNote" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

    </template>
    <template #footer>
      <div class="flex flex-row flex-wrap gap-3">
        <PrimaryButton
            @click="saveProduct"
        >{{ saveButtonText }} (${{ selectedPrice }})</PrimaryButton>
        <SecondaryButton
            @click="closeProduct"
        >Cancel</SecondaryButton>
      </div>
    </template>
  </DialogModal>

</template>
