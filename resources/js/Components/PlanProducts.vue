<script setup>

import {computed, nextTick, onMounted, reactive, ref, watch} from "vue";

const props = defineProps({
  plan: { type: Object, default: null },
  products: { type: Object, default: null },
  items: { type: Object, default: null },
  source: { type: String, default: 'plan' },
  next_available_date: String,
  placeholder: { type: Boolean, default: false },
  image_url: { type: String, default: '' },
  selectable: { type: Boolean, default: false },
});

const form = reactive({});

const selectedProducts = ref([]);
const selectedQuantities = ref([]);
const selectedAmounts = ref([]);
const selectedAmountsFormatted = ref([]);
const variationPrices = ref({});

const amountsSum = computed(() => {
  return Object.values(selectedAmounts.value).reduce((sum, value) => sum + value, 0);
});

const amountsSumFormatted = computed(() => {
  return formatNumber(amountsSum.value);
});

watch(selectedProducts, (newVal, oldVal) => {
  const updatedQuantities = { ...selectedQuantities.value };
  const updatedAmounts = { ...selectedAmounts.value };
  const updatedAmountsFormatted = { ...selectedAmountsFormatted.value };

  // Add new UIDs with a default value of 1
  newVal.forEach(uid => {
    if (!updatedQuantities.hasOwnProperty(uid)) {
      updatedQuantities[uid] = 1;
    }
    if (!updatedAmounts.hasOwnProperty(uid)) {
      updatedAmounts[uid] = variationPrices.value[uid];
    }
    if (!updatedAmountsFormatted.hasOwnProperty(uid)) {
      updatedAmountsFormatted[uid] = formatNumber(variationPrices.value[uid]);
    }
  });

  // Remove UIDs that are no longer in selectedProducts
  oldVal.forEach(uid => {
    if (!newVal.includes(uid)) {
      delete updatedQuantities[uid];
      delete updatedAmounts[uid];
      delete updatedAmountsFormatted[uid];
    }
  });

  selectedQuantities.value = updatedQuantities;
  selectedAmounts.value = updatedAmounts;
  selectedAmountsFormatted.value = updatedAmountsFormatted;
});

function formatNumber(value) {
  const number = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
  return '$' + number;
}

const updateSelectedAmount = (uid) => {
  selectedAmounts.value[uid] = variationPrices.value[uid] * selectedQuantities.value[uid];
  selectedAmountsFormatted.value[uid] = formatNumber(variationPrices.value[uid] * selectedQuantities.value[uid]);
};

const subQuantity = (uid) => {
  if(selectedQuantities.value[uid] > 1) {
    selectedQuantities.value[uid]--;
    updateSelectedAmount(uid);
  }
};

const addQuantity = (uid) => {
  selectedQuantities.value[uid]++;
  updateSelectedAmount(uid);
};

const checkout = () => {
  axios.post(route('add_on_checkout'),{
    addons: selectedQuantities.value,
  })
      .then(response => {
        const url = response.data.url;
        if (url === 'error') {
          console.log('An error occurred');
        } else if (isValidUrl(url)) {
          window.location.href = url;
        } else {
          console.log('Invalid URL');
        }
      })
      .catch(error => {
        console.error('error');
      });
};

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

const openProductModal = (product) => {
    emit('open', product);
};

const emit = defineEmits(['open']);


onMounted(() => {
  nextTick(() => {
    const list = {};
    if(props.source === 'addons' && props.products) {
      props.products.forEach(product => {
        if(product.variations?.length??0) {
          product.variations.forEach(variation => {
            list[variation.uid] = variation.price;
          });
          variationPrices.value = list;
        }
      });
    }
  });
});

</script>

<template>

    <div>
      <div v-if="props.source === 'addons'" class="text-center my-10">
        <p class="text-3xl font-bold">Add-ons</p>
        <p>You can add products to your next delivery on {{ next_available_date }}</p>

        <div class="flex flex-col gap-3 mt-5">
          <div v-for="product in props.products">
            <v-card v-if="product.variations?.length??0" color="white" elevation="2" rounded="lg">
              <v-card-item>
                <!-- variations -->
                <div class="flex flex-col gap-3">
                  <div v-for="variation in product.variations">
                    <div class="flex flex-row flex-wrap gap-6 items-center">
                      <div class="shrink-0">
                        <v-checkbox :value="variation.uid" v-model="selectedProducts" multiple hide-details />
                      </div>
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
                        <div class="grid grid-cols-1 lg:grid-cols-4 gap-3 w-full items-center">
                          <div class="text-left">
                            <p class="text-lg"><strong>{{ product.name }}</strong> ({{ variation.name }})</p>
                          </div>
                          <div class="text-center">
                            <p class="text-lg">{{ variation.price_string }}</p>
                          </div>
                          <div class="flex flex-row items-center">
                            <div v-if="selectedQuantities[variation.uid] !== undefined">
                              <v-btn size="x-small" icon="mdi-minus" @click.prevent="subQuantity(variation.uid)"></v-btn>
                              <v-btn color="transparent">{{ selectedQuantities[variation.uid] }}</v-btn>
                              <v-btn size="x-small" icon="mdi-plus" @click.prevent="addQuantity(variation.uid)"></v-btn>
                            </div>
                          </div>
                          <div>
                            <p class="text-lg" v-if="selectedAmountsFormatted[variation.uid] !== undefined">{{ selectedAmountsFormatted[variation.uid] }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end variations -->
              </v-card-item>
            </v-card>
            <v-card v-else>
              <v-card-item>
                <div class="flex flex-row flex-wrap gap-6 items-center">
                  <div class="shrink-0">
                    <v-checkbox hide-details />
                  </div>
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

        </div>
      </div>

      <div v-else>
        <div class="flex flex-col gap-0">

          <div v-if="props.placeholder" class="mt-2">

            <v-card
                @click.prevent="openProductModal(null)"
                class="cursor-pointer"
                v-if="props.plan && props.plan.has_customization" variant="flat" rounded="lg" color="grey-lighten-4">
              <v-card-item>
                <!-- variations -->
                <div>
                  <div class="flex flex-row flex-wrap gap-6 items-center">
                    <div class="shrink-0">
                      <v-img rounded="lg" width="50px" aspect-ratio="1" cover class="zoom-image shadow-sm" :src="props.image_url" alt="">
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
                        <p class="text-lg">Select a product</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end variations -->
              </v-card-item>
            </v-card>

            <v-card v-else variant="flat" rounded="lg" color="grey-lighten-4">
              <v-card-item>
                <!-- variations -->
                <div>
                  <div class="flex flex-row flex-wrap gap-6 items-center">
                    <div class="shrink-0">
                      <v-img rounded="lg" width="50px" aspect-ratio="1" cover class="zoom-image shadow-sm" :src="props.image_url" alt="">
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
                        <p class="text-lg">???</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end variations -->
              </v-card-item>
            </v-card>

          </div>

          <div v-else-if="props.items" class="mt-2"
               v-for="item in props.items"
          >
            <v-card
                :class="selectable ? 'cursor-pointer' : 'cursor-default'"
                @click.prevent="props.selectable ? openProductModal(item) : null"
                variant="flat" rounded="lg">
              <v-card-item>
                <!-- variations -->
                <div class="flex flex-col gap-3">
                  <div>
                    <div class="flex flex-row flex-wrap gap-6 items-center">
                      <div class="shrink-0">
                        <v-img rounded="lg" width="50px" aspect-ratio="1" cover class="zoom-image shadow-sm" :src="item.variation.image_url" alt="">
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
                        <div class="flex flex-row w-full justify-between items-center">
                          <p class="text-lg">
                            <span class="font-bold">{{ item.product.name }}</span>&nbsp;<span>({{ item.variation.name }})</span>
                          </p>
                          <p class="text-lg">
                            <span>x{{ item.quantity }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end variations -->
              </v-card-item>
            </v-card>
          </div>

            <div v-else-if="props.plan" v-for="variation in props.plan.variations" class="mt-2">
              <v-card variant="flat" rounded="lg">
                <v-card-item>
                  <!-- variations -->
                  <div class="flex flex-col gap-3">
                    <div>
                      <div class="flex flex-row flex-wrap gap-6 items-center">
                        <div class="shrink-0" v-if="props.source === 'addons'">
                          <v-checkbox :value="variation.uid" v-model="selectedProducts" multiple hide-details />
                        </div>
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
                          <div v-if="props.source === 'addons'"
                               class="grid grid-cols-1 lg:grid-cols-4 gap-3 w-full items-center">
                            <div>
                              <p class="font-bold text-lg">{{ variation.product.name }} ({{ variation.name }})</p>
                            </div>
                            <div>
                              <p class="text-lg">{{ variation.price_string }}</p>
                            </div>
                            <div class="flex flex-row items-center">
                              <div v-if="selectedQuantities[variation.uid] !== undefined">
                                <v-btn size="x-small" icon="mdi-minus" @click.prevent="subQuantity(variation.uid)"></v-btn>
                                <v-btn color="transparent">{{ selectedQuantities[variation.uid] }}</v-btn>
                                <v-btn size="x-small" icon="mdi-plus" @click.prevent="addQuantity(variation.uid)"></v-btn>
                              </div>
                            </div>
                            <div>
                              <p class="text-lg" v-if="selectedAmountsFormatted[variation.uid] !== undefined">{{ selectedAmountsFormatted[variation.uid] }}</p>
                            </div>
                          </div>
                          <div v-else class="flex flex-row w-full justify-between items-center">
                            <p class="text-lg">
                              <span class="font-bold">{{ variation.product.name }}</span>&nbsp;<span>({{ variation.name }})</span>
                            </p>
                            <p class="text-lg">
                              <span>x{{ variation.pivot.quantity }}</span>
                            </p>
                          </div>
                        </div>
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

  <div v-if="props.source === 'addons'">
    <div class="flex flex-col justify-center mt-10">
      <div class="text-center mb-10">
        <p class="text-3xl">{{ amountsSumFormatted }}</p>
      </div>
      <div class="text-center">
        <v-btn v-if="amountsSum > 0" @click.prevent="checkout">Add to next delivery</v-btn>
        <v-btn v-else color="grey">Add to next delivery</v-btn>
      </div>
    </div>
  </div>

</template>

<style scoped>
.center :deep(input) {
  text-align: center;
}
</style>
