<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head} from "@inertiajs/vue3";
import {ref} from "vue";
import SubscriptionPlanModal from "@/Components/SubscriptionPlanModal.vue";

const props = defineProps({
  plans: Object,
  products: Object,
  errors: Object,
});

const planModal = ref(null);

</script>

<template>
  <AdmLayout title="Subscription plans">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div v-for="plan in props.plans">
        <v-card>
          <v-card-item>
            <div class="flex flex-row items-center justify-between">
              <div class="flex flex-row items-center gap-3">
                <p class="text-xl">Plan: <strong>{{ plan.name }}</strong></p>
                <v-btn
                    :color="plan.active ? 'green' : 'red'"
                    :prepend-icon="plan.active ? 'mdi-eye' : 'mdi-eye-off'"
                    size="small" variant="outlined">{{ plan.active ? 'Active' : 'Disabled' }}</v-btn>
              </div>
              <div>
                <v-btn
                    @click.prevent="planModal.openPlan(plan)"
                    size="small">Edit plan</v-btn>
              </div>
            </div>
            <div class="my-2"><hr></div>
            <div>
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div>
                  <p>Once per week</p>
                  <p class="text-lg font-bold">{{ plan.price_weekly_string }}</p>
                </div>
                <div>
                  <p>Twice per month</p>
                  <p class="text-lg font-bold">{{ plan.price_biweekly_string }}</p>
                </div>
                <div>
                  <p>Once per month</p>
                  <p class="text-lg font-bold">{{ plan.price_monthly_string }}</p>
                </div>
              </div>
            </div>
            <div class="my-2"><hr></div>
            <div>
              <div class="flex flex-col gap-2">
                <div v-for="variation in plan.variations">
                  <v-card color="grey-lighten-2">
                    <div class="flex flex-row items-center">
                      <div style="width: 50px;" class="shrink-0">
                        <v-img aspect-ratio="0.6667" :src="variation.product.image_url" width="50px" />
                      </div>
                      <div class="p-3 flex-1 min-w-0">
                        <div class="flex flex-row items-center gap-2 w-full">
                          <p class="font-bold">{{ variation.product.name }} ({{ variation.name }})</p>
                          <p v-if="!plan.has_customization">x {{ variation.pivot.quantity }}</p>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
            </div>
          </v-card-item>
        </v-card>
      </div>
    </div>

    <SubscriptionPlanModal ref="planModal" :products="props.products" :errors="props.errors" />

  </AdmLayout>
</template>
