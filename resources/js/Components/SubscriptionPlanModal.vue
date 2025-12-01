<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {computed, reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  products: Object,
  errors: Object,
});

// plan
const showPlanModal = ref(false);
const selectedPlan = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const form = reactive({
  name: null,
  price_weekly: null,
  price_biweekly: null,
  price_monthly: null,
  variations: [],
  quantities: {},
});
const openPlan = (plan = null) => {
  local_errors.value = {};
  if(plan) {
    modalTitle.value = 'Edit subscription plan';
    selectedPlan.value = plan;
    form.name = plan.name;
    form.price_weekly = plan.price_weekly;
    form.price_biweekly = plan.price_biweekly;
    form.price_monthly = plan.price_monthly;
    form.variations = plan.variation_uids;
    form.quantities = plan.quantities;
    form.active = plan.active === 1;
  } else {
    modalTitle.value = 'Create subscription plan';
    selectedPlan.value = null;
    form.name = null;
    form.price_weekly = null;
    form.price_biweekly = null;
    form.price_monthly = null;
    form.variations = [];
    form.quantities = {};
    form.active = true;
  }
  saveButtonText.value = 'Save plan';
  showPlanModal.value = true;
};

const handleCheckboxChange = (uid) => {
  if(selectedPlan.value && !selectedPlan.value.has_customization) {
    if (form.variations.includes(uid)) {
      if (!form.quantities[uid]) {
        form.quantities = { ...form.quantities, [uid]: 1 };
      }
    } else {
      delete form.quantities[uid];
    }
  }
};

const productQuantity = computed(() => {
  if(selectedPlan.value) {
    if(selectedPlan.value.has_customization) {
      return form.variations.length;
    } else {
      return Object.values(form.quantities).reduce((sum, quantity) => sum + quantity, 0);
    }
  } else {
    return 0;
  }
});

const isActive = (uid) => {
  return form.variations.includes(uid);
  // return Object.prototype.hasOwnProperty.call(form.quantities, uid);
};

const local_errors = ref({});

const closePlan = () => {
  showPlanModal.value = false;
  selectedPlan.value = null;
};

const savePlan = () => {
  let url;
  if(selectedPlan.value) {
    url = route('admin.update_plan',{plan: selectedPlan.value.uid})
  } else {
    return;
  }
  router.post(url, form, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      closePlan();
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};
//end plan

defineExpose({ openPlan })

</script>

<template>

    <DialogModal
      :show="showPlanModal"
      @close="closePlan"
    >
      <template #title>
        {{ modalTitle }}
      </template>
      <template #content>

        <div>
          <v-label class="uppercase">Name</v-label>
          <v-text-field v-model="form.name"
                        :error-messages="local_errors.name"
                        disabled
          />
        </div>

        <div v-if="selectedPlan && !selectedPlan.has_customization" class="mb-5 flex flex-row justify-center">
          <v-checkbox label="is active" v-model="form.active"
            :error-messages="local_errors.active"
          />
        </div>

        <div>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div>
              <v-label class="uppercase">Once per week</v-label>
              <v-text-field prepend-inner-icon="mdi-currency-usd" v-model="form.price_weekly"
                            :error-messages="local_errors.price_weekly"
              />
            </div>

            <div>
              <v-label class="uppercase">Twice per month</v-label>
              <v-text-field prepend-inner-icon="mdi-currency-usd" v-model="form.price_biweekly"
                            :error-messages="local_errors.price_biweekly"
              />
            </div>

            <div>
              <v-label class="uppercase">Once per month</v-label>
              <v-text-field prepend-inner-icon="mdi-currency-usd" v-model="form.price_monthly"
                            :error-messages="local_errors.price_monthly"
              />
            </div>
          </div>
        </div>

        <div>
          <div
              v-if="Object.keys(props.products).length"
              class="flex flex-col gap-3">
            <p class="text-lg">Select one or more products</p>
            <p v-if="local_errors.products" class="text-red">{{ local_errors.products }}</p>

            <v-card
                v-for="(product, name) in props.products"
                :key="name"
                color="black"
                variant="tonal"
                density="compact"
            >
              <div class="px-2 py-2">
                <p class="text-lg">{{ name }}</p>

                <div v-for="variation in product" :key="variation.uid">
                  <div class="flex flex-row items-center gap-10 w-full my-2">
                    <div class="grow">
                      <!-- 111111 -->
                      <v-checkbox
                          class="grow"
                          :label="variation.name"
                          :value="variation.uid"
                          v-model="form.variations"
                          density="compact"
                          multiple
                          hide-details
                          :disabled="selectedPlan && (selectedPlan.has_customization ? false : (productQuantity >= 9 && !isActive(variation.uid))  )"
                          @change="handleCheckboxChange(variation.uid)"
                      />
                    </div>
                    <div
                        style="width: 200px;"
                        class="shrink-0">
                      <v-number-input
                          v-if="form.variations.includes(variation.uid) && selectedPlan && !selectedPlan.has_customization"
                          class="shrink-0"
                          v-model="form.quantities[variation.uid]"
                          type="number"
                          density="compact"
                          variant="outlined"
                          control-variant="stacked"
                          :min="1"
                          :max="9 - (productQuantity - form.quantities[variation.uid])"
                          hide-details
                      />
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </div>
          <div v-else>
            <p class="text-red">You haven't created any products yet</p>
          </div>
        </div>

      </template>
      <template #footer>
        <Row>
          <v-btn
              variant="flat" color="#000"
              @click="savePlan"
          >{{ saveButtonText }} {{ `(${productQuantity} product${productQuantity === 1 ? '' : 's'})` }}</v-btn>
          <v-btn
              variant="tonal" color="#000"
              @click="closePlan"
          >Cancel</v-btn>
        </Row>
      </template>
    </DialogModal>

</template>
