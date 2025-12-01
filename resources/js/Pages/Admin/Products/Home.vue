<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import {computed, nextTick, onMounted, reactive, ref} from "vue";

const props = defineProps({
  refresh: Object,
  products: Object,
  plans: Object,
  active_plans: Object,
});

const form = reactive({
  active_plans: [],
  in_sneak_peek_menu: [],
  in_catering_menu: [],
  in_add_ons_menu: [],
  in_subscriptions: [],
});

const hasChanged = ref(false);

const updatePlanProducts = () => {
  nextTick(() => {
    Object.keys(form.in_subscriptions).forEach(planUid => {
      if (!form.active_plans.includes(planUid)) {
        delete form.in_subscriptions[planUid];
      }
    });

    const newSubscriptions = form.active_plans.reduce((acc, planUid) => {
      // If the plan is re-enabled, use the products from props.active_plans
      const plan = props.active_plans.find(plan => plan.uid === planUid);
      if (plan) {
        acc[planUid] = plan.products.map(product => product.uid);
      } else {
        // Otherwise, use the existing or empty array
        acc[planUid] = form.in_subscriptions[planUid] || [];
      }
      return acc;
    }, {});

    form.in_subscriptions = { ...newSubscriptions };
  });
};

const updatedPlanSelection = () => {
  updatePlanProducts();
  hasChanged.value = true;
};

const updatedProductSelection = () => {
  hasChanged.value = true;
};

const importStatus = ref('default');

const importButtonColor = computed(() => {
  if(importStatus.value === 'saving') return 'grey';
  if(importStatus.value === 'saved') return 'green';
  if(importStatus.value === 'error') return 'red';
  return 'black';
});

const importButtonText = computed(() => {
  if(importStatus.value === 'saving') return 'Refreshing...';
  if(importStatus.value === 'saved') return 'The list of products was successfully refreshed';
  if(importStatus.value === 'error') return 'An error occurred';
  return 'Refresh product list from Square';
});

const refreshProducts = () => {
  if(importStatus.value === 'default') {
    importStatus.value = 'saving';
    router.post(route('admin.refresh_products'), {}, {
      preserveScroll: true,
      preserveState: true,
      only: [''],
      onSuccess: (page) => {
        console.log('success');
        importStatus.value = 'saved';
        setTimeout(() => {
          importStatus.value = 'default';
        }, 2000);
      },
      onError: (error) => {
        importStatus.value = 'error';
        setTimeout(() => {
          importStatus.value = 'default';
        }, 5000);
        console.log(error);
      }
    });
  }
};

const saveSelectionStatus = ref('default');

const saveSelectionBgColor = computed(() => {
  if(saveSelectionStatus.value === 'saving') return 'grey';
  if(saveSelectionStatus.value === 'saved') return 'green';
  if(hasChanged.value) {
    return 'yellow';
  }
  return 'black';
});

const saveSelectionTextColor = computed(() => {
  if(saveSelectionStatus.value === 'saving') return 'black';
  if(saveSelectionStatus.value === 'saved') return 'white';
  if(hasChanged.value) {
    return 'black';
  }
  return 'white';
});

const saveSelection = () => {
  if(saveSelectionStatus.value === 'default') {
    saveSelectionStatus.value = 'saving';
    router.post(route('admin.save_product_selection'), form, {
      preserveScroll: true,
      preserveState: true,
      only: [''],
      onSuccess: (page) => {
        console.log('success');
        saveSelectionStatus.value = 'saved';
        setTimeout(() => {
          saveSelectionStatus.value = 'default';
          hasChanged.value = false;
        }, 2000);
      },
      onError: (error) => {
        saveSelectionStatus.value = 'error';
        setTimeout(() => {
          saveSelectionStatus.value = 'default';
        }, 5000);
        console.log(error);
      }
    });
  }
};

const initSelection = () => {
  const activePlansArray = Object.values(props.active_plans);
  form.active_plans = activePlansArray.map(plan => plan.uid);

  form.in_sneak_peek_menu = props.products
      .filter(product => product.in_sneak_peek_menu)
      .map(product => product.uid);

  form.in_catering_menu = props.products
      .filter(product => product.in_catering_menu)
      .map(product => product.uid);

  form.in_add_ons_menu = props.products
      .filter(product => product.in_add_ons_menu)
      .map(product => product.uid);

  updatePlanProducts();

};

const getPlanName = (uid) => {
  const plan = props.plans.find(plan => plan.uid === uid);
  return plan ? plan.name : '';
};

const showPlansGuide = ref(false);

onMounted(() => {
  nextTick(() => {
    const activePlansArray = Object.values(props.active_plans);
    form.active_plans = activePlansArray.map(plan => plan.uid);

    form.in_sneak_peek_menu = props.products
        .filter(product => product.in_sneak_peek_menu)
        .map(product => product.uid);

    form.in_catering_menu = props.products
        .filter(product => product.in_catering_menu)
        .map(product => product.uid);

    form.in_add_ons_menu = props.products
        .filter(product => product.in_add_ons_menu)
        .map(product => product.uid);

    form.in_subscriptions = activePlansArray.reduce((acc, plan) => {
      acc[plan.uid] = plan.products.map(product => product.uid);
      return acc;
    }, {});
  });
})

</script>

<template>
  <AdmLayout title="Products">

    <div class="product-column">
      <div class="mt-5 flex justify-between">
        <v-btn :color="importButtonColor" @click.prevent="refreshProducts">{{ importButtonText }}</v-btn>
        <p>Last refreshed: <strong>{{ refresh.formatted }}</strong></p>
      </div>

      <div class="mt-4">
        <v-card color="blue-grey">
          <v-card-item>
            <p>Subscription plans: {{ props.plans.length }}</p>
          </v-card-item>
        </v-card>
      </div>

      <div class="mt-4" v-for="plan in props.plans">
        <v-card elevation="3">
          <v-card-item>
            <div class="flex flex-row flex-wrap gap-3">
              <div>
                <div>
                  <p class="text-lg font-bold">{{ plan.name }}</p>
                  <div>
                    <v-chip variant="outlined" color="black" size="small" class="me-2 uppercase">
                      monthly&nbsp;<strong>${{ plan.price_monthly_string }}</strong>
                    </v-chip>
                    <v-chip variant="outlined" color="black" size="small" class="me-2 uppercase">
                      biweekly&nbsp;<strong>${{ plan.price_biweekly_string }}</strong>
                    </v-chip>
                    <v-chip variant="outlined" color="black" size="small" class="me-2 uppercase">
                      weekly&nbsp;<strong>${{ plan.price_weekly_string }}</strong>
                    </v-chip>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-6 border mt-3 px-3 rounded-md bg-grey-lighten-3">
              <v-checkbox @update:modelValue="updatedPlanSelection" inline label="Is active" :value="plan.uid" v-model="form.active_plans" hide-details />
            </div>
          </v-card-item>
        </v-card>
      </div>

      <div class="mt-4">
        <v-card color="blue-grey">
          <v-card-item>
            <p>Products: {{ props.products.length }}</p>
          </v-card-item>
        </v-card>
      </div>

      <div class="mt-4" v-for="product in props.products">
        <v-card elevation="3">
          <v-card-item>
            <div class="flex flex-row flex-wrap gap-3">
              <div class="shrink-0">
                <v-img v-if="product.has_image" width="100px" :src="product.image_url"></v-img>
              </div>
              <div class="grow">
                <div>
                  <v-chip size="x-small" class="text-xs">{{ 'ABC' }}</v-chip>
                  <p class="text-lg font-bold">{{ product.name }}</p>
                  <p class="text-sm">{{ product.description }}</p>
                  <div class="flex flex-row flex-wrap gap-2">
                    <div v-if="product.variations.length" class="flex gap-2">
                      <v-chip variant="outlined" color="black" size="small" v-for="variation in product.variations">
                        {{ variation.name }}&nbsp;<strong>${{ variation.price_formatted }}</strong>
                      </v-chip>
                    </div>
                    <div v-if="product.categories.length" class="flex gap-2">
                        <v-chip variant="tonal" color="black" size="small" v-for="category in product.categories">{{ category.name }}</v-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-6 border mt-3 px-3 rounded-md bg-grey-lighten-3" v-if="product.has_checkboxes">
              <v-checkbox @update:modelValue="updatedProductSelection" :value="product.uid" v-model="form.in_sneak_peek_menu" inline label="In sneak peek menu" hide-details />

              <v-checkbox @update:modelValue="updatedProductSelection" :value="product.uid" v-model="form.in_catering_menu" inline label="In catering menu" hide-details />

              <div class="flex gap-3" v-if="form.active_plans.length">
                <div v-for="planUid in form.active_plans" :key="planUid" class="inline-flex">
                  <v-checkbox @update:modelValue="updatedProductSelection"
                      v-model="form.in_subscriptions[planUid]"
                      :value="product.uid"
                      inline
                      :label="`In '${getPlanName(planUid)}' plan`"
                      hide-details
                  />
                </div>
              </div>

              <v-checkbox @update:modelValue="updatedProductSelection" :value="product.uid" v-model="form.in_add_ons_menu" inline label="In add-ons menu" hide-details />
            </div>
          </v-card-item>
        </v-card>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 w-full text-center items center bottom-bar">
      <v-card :color="saveSelectionBgColor" class="h-full">
        <v-card-item class="h-full">
          <v-btn @click.prevent="saveSelection" variant="text"  :color="saveSelectionTextColor">Save plans and product selection</v-btn>
        </v-card-item>
      </v-card>
    </div>

  </AdmLayout>
</template>

<style scoped>
  .bottom-bar {
    height: 50px;
  }
  .product-column {
    padding-bottom: 50px;
  }
</style>
