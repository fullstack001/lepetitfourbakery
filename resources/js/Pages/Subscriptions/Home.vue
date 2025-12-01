<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import WrapperFull from "@/Components/WrapperFull.vue";
import Wrapper from "@/Components/Wrapper.vue";
import {computed, nextTick, onMounted, reactive, ref, watch} from "vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import DialogModal from "@/Components/DialogModal.vue";
import PlanProducts from "@/Components/PlanProducts.vue";
import CustomPlanProductModal from "@/Components/CustomPlanProductModal.vue";
import AddressModal from "@/Components/AddressModal.vue";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Logo from "@/Components/Logo.vue";
import DeliveryDayModal from "@/Components/DeliveryDayModal.vue";
import { useDisplay } from 'vuetify';
import {formatTitle,linkOutcome, formatEmphasis} from "@/utils.js";

const { mobile } = useDisplay();

gsap.registerPlugin(ScrollTrigger);

defineOptions({ layout: AppLayout });

const props = defineProps({
  content: Object,
  plans: Object,
  subscribed_plan: Object,
  add_on_products: Object,
  add_on_variations: Object,
  customization_products: Object,
  premium_subscription_items: Object,
  stripe_key: String,
  next_available_date: String,
  phone: String,
  full_name: String,
  address_1: String,
  address_2: String,
  post_code: String,
  city: String,
  is_subscribed: Boolean,
  renews: Boolean,
  has_valid_postcode: Boolean,
  billing_period_ends: String,
  errors: Object,
  plan_variations: Object,
  premium_subscription_item_uids: Object,
  extra_delivery_fee: Object,
  delivery_day: String,
  can_update_delivery_day: Boolean,
});

onMounted(() => {
  gsap.from('.animate-item', {
    scrollTrigger: {
      trigger: '.animate-item',
      start: 'top 60%',
    },
    opacity: 0,
    y: -30,
    duration: 1,
    ease: 'power2.out',
  });
  gsap.from('.animate-item-2', {
    scrollTrigger: {
      trigger: '.animate-item',
      start: 'top 60%',
    },
    opacity: 0,
    y: -30,
    duration: 1,
    delay: 0.25,
    ease: 'power2.out',
  });
  gsap.from('.animate-item-3', {
    scrollTrigger: {
      trigger: '.animate-item',
      start: 'top 60%',
    },
    opacity: 0,
    y: -30,
    duration: 1,
    delay: 0.5,
    ease: 'power2.out',
  });
});

const orderAmount = (amount) => {
  return (amount / 100).toFixed(2);
};

const selectedPlan = ref(null);
const showPlanModal = ref(false);
const modalTitle = ref('');
const subscribeForm = reactive({
  plan: null,
  frequency: null,
  delivery_day: null,
});

let stripe;

const selectPlan = (plan) => {
  subscribeForm.frequency = null;
  subscribeForm.delivery_day = null;
  modalTitle.value = `Plan ${plan.name}`;
  selectedPlan.value = plan;
  subscribeForm.plan = plan.uid;
  showPlanModal.value = true;
};

const resetPlan = () => {
  for (let key in errors) {
    delete errors[key];
  }
  showPlanModal.value = false;
  // selectedPlan.value = null;
  // modalTitle.value = '';
};

const loadStripeScript = () => {
  return new Promise((resolve) => {
    if (window.Stripe) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.id = 'stripe-js';
      script.src = 'https://js.stripe.com/v3/';
      script.onload = resolve;
      document.body.appendChild(script);
    }
  });
};

const errors = reactive({});

const subscribe = async () => {
  try {
    for (let key in errors) {
      delete errors[key];
    }
    const plan_id = selectedPlan.value.id;
    const response = await axios.post(route('subscribe'), subscribeForm);

    const sessionId = response.data.id;
    stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const responseErrors = error.response.data.errors;
      Object.keys(responseErrors).forEach(key => {
        errors[key] = responseErrors[key];
      });
    } else {
      errors.value = ['An unexpected error occurred. Please try again.'];
    }
  }
};

const createCustomerPortalSession = async () => {
  try {
    const response = await axios.post(route('stripe.customer-portal'));
    window.location.href = response.data.url;
  } catch (error) {
    console.error('Error creating Customer Portal Session:', error);
  }
};

const customPlanProductModal = ref(null);

const openProductModal = (product) => {
  customPlanProductModal.value.openProduct(product);
};

const addressModal = ref(null);

const postCode = ref('');

const local_errors = ref({});

const savePostCode = () => {
  local_errors.value = {};
  router.post(route('save_postcode'), {
    postcode: postCode.value,
  }, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      subscribeForm.post_code = props.post_code;
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};

const modifyBoxSelection = ref(false);
const manageAddOns = ref(false);
const boxSelectionForm = reactive({
  variations: [],
  quantities: {},
});


const handleCheckboxChange = (uid) => {
  if (boxSelectionForm.variations.includes(uid)) {
    if (!boxSelectionForm.quantities[uid]) {
      boxSelectionForm.quantities = { ...boxSelectionForm.quantities, [uid]: 1 };
    }
  } else {
    delete boxSelectionForm.quantities[uid];
  }
}

const productQuantity = computed(() => {
  return Object.values(boxSelectionForm.quantities).reduce((sum, quantity) => sum + quantity, 0);
});

const isActive = (uid) => {
  return Object.prototype.hasOwnProperty.call(boxSelectionForm.quantities, uid);
};


const toggleModifyBoxSelection = () => {
  manageAddOns.value = false;
  modifyBoxSelection.value = true;
  boxSelectionForm.variations = Object.keys(props.premium_subscription_item_uids);
  boxSelectionForm.quantities = { ...props.premium_subscription_item_uids };
};
const toggleManageAddons = () => {
  if (props.add_on_variations) {
    const list = {};
    Object.values(props.add_on_variations).forEach(variation => {
      list[variation.uid] = variation.price;
    });
    variationPrices.value = list;
  }
  modifyBoxSelection.value = false;
  manageAddOns.value = true;
};

const toggleAllOff = () => {
  modifyBoxSelection.value = false;
  manageAddOns.value = false;
  boxSelectionForm.variations = [];
  boxSelectionForm.quantities = {};
};

const saveBoxSelection = () => {
  if(modifyBoxSelection.value) {
    router.post(route('update_box_selection'), boxSelectionForm, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (page) => {
        toggleAllOff();
      },
      onError: (error) => {
        local_errors.value = props.errors;
      }
    });
  }
};

function formatNumber(value) {
  const number = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
  return '$' + number;
}

const selectedVariations = ref([]);
const selectedQuantities = ref([]);
const selectedAmounts = ref([]);
const selectedAmountsFormatted = ref([]);
const variationPrices = ref({});

const subQuantity = (uid) => {
  if (selectedQuantities.value[uid] > 1) {
    selectedQuantities.value = {
      ...selectedQuantities.value,
      [uid]: selectedQuantities.value[uid] - 1
    };
    updateSelectedAmount(uid);
  } else {
    const { [uid]: unusedValue, ...rest } = selectedQuantities.value;
    selectedQuantities.value = rest;
    updateSelectedAmount(uid);

    const { [uid]: unusedAmount, ...remainingAmounts } = selectedAmountsFormatted.value;
    selectedAmountsFormatted.value = remainingAmounts;


    if (selectedVariations.value.includes(uid)) {
      selectedVariations.value = selectedVariations.value.filter(item => item !== uid);
    }
  }
};

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

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
        console.log(error);
        console.error('error');
      });
};

const amountsSum = computed(() => {
  return Object.values(selectedAmounts.value).reduce((sum, value) => sum + value, 0);
});

const amountsSumFormatted = computed(() => {
  return formatNumber(amountsSum.value);
});

const addQuantity = (uid) => {
  selectedQuantities.value = {
    ...selectedQuantities.value,
    [uid]: selectedQuantities.value[uid] ? selectedQuantities.value[uid] + 1 : 1
  };
  if (!selectedVariations.value.includes(uid)) {
    selectedVariations.value.push(uid);
  }
  updateSelectedAmount(uid);
};

const plansWrapperClass = computed(() => {
  if(props.plans.length === 1) {
    return 'flex flex-row justify-center max-w-md mx-auto gap-6';
  }
  return 'grid grid-cols-1 lg:grid-cols-2 gap-6';
});

const featuresWrapperClass = computed(() => {
  if(props.plans.length === 1) {
    return 'grid grid-cols-2 gap-0';
  }
  return 'grid grid-cols-1 lg:grid-cols-3 gap-0';
});

const updateSelectedAmount = (uid) => {
  selectedAmounts.value[uid] = variationPrices.value[uid] * selectedQuantities.value[uid];
  selectedAmountsFormatted.value[uid] = formatNumber(variationPrices.value[uid] * selectedQuantities.value[uid]);
};

watch(selectedVariations, (newVal, oldVal) => {
  const updatedQuantities = { ...selectedQuantities.value };
  const updatedAmounts = { ...selectedAmounts.value };
  const updatedAmountsFormatted = { ...selectedAmountsFormatted.value };

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
}, { deep: true });

//--------------------------

onMounted(async () => {
  await loadStripeScript();
  stripe = window.Stripe(props.stripe_key);
  await nextTick(() => {
    subscribeForm.phone = props.phone;
    subscribeForm.full_name = props.full_name;
    subscribeForm.address_1 = props.address_1;
    subscribeForm.address_2 = props.address_2;
    subscribeForm.post_code = props.post_code;
    subscribeForm.city = props.city;
    postCode.value = props.post_code;
  });
});

const deliveryDayModal = ref(null);
const changeDay = () => {
  if(props.can_update_delivery_day) {
    deliveryDayModal.value.openDeliveryDay(props.delivery_day);
  }
};

</script>

<template>

  <Head title="Subscription"></Head>

  <WrapperFull style="margin-top: 150px;">

    <Wrapper>
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="text-7xl brand uppercase" v-html="formatTitle(props.content.title)" />
          <div v-if="!props.has_valid_postcode" class="w-full bg-red-lighten-2 mt-5 py-5 rounded-lg">
            <div>
              <p>We can only deliver to certain postcodes in the Boston area.</p>
              <p>Please enter your post code below to start.</p>
            </div>
            <div class="mt-5 max-w-xs mx-auto bg-white p-2">
              <v-text-field
                  @keyup.enter="savePostCode"
                  class="text-black text-center"
                  v-model="postCode"
                  placeholder="Your post code"
                  variant="filled"
                  hide-details
              >
                <template v-slot:append>
                  <v-btn
                      @click.prevent="savePostCode"
                      class="pa-0 w-full" variant="flat">Save</v-btn>
                </template>
              </v-text-field>
            </div>
          </div>
          <p v-if="local_errors.postcode" class="text-red font-bold mt-3">{{ local_errors.postcode }}</p>
          <div v-if="!props.has_valid_postcode && props.post_code" class="mt-3">
            <p>Unfortunately, the post code <strong class="text-red">{{ props.post_code }}</strong> is outside of our delivery zone.</p>
            <p>Please enter a different post code.</p>
          </div>
          <div class="mt-5 flex flex-row items-center"
               v-if="props.is_subscribed"
          >
            <v-img :src="`/images/${props.subscribed_plan.image}`" width="150" class="shrink-0"
                   style="margin-top: -100px;"
            />
            <div class="grow">
              <p class="text-4xl font-semibold">Welcome back, {{ $page.props.auth.user.name }}</p>
              <p class="text-2xl text-grey mt-5">{{ `Your subscription ${props.renews ? 'auto-renews' : 'expires'} on ${props.billing_period_ends}` }}</p>
            </div>
            <v-img :src="`/images/${props.subscribed_plan.image}`" width="150" class="shrink-0"
                   style="margin-top: -100px;"
            />
          </div>
          <div v-else class="mt-7 mb-20 pb-5" v-html="props.content.introduction" />

          <v-btn
              v-if="props.is_subscribed"
              @click="createCustomerPortalSession"
              class="rounded-pill mt-7"
              variant="flat" color="red-darken-2" size="large">Manage subscription</v-btn>

          <div
              v-if="props.is_subscribed"
              class="mt-7">
            <p>You have chosen <strong class="uppercase">{{ props.delivery_day }}</strong> as your delivery day.</p>
            <div
                v-if="props.can_update_delivery_day"
                class="mt-2">
              <v-btn
                  @click.prevent="changeDay"
                  variant="text" color="blue">Change day</v-btn>
            </div>
          </div>
        </div>
      </div>


      <div v-if="props.has_valid_postcode">
        <!-- selection -->
        <div v-if="props.is_subscribed">
          <v-card class="brand-bg-grey mt-10" rounded="xl">
            <div>
              <div class="w-full text-center py-10">
                <p class="text-3xl brand" v-if="!props.subscribed_plan.has_customization"><i>Your subscription box</i></p>
                <p class="text-3xl brand" v-else-if="modifyBoxSelection"><i>Modify Box Selection</i></p>
                <p class="text-3xl brand" v-else-if="manageAddOns"><i>Add-On Menu</i></p>
                <p class="text-3xl brand" v-else><i>Your Current Box Selection</i></p>
                <p class="mt-2">Updating for {{ props.next_available_date }} delivery</p>
              </div>
              <div v-if="modifyBoxSelection || (!modifyBoxSelection && !manageAddOns)">
                <div v-for="variation in props.plan_variations">
                  <div v-if="modifyBoxSelection || (!modifyBoxSelection && premium_subscription_item_uids.hasOwnProperty(variation.uid))"
                       class="border-t-2 border-white"
                  >
                    <!-- row -->
                    <div class="flex flex-row items-center justify-between w-full">
                      <div class="flex flex-row items-center gap-3 px-5 py-2 w-full">
                        <div class="shrink-0">
                          <v-checkbox
                              v-if="modifyBoxSelection" hide-details
                              :value="variation.uid"
                              v-model="boxSelectionForm.variations"
                              :disabled="productQuantity >= 9 && !isActive(variation.uid)"
                              @change="handleCheckboxChange(variation.uid)"
                          />
                          <v-icon class="mx-2" v-else-if="premium_subscription_item_uids.hasOwnProperty(variation.uid)">mdi-checkbox-marked</v-icon>
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
                        <div class="grow">
                          <p>
                            {{ variation.product.name }} ({{ variation.name }})
                            <span class="text-grey ms-5" v-if="!modifyBoxSelection && premium_subscription_item_uids.hasOwnProperty(variation.uid)">
                    x{{ premium_subscription_item_uids[variation.uid] }}
                  </span>
                          </p>
                        </div>
                        <div
                            style="width: 200px;"
                            class="shrink-0">
                          <v-number-input
                              v-if="boxSelectionForm.variations.includes(variation.uid)"
                              class="shrink-0"
                              v-model="boxSelectionForm.quantities[variation.uid]"
                              type="number"
                              density="compact"
                              variant="outlined"
                              control-variant="default"
                              :min="1"
                              :max="9 - (productQuantity - boxSelectionForm.quantities[variation.uid])"
                              hide-details
                          />
                        </div>
                      </div>
                    </div>
                    <!-- end row -->
                  </div>
                  <div v-else-if="!modifyBoxSelection && !props.subscribed_plan.has_customization"
                       class="border-t-2 border-white"><!-- row -->
                    <div class="flex flex-row items-center justify-between w-full">
                      <div class="flex flex-row items-center gap-3 px-5 py-2 w-full">
                        <div class="shrink-0">
                          <v-icon class="mx-2">mdi-checkbox-marked</v-icon>
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
                        <div class="grow">
                          <p>
                            {{ variation.product.name }} ({{ variation.name }})
                            <span class="text-grey ms-5" v-if="!modifyBoxSelection && premium_subscription_item_uids.hasOwnProperty(variation.uid)">
                    x{{ premium_subscription_item_uids[variation.uid] }}
                  </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!-- end row -->
                  </div>
                </div>
              </div>
              <div v-else-if="(manageAddOns || (!manageAddOns && !modifyBoxSelection)) && (Object.keys(props.add_on_variations).length > 0)">
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-3 px-3 pb-3">
                  <div v-for="variation in props.add_on_variations">
                    <v-img
                        gradient="to top left, rgba(0,0,0,0), rgba(0,0,0,.3)"
                        aspect-ratio="0.6667" class="shadow-sm rounded-xl" cover :src="variation.image_url" alt="">
                      <div class="p-4 w-full h-full">
                        <div class="relative w-full h-full">
                          <p class="absolute top-0 text-5xl text-white">
                            {{ selectedQuantities[variation.uid] }}
                          </p>
                          <div class="absolute bottom-0 left-0 w-full">
                            <div class="w-full flex flex-row justify-between items-center">
                              <div>
                                <p class="text-lg" v-if="selectedAmountsFormatted[variation.uid] !== undefined">{{ selectedAmountsFormatted[variation.uid] }}</p>
                              </div>
                              <div class="flex flex-row flex-wrap gap-3">
                                <div class="cursor-pointer p-0"
                                     @click.prevent="subQuantity(variation.uid)">
                                  <v-icon size="large">mdi-minus</v-icon>
                                </div>
                                <div class="cursor-pointer p-0"
                                     @click.prevent="addQuantity(variation.uid)">
                                  <v-icon size="large">mdi-plus</v-icon>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-img>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
          <div v-if="props.subscribed_plan.has_customization">
            <div class="max-w-4xl mx-auto mt-5">
              <p class="text-grey text-sm text-center" v-html="props.content.subscribed_instructions" />
            </div>
            <div
                v-if="!modifyBoxSelection && !manageAddOns"
                class="flex flex-row items-center justify-center w-full gap-5 mt-8">
              <div
                  @click.prevent="toggleModifyBoxSelection"
                  class="button brand-bg rounded-pill px-10 py-3">
                Modify Box Selection
              </div>
              <div
                  v-if="(props.add_on_products.length > 0)"
                  @click.prevent="toggleManageAddons"
                  class="button rounded-pill px-10 py-3">
                Add-On Menu
              </div>
            </div>
            <div v-else-if="modifyBoxSelection"
                 class="flex flex-row items-center justify-center w-full gap-5 mt-8">
              <div
                  @click.prevent="saveBoxSelection"
                  v-if="productQuantity === 9"
                  class="button bg-green rounded-pill px-10 py-3">
                Save box selection
              </div>
              <div v-else
                   class="button bg-grey rounded-pill px-10 py-3">
                Save box selection
              </div>
              <div
                  @click.prevent="toggleAllOff"
                  class="button bg-grey rounded-pill px-10 py-3">
                Cancel
              </div>
            </div>
            <div v-else-if="manageAddOns"
                 class="flex flex-row items-center justify-center w-full gap-5 mt-8">
              <div
                  v-if="amountsSum > 0"
                  @click.prevent="checkout"
                  class="button bg-green rounded-pill px-10 py-3">
                Add to next delivery for {{ amountsSumFormatted }}
              </div>
              <div
                  v-else
                  class="button bg-grey rounded-pill px-10 py-3">
                Add to next delivery
              </div>
              <div
                  @click.prevent="toggleAllOff"
                  class="button bg-grey rounded-pill px-10 py-3">
                Cancel
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div :class="plansWrapperClass">
            <div v-for="plan in props.plans" class="w-full mt-6 mb-12">
              <div
                  class="rounded-xl" :style="'background:' + (plan.has_customization ? '#f99c19' : '#eaeaea')">
                <div>
                  <div class="p-4">
                    <div class="block w-full">
                      <v-img :src="`/images/${plan.image}`" width="180" class="mx-auto"
                             style="margin-top: -100px;"
                      />
                    </div>
                    <div class="my-3">
                      <p class="text-3xl brand text-center">{{ plan.french_name }}</p>
                      <p class="text-2xl brand text-center">({{ plan.name }} plan)</p>
                    </div>
                    <div
                        v-if="!props.is_subscribed"
                        class="w-full flex flex-row justify-center">
                      <v-btn
                          :disabled="plan.placeholder_count > 0"
                          :size="mobile ? 'large' : 'default'"
                          @click.prevent="selectPlan(plan)"
                          class="rounded-pill">Start Plan</v-btn>
                    </div>
                    <div
                        v-if="props.is_subscribed && props.subscribed_plan.has_customization"
                        class="flex mt-5 w-full justify-center"
                    >
                      <p>You will be able to edit the item list until the wednesday before each delivery</p>
                    </div>
                  </div>
                  <div class="p-4">
                    <div class="flex flex-col gap-0">
                      <PlanProducts v-if="!plan.has_customization" :plan="plan" />
                      <PlanProducts
                          @open="openProductModal"
                          v-else :items="props.premium_subscription_items" :plan="plan"
                          :selectable="true"
                      />
                      <PlanProducts
                          @open="openProductModal"
                          :plan="plan" :placeholder="true" image_url="/images/products/default.jpg"
                          v-for="placeholder in plan.placeholder_count" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="1 === 4959" class="flex flex-col justify-center items-center text-center w-full h-full bg-grey-lighten-2 rounded-xl py-10">
                <p class="text-xl">Delivery address</p>
                <div class="mt-3">
                  <p class="font-bold">Recipient name</p>
                  <p>{{ props.full_name }}</p>
                </div>
                <div class="mt-3">
                  <p class="font-bold">Address</p>
                  <p>{{ props.address_1 }}</p>
                  <p>{{ props.address_2 }}</p>
                  <p>{{ props.city }} {{ props.post_code }}</p>
                </div>
                <div class="mt-3">
                  <p class="font-bold">Phone number:</p>
                  <p>{{ props.phone }}</p>
                </div>
                <div class="my-5">
                  <v-btn
                      @click.prevent="addressModal.openAddress()"
                  >Edit address</v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end selection -->

        <!-- comparison -->
        <div class="py-10" v-if="!props.is_subscribed">
          <div v-if="props.plans.length === 2">
            <p class="text-5xl text-center brand">
          <span v-for="(plan, index) in props.plans">
            <span :style="`color: ${plan.has_customization ? '#f99c19' : '#000000'}`">{{ plan.name }}</span><span v-if="index === 0">&nbsp;vs&nbsp;</span>
          </span>
            </p>
          </div>
          <div v-else-if="props.plans.length === 1">
            <p class="text-5xl text-center brand" v-html="formatTitle(props.content.box_title)" />
          </div>

          <div class="rounded-5xl overflow-hidden mt-10">
            <div :class="featuresWrapperClass">
              <div>

                <div class="row-light-grey px-7 py-0">
                  <div class="flex items-center" style="height: 120px;">
                    <Logo />
                  </div>
                </div>
                <div class="row-dark-grey px-7 py-3 flex flex-row items-center">
                  Price
                </div>
                <div class="row-light-grey px-7 py-3 flex flex-row items-center">
                  Frequency
                </div>
                <div class="row-dark-grey px-7 py-3 flex flex-row items-center">
                  Delivery
                </div>
                <div class="row-light-grey px-7 py-3 flex flex-row items-center">
                  Custom boxes
                </div>
                <div class="row-dark-grey px-7 py-3 flex flex-row items-center">
                  Customization
                </div>
                <div class="row-light-grey px-7 py-3 flex flex-row items-center">
                  Secret menu (add-ons)
                </div>
                <div class="row-dark-grey px-7 py-3 flex flex-row items-center">
                  Private events
                </div>

              </div>
              <div v-for="(plan, index) in props.plans" class="text-center">

                <div class="row-light-grey relative">
                  <div class="row-dark-grey absolute bottom-0 left-0 z-0 w-full" style="height: 200px;">

                  </div>
                  <div class="relative z-10" :class="plan.has_customization ? 'rounded-5xl overflow-hidden' : ''">
                    <div class="px-5 py-0" :class="`${plan.has_customization ? 'row-light-amber text-white' : 'row-light-grey'}`">
                      <div class="flex justify-center items-center" style="height: 120px;">
                        <p v-if="props.plans.length === 2" class="text-3xl">{{ plan.name }}</p>
                        <p v-else class="text-3xl">Features</p>
                      </div>
                    </div>
                    <div class="px-5 py-3 flex flex-row items-center justify-center" :class="`${plan.has_customization ? 'row-dark-amber text-white' : 'row-dark-grey'}`">
                      Starts at {{ plan.price_monthly_string }}/month
                    </div>
                    <div class="px-5 py-3 flex flex-row items-center justify-center" :class="`${plan.has_customization ? 'row-light-amber text-white' : 'row-light-grey'}`">
                      monthly/bi-weekly/weekly
                    </div>
                    <div class="px-5 py-3 flex flex-row items-center justify-center" :class="`${plan.has_customization ? 'row-dark-amber text-white' : 'row-dark-grey'}`">
                      <v-icon :color="plan.has_customization ? 'white' : '#f99c19'" v-if="plan.has_delivery">mdi-check-circle</v-icon>
                      <v-icon color="grey" v-else>mdi-close</v-icon>
                    </div>
                    <div class="px-5 py-3 flex flex-row items-center justify-center" :class="`${plan.has_customization ? 'row-light-amber text-white' : 'row-light-grey'}`">
                      <v-icon :color="plan.has_customization ? 'white' : '#f99c19'" v-if="plan.has_custom_boxes">mdi-check-circle</v-icon>
                      <v-icon color="grey" v-else>mdi-close</v-icon>
                    </div>
                    <div class="px-5 py-3 flex flex-row items-center justify-center" :class="`${plan.has_customization ? 'row-dark-amber text-white' : 'row-dark-grey'}`">
                      <v-icon :color="plan.has_customization ? 'white' : '#f99c19'" v-if="plan.has_customization">mdi-check-circle</v-icon>
                      <v-icon color="grey" v-else>mdi-close</v-icon>
                    </div>
                    <div class="px-5 py-3 flex flex-row items-center justify-center" :class="`${plan.has_customization ? 'row-light-amber text-white' : 'row-light-grey'}`">
                      <v-icon :color="plan.has_customization ? 'white' : '#f99c19'" v-if="plan.has_add_ons">mdi-check-circle</v-icon>
                      <v-icon color="grey" v-else>mdi-close</v-icon>
                    </div>
                    <div class="px-5 py-3 flex flex-row items-center justify-center" :class="`${plan.has_customization ? 'row-dark-amber text-white' : 'row-dark-grey'}`">
                      <v-icon :color="plan.has_customization ? 'white' : '#f99c19'" v-if="plan.has_private_events">mdi-check-circle</v-icon>
                      <v-icon color="grey" v-else>mdi-close</v-icon>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="mt-15" v-if="!props.is_subscribed">
          <div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <template v-for="i in 3">
                <div class="row-light-grey p-7 rounded-5xl animate-item">
                  <v-icon style="font-size: 50px;" class="brand-color">{{ props.content[`feature_${i}_icon`] }}</v-icon>
                  <p class="text-3xl mt-7">{{ props.content[`feature_${i}_title`] }}</p>
                  <p class="mt-3 text-grey-darken-1" v-html="formatEmphasis(props.content[`feature_${i}_content`])" />
                </div>
              </template>
            </div>
          </div>
        </div>


        <!-- end comparison -->
      </div>


    </Wrapper>
  </WrapperFull>


  <DialogModal
      :show="showPlanModal && !props.is_subscribed"
      @close="resetPlan"
  >
    <template #title>
      {{ modalTitle }}
    </template>
    <template #content>
      <div v-if="selectedPlan && !props.is_subscribed">
        <PlanProducts v-if="!selectedPlan.has_customization" :plan="selectedPlan" />
        <PlanProducts
            @open="openProductModal"
            v-else :items="props.premium_subscription_items" :plan="selectedPlan" />
        <div
            v-if="selectedPlan.has_customization"
            class="flex mt-3 w-full justify-center"
        >
          <p>You will be able to edit the item list until the wednesday before each delivery</p>
        </div>
        <div class="my-5 text-center">
          <v-card color="grey-lighten-2" elevation="2">
            <v-card-item>
              <p class="text-xl mb-3">You want a delivery:</p>
              <div class="flex flex-row justify-center">
                <v-btn-toggle
                    v-model="subscribeForm.frequency"
                    divided
                    variant="flat"
                    color="amber-darken-2"
                >
                  <v-btn value="monthly">
                    Once per month <br>
                    {{ selectedPlan.price_monthly_formatted }}/delivery
                  </v-btn>
                  <v-btn value="biweekly">
                    Twice per month <br>
                    {{ selectedPlan.price_biweekly_formatted }}/delivery
                  </v-btn>
                  <v-btn value="weekly">
                    Once per week <br>
                    {{ selectedPlan.price_weekly_formatted }}/delivery
                  </v-btn>
                </v-btn-toggle>
              </div>
              <div class="mt-3">
                <p v-if="errors.frequency" class="text-red-500 font-bold">{{ errors.frequency[0] }}</p>
                <p v-else>Select one of the three options</p>
              </div>
              <div v-if="props.extra_delivery_fee.value" class="mt-5 text-amber-darken-4">
                <p>Your post code ({{ props.post_code }}) is an area that is further than our standard delivery route, and requires an additional fee of {{ props.extra_delivery_fee.formatted }} for each delivery.</p>
              </div>
            </v-card-item>
          </v-card>
        </div>
        <div class="my-5 text-center">
          <v-card color="grey-lighten-2" elevation="2">
            <v-card-item>
              <p class="text-xl mb-3">Choose a week day:</p>
              <div class="flex flex-row justify-center">
                <v-btn-toggle
                    v-model="subscribeForm.delivery_day"
                    divided
                    variant="flat"
                    color="amber-darken-2"
                >
                  <v-btn value="friday">
                    Friday <br>
                  </v-btn>
                  <v-btn value="saturday">
                    Saturday <br>
                  </v-btn>
                </v-btn-toggle>
              </div>
              <div class="mt-3">
                <p v-if="errors.delivery_day" class="text-red-500 font-bold">{{ errors.delivery_day[0] }}</p>
                <p v-else>Select one of the two options</p>
              </div>
            </v-card-item>
          </v-card>
        </div>

        <v-card color="grey-lighten-2" elevation="2" class="mb-5">
          <v-card-item>
            <div class="text-center">
              <p class="text-xl mb-3">Delivery information:</p>
            </div>
            <div class="mb-3">
              <p class="uppercase">full name</p>
              <v-text-field v-model="subscribeForm.full_name" :error-messages="errors.full_name" />
            </div>
            <div class="mb-3">
              <p class="uppercase">address 1</p>
              <v-text-field v-model="subscribeForm.address_1" :error-messages="errors.address_1" />
            </div>
            <div class="mb-3">
              <p class="uppercase">address 2 (optional)</p>
              <v-text-field v-model="subscribeForm.address_2" :error-messages="errors.address_2" />
            </div>
            <div class="mb-3">
              <p class="uppercase">post code</p>
              <v-text-field v-model="subscribeForm.post_code" :error-messages="errors.post_code" />
            </div>
            <div class="mb-3">
              <p class="uppercase">city</p>
              <v-text-field v-model="subscribeForm.city" :error-messages="errors.city" />
            </div>
            <div class="mb-3">
              <p class="uppercase">phone number</p>
              <v-text-field v-model="subscribeForm.phone" :error-messages="errors.phone" />
            </div>
          </v-card-item>
        </v-card>

      </div>

    </template>
    <template #footer>
      <PrimaryButton
          @click="subscribe"
          class="me-3"
      >Subscribe</PrimaryButton>
      <SecondaryButton
          @click="resetPlan"
      >Cancel</SecondaryButton>
    </template>
  </DialogModal>
  <CustomPlanProductModal ref="customPlanProductModal" :products="props.customization_products" />
  <AddressModal ref="addressModal" :errors="props.errors" />
  <DeliveryDayModal ref="deliveryDayModal" :errors="props.errors" />

</template>

<style scoped>
.row-light-grey {
  background: #f7f7f7;
}
.row-dark-grey {
  background: #ededed;
}
.row-light-amber {
  background: #f99c19;
}
.row-dark-amber {
  background: #e58804;
}

</style>
