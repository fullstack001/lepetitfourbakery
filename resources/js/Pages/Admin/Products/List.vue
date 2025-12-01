<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head} from "@inertiajs/vue3";
import ProductModal from "@/Components/ProductModal.vue";
import {ref} from "vue";
import VariationModal from "@/Components/VariationModal.vue";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  categories: Object,
  event_menu_categories: Object,
  products: Object,
  boxable_products: Object,
  errors: Object,
});

const productModal = ref(null);
const variationModal = ref(null);

const createVariation = (product) => {
  variationModal.value.openVariation(product, null)
};

const editVariation = (product, variation) => {
  variationModal.value.openVariation(product, variation)
};

</script>

<template>
  <AdmLayout title="Products">
    <template #buttons>
        <v-btn
            @click.prevent="productModal.openProduct(null)"
            size="small">Create new product</v-btn>
    </template>
    <div v-if="props.products.length">
      <div>
        <div class="flex flex-col gap-3">
          <div v-for="product in props.products">
            <v-card>
              <v-card-item>
                <div class="flex flex-row items-center justify-between">
                  <div class="flex flex-row items-center gap-2">
                    <p class="text-lg font-bold">{{ product.name }} - {{ product.price_string }}</p>
                    <v-icon :color="product.active ? 'green' : 'red'">{{ product.active ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                    <template v-if="product.weekend_only">
                      <v-tooltip text="Week-end-only" location="top">
                        <template v-slot:activator="{ props }">
                          <v-chip
                              v-bind="props" color="amber" variant="flat"
                              size="x-small">WE</v-chip>
                        </template>
                      </v-tooltip>
                    </template>
                    <template v-if="product.allow_client_note">
                      <v-tooltip text="Client note allowed" location="top">
                        <template v-slot:activator="{ props }">
                          <v-chip
                              v-bind="props" color="cyan-lighten-2" variant="flat"
                              size="x-small">NT</v-chip>
                        </template>
                      </v-tooltip>
                    </template>
                  </div>
                  <v-btn
                      @click.prevent="productModal.openProduct(product)"
                      size="small">Edit product</v-btn>
                </div>
                <div v-if="product.description">
                  <p>{{ product.description_formatted }}</p>
                </div>
                <!-- categories -->
                <hr class="my-2">
                <div class="mt-2">
                  <div v-if="product.categories.length">
                    <div class="flex flex-row flex-wrap gap-1">
                      <div v-if="product.in_sneak_peek_menu"><v-chip size="small" variant="outlined">Sneak peek</v-chip></div>
                      <div v-if="product.in_catering_menu"><v-chip size="small" variant="outlined">Events menu</v-chip></div>
                      <div v-if="product.in_add_ons_menu"><v-chip size="small" variant="outlined">Add-ons</v-chip></div>
                      <div v-for="category in product.categories">
                        <v-chip size="small" color="red-darken-4">{{ category.name }}</v-chip>
                      </div>
                      <div v-for="category in product.event_menu_categories">
                        <v-chip size="small" color="blue-darken-4">{{ category.name }}</v-chip>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <v-chip size="x-small">Uncategorized</v-chip>
                  </div>
                </div>
                <!-- end categories -->
                <!-- variations -->
                <div class="mt-2">
                  <div>
                    <div class="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                      <div v-for="variation in product.variations">
                        <v-card color="grey-lighten-4" class="h-full">
                          <div class="flex flex-row items-center h-full">
                            <div style="width: 60px; height: 100%;" class="shrink-0">
                              <v-img :src="variation.image_url" width="60px" class="h-full" cover />
                            </div>
                            <div class="p-3 flex-1 min-w-0">
                              <p class="truncate">{{ variation.name }}</p>
                              <p v-if="variation.is_box" class="text-sm">(box: {{ variation.box_contents }})</p>
                              <p v-else class="text-sm">({{ variation.items }} item{{ variation.items > 1 ? 's' : '' }})</p>
                              <Row :center="true" justify="between">
                                  <div>
                                    <v-btn
                                        @click.prevent="editVariation(product, variation)"
                                        size="x-small">{{ variation.price_string }}</v-btn>
                                  </div>
                                <div v-if="variation.weekend_only">
                                    <v-tooltip text="Week-end only" location="top">
                                      <template v-slot:activator="{ props }">
                                        <v-chip
                                            v-bind="props" color="amber" variant="flat"
                                            size="x-small">WE</v-chip>
                                      </template>
                                    </v-tooltip>
                                </div>
                              </Row>
                            </div>
                          </div>
                        </v-card>
                      </div>
                      <v-card color="grey-darken-2" class="h-full">
                        <div class="flex flex-row items-center h-full">
                          <div style="width: 60px; height: 100%;" class="shrink-0">
                            <v-img src="/images/products/default.jpg" width="60px" class="h-full" cover />
                          </div>
                          <div class="p-3">
                            <v-btn
                                @click.prevent="createVariation(product, null)"
                                size="x-small">Create variation</v-btn>
                          </div>
                        </div>
                      </v-card>
                    </div>
                  </div>
                </div>
                <!-- end variations -->
              </v-card-item>
            </v-card>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
        <p>There are no products for now</p>
    </div>
    <ProductModal ref="productModal"
                  :categories="props.categories"
                  :event_menu_categories="props.event_menu_categories"
                  :errors="props.errors" />
    <VariationModal ref="variationModal"
                    :products="props.boxable_products"
                    :errors="props.errors" />
  </AdmLayout>
</template>
