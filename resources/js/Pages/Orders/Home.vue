<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head} from "@inertiajs/vue3";
import Wrapper from "@/Components/Wrapper.vue";
import Pagination from "@/Components/Pagination.vue";

const props = defineProps({
  user: Object,
  orders: Object,
});

defineOptions({ layout: AppLayout });

const orderAmount = (amount) => {
  return (amount / 100).toFixed(2);
};

const convertDate = (isoString) => {
  const date = new Date(isoString);

// Extract parts of the date
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

// Format the date and time
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

</script>

<template>

  <Head title="Orders"></Head>

  <Wrapper style="margin-top: 150px;">
    <div class="flex justify-center">
      <div class="text-center">
        <h1 class="text-6xl brand uppercase">Orders</h1>
      </div>
    </div>
  </Wrapper>

  <Wrapper wrapper="row">
    <div v-for="order in props.orders.data" class="mb-6">
      <v-card
          @click.prevent="$inertia.visit(route('order',{order: order.uid}))"
          rounded="xl"
          :color="`${order.status === 'initial' ? 'amber-lighten-2' : 'grey-lighten-4'}`"
      >
        <v-card-item>
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-3">
            <div><p>No: <span class="font-bold uppercase">{{ order.initial }}{{ order.number }}</span></p></div>
            <div><p class="font-bold">{{ order.created_at_formatted }}</p></div>
            <div><p class="font-bold">${{ order.amount }}</p></div>
            <div>
              <p>Status: <strong>{{ order.status }}</strong></p>
            </div>
            <div>
              <p>Type: <strong>{{ order.type }}</strong></p>
            </div>
          </div>
          <div class="flex flex-row justify-between">


          </div>

          <div class="flex flex-col gap-3 mt-3">
            <v-card :color="`${order.status === 'initial' ? 'amber-lighten-4' : 'grey-lighten-2'}`"
                    v-for="item in order.items" rounded="lg">
              <v-card-item>
                <div class="flex gap-3 p-1">
                  <div class="shrink-0" style="min-width: 50px;">
                    <v-img aspect-ratio="1" cover :src="item.thumbnail" class="border" rounded="lg" />
                  </div>
                  <div class="grow">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                      <div>
                        <p class="font-bold">{{ item.product_name }}</p>
                        <p>{{ item.variation_name }}</p>
                      </div>
                      <div>
                        <p>Quantity: {{ item.quantity }}</p>
                      </div>
                      <div>
                        <p>Unit: ${{ item.amount }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card-item>
            </v-card>
          </div>
        </v-card-item>
      </v-card>
    </div>

    <div>
      <Pagination :entities="props.orders" />
    </div>
  </Wrapper>

</template>
