<script setup>
import TeamLayout from '@/Layouts/TeamLayout.vue';
import {Head} from "@inertiajs/vue3";
import Pagination from "@/Components/Pagination.vue";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  orders: Object,
  paid_count: Number,
  ready_count: Number,
  completed_count: Number,
  canceled_count: Number,
  errors: Object,
});

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {reactive, ref} from "vue";
import {router, usePage} from "@inertiajs/vue3";
import Grid from "@/Components/Grid.vue";
// order
const showOrderModal = ref(false);
const selectedOrder = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const canOpen = ref(true);
const openOrder = (order = null) => {
  if(order && canOpen.value) {
    modalTitle.value = 'View order';
    selectedOrder.value = order;
    currentStatus.value = order.status
  } else {
    return 0;
  }
  canOpen.value = false;
  saveButtonText.value = 'Update order';
  editOrderNotes.value = false;
  showOrderModal.value = true;
};

const closeOrder = () => {
  showOrderModal.value = false;
  setTimeout(() => {
    selectedOrder.value = null;
    canOpen.value = true;
  }, 500);
};

const updateOrder = () => {
  let url;
  if(selectedOrder.value) {
    url = route('team.update_order_status',{order: selectedOrder.value.uid})
  } else {
    return 0;
  }
  router.post(url, {
    status: currentStatus.value,
  }, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      closeOrder();
    },
    onError: (error) => {
      console.log(error);
    }
  });
};
//end order

const statuses = ref(['paid', 'ready', 'completed']);
const currentStatus = ref(null);

// notes
const editOrderNotes = ref(false);

const orderNotes = ref('');

const toggleEditOrderNotes = () => {
  orderNotes.value = selectedOrder.value.notes;
  editOrderNotes.value = !editOrderNotes.value;
};

const local_errors = ref({});

const updateOrderNotes = () => {
  local_errors.value = {};
  router.post(route('admin.update_order_notes', {order: selectedOrder.value.uid}), {
    notes: orderNotes.value,
  }, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      console.log(props.orders);
      selectedOrder.value = props.orders.data.find(o => o.uid === selectedOrder.value.uid)
      editOrderNotes.value = false;
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};
// end notes

// Export orders
const page = usePage();
const getCurrentStatus = () => {
  // Try to get status from orders data first
  if (props.orders && props.orders.data && props.orders.data.length > 0) {
    return props.orders.data[0].status;
  }
  // Fallback to URL detection
  const url = page.url;
  if (url.includes('orders_ready')) return 'ready';
  if (url.includes('orders_completed')) return 'completed';
  if (url.includes('orders_canceled')) return 'canceled';
  return 'paid'; // default to paid
};

const exportOrders = () => {
  const status = getCurrentStatus();
  const url = route('team.orders_export', { status });
  window.location.href = url;
};

</script>

<template>
  <TeamLayout title="Orders">

    <div class="flex flex-row flex-wrap gap-3 mb-5">
      <v-btn @click.prevent="$inertia.visit(route('team.orders'))">
        Paid orders {{ `(${props.paid_count})` }}
      </v-btn>
      <v-btn @click.prevent="$inertia.visit(route('team.orders_ready'))">
        Ready orders {{ `(${props.ready_count})` }}
      </v-btn>
      <v-btn @click.prevent="$inertia.visit(route('team.orders_completed'))">
        Completed orders {{ `(${props.completed_count})` }}
      </v-btn>
      <v-btn @click.prevent="$inertia.visit(route('team.orders_canceled'))">
        Canceled orders {{ `(${props.canceled_count})` }}
      </v-btn>
      <v-btn
          @click.prevent="exportOrders"
          variant="tonal" 
          color="success"
          prepend-icon="mdi-file-excel">Export to Excel</v-btn>
    </div>

    <div v-if="props.orders.data.length > 0" class="flex flex-col gap-7 md:gap-3 text-sm">
      <v-card v-for="order in props.orders.data">
        <v-card-item>
          <Grid cols="2" md="2" lg="5" xl="5" 2xl="5" gap="2">
            <div class="flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1">
              <div><strong>{{ order.initial }}{{ order.number }}&nbsp;</strong><span class="text-blue">({{order.type}})</span></div>
              <p>
                <span>{{ order.full_name??'No name' }}</span>
                <span v-if="order.user_id">&nbsp;({{ order.user.name }})</span>
                <span v-else>&nbsp;(guest)</span>
              </p>
              <div class="flex flex-row flex-wrap items-center gap-0">
                <p>{{ order.email??'no email' }}</p>
                <v-icon v-if="order.phone">mdi-circle-small</v-icon>
                <p v-if="order.phone">{{ order.phone }}</p>
              </div>
            </div>
            <div class="flex flex-col justify-center bg-grey-lighten-3 p-2">
              <p class="font-bold">Amount</p>
              ${{ order.amount }}
            </div>
            <div class="flex flex-col justify-center bg-grey-lighten-3 p-2">
              <Row :center="true" justify="start">
                <p class="font-bold">{{ order.type === 'catering' ? 'Pickup' : 'Delivery' }}</p>
                <template v-if="order.notes">
                  <v-icon>mdi-pencil-circle</v-icon>
                </template>
              </Row>
              {{ order.datetime_formatted }}
            </div>
            <div class="flex flex-col justify-center bg-grey-lighten-3 p-2">
              <p class="font-bold">Items</p>
              <div>
                <v-btn
                    @click.prevent="openOrder(order)"
                    size="small">{{ order.total_quantity }}</v-btn>
              </div>
            </div>
            <div class="uppercase flex flex-col justify-center bg-grey-lighten-3 p-2">
              <p class="font-bold">Status</p>
              {{ order.status }}
              <template v-if="order.source === 'custom'">
                (custom)
              </template>
            </div>
          </Grid>
        </v-card-item>
      </v-card>

      <div>
        <Pagination :entities="props.orders" />
      </div>
    </div>
    <div v-else>
      <p>There are no orders to show here at the moment.</p>
    </div>

    <DialogModal
        :show="showOrderModal"
        @close="closeOrder"
        maxWidth="6xl"
    >
      <template #title>
        {{ modalTitle }}
      </template>
      <template #content>
        <div class="flex flex-col gap-3" v-if="selectedOrder">
          <v-card>
            <div class="mb-5">

              <p class="text-2xl font-bold mb-2">Order summary</p>
              <v-card>
                <div>
                  <Grid cols="2" md="2" lg="5" xl="5" 2xl="5" gap="2">
                    <div class="flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1">
                      <div><strong>{{ selectedOrder.initial }}{{ selectedOrder.number }}&nbsp;</strong><span class="text-blue">({{selectedOrder.type}})</span></div>
                      <p>
                        <span>{{ selectedOrder.full_name??'No name' }}</span>
                        <span v-if="selectedOrder.user_id">&nbsp;({{ selectedOrder.user.name }})</span>
                        <span v-else>&nbsp;(guest)</span>
                      </p>
                      <div>
                        <p>{{ selectedOrder.email??'no email' }}</p>
                        <p v-if="selectedOrder.phone">{{ selectedOrder.phone }}</p>
                      </div>
                    </div>
                    <div class="flex flex-col justify-center bg-grey-lighten-3 p-2">
                      <p class="font-bold">Amount</p>
                      ${{ selectedOrder.amount }}
                    </div>
                    <div class="flex flex-col justify-center bg-grey-lighten-3 p-2">
                      <p class="font-bold">{{ selectedOrder.type === 'catering' ? 'Pickup' : 'Delivery' }}</p>
                      {{ selectedOrder.datetime_formatted }}
                    </div>
                    <div class="flex flex-col justify-center bg-grey-lighten-3 p-2">
                      <p class="font-bold">Items</p>
                      <div>
                        <v-btn
                            size="small" color="grey-darken-2">{{ selectedOrder.total_quantity }}</v-btn>
                      </div>
                    </div>
                    <div class="flex flex-col justify-center uppercase bg-grey-lighten-3 p-2">
                      <p class="font-bold">Status</p>
                      {{ selectedOrder.status }}
                      <template v-if="selectedOrder.source === 'custom'">
                        (custom)
                      </template>
                    </div>
                  </Grid>
                </div>
              </v-card>

            </div>

            <!-- notes -->
            <div class="mb-5">
              <p class="text-2xl font-bold mb-2">Order notes</p>
              <v-card color="grey-lighten-3" rounded="lg">
                <div class="p-4">
                  <template v-model="orderNotes" v-if="editOrderNotes">
                    <div class="mb-4">
                      <v-textarea v-model="orderNotes" rows="3" auto-grow hide-details />
                    </div>
                  </template>
                  <template v-else-if="selectedOrder.notes">
                    <p v-html="selectedOrder.notes_formatted" />
                  </template>
                  <div class="mt-2">
                    <Row :center="true" justify="start">
                      <div v-if="editOrderNotes">
                        <v-btn size="small"
                               @click.prevent="updateOrderNotes"
                        >Save</v-btn>
                      </div>
                      <div>
                        <v-btn size="small"
                               variant="outlined" @click.prevent="toggleEditOrderNotes"
                        >{{ editOrderNotes ? 'Cancel' : 'Edit notes' }}</v-btn>
                      </div>
                    </Row>
                  </div>
                </div>
              </v-card>
            </div>
            <!-- end notes -->


            <p class="text-2xl font-bold mb-2">Order items</p>
            <div>
              <Col gap="4">
                <template v-for="item in selectedOrder.items">
                  <div class="bg-grey-lighten-2 p-3">
                    <div class="flex lg:flex-row items-center justify-start gap-3 w-full">
                      <div class="hidden lg:flex shrink-0 w-[70px]"><v-img aspect-ratio="1" :src="item.thumbnail" cover /></div>
                      <div class="grow">
                        <Grid cols="1" md="5" lg="5" xl="5" 2xl="5" gap="1">
                          <div class="uppercase font-bold">{{ item.product_name }}</div>
                          <div class="uppercase">{{ item.variation_name }}</div>
                          <div class="uppercase">${{ item.variation_price }}</div>
                          <div class="uppercase">{{ item.quantity }}</div>
                          <div class="uppercase">${{ item.amount }}</div>
                        </Grid>
                      </div>
                    </div>
                    <template v-if="item.client_note">
                      <div class="mt-2">
                        <p class="text-red">Client note</p>
                        <v-textarea rows="1" auto-grow :model-value="item.client_note" variant="solo" flat bg-color="red-lighten-3" hide-details readonly />
                      </div>
                    </template>
                  </div>
                </template>
              </Col>
            </div>
          </v-card>

          <Grid cols="1" md="2" lg="2" xl="2" 2xl="2">

            <div class="my-5 h-full bg-grey-lighten-2 px-3 py-2">
              <p class="text-2xl font-bold mb-2">Order status</p>
              <v-card color="grey-lighten-2">
                <div class="p-1">
                  <v-radio-group v-model="currentStatus" hide-details density="comfortable">
                    <div v-for="status in statuses">
                      <v-radio :value="status" :label="status" hide-details />
                    </div>
                  </v-radio-group>
                </div>
              </v-card>
            </div>

          </Grid>

        </div>

      </template>
      <template #footer>
        <Row>
          <PrimaryButton
              @click="updateOrder"
          >{{ saveButtonText }}</PrimaryButton>
          <SecondaryButton
              @click="closeOrder"
          >close</SecondaryButton>
        </Row>
      </template>
    </DialogModal>

  </TeamLayout>
</template>

<style scoped>
th, td {
  width: 20% !important;
}
</style>
