<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head} from "@inertiajs/vue3";
import Pagination from "@/Components/Pagination.vue";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import Grid from "@/Components/Grid.vue";

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
import {nextTick, reactive, ref} from "vue";
import {router, usePage} from "@inertiajs/vue3";
import CustomOrderModal from "@/Components/CustomOrderModal.vue";
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
    currentStatus.value = order.status;
    // Initialize datetime for editing
    if(order.datetime) {
      const datetime = new Date(order.datetime);
      // Format date as YYYY-MM-DD for date input
      const year = datetime.getFullYear();
      const month = String(datetime.getMonth() + 1).padStart(2, '0');
      const day = String(datetime.getDate()).padStart(2, '0');
      orderDate.value = `${year}-${month}-${day}`;
      // Format time as HH:MM for time input
      const hours = String(datetime.getHours()).padStart(2, '0');
      const minutes = String(datetime.getMinutes()).padStart(2, '0');
      orderTime.value = `${hours}:${minutes}`;
    }
  } else {
    return 0;
  }
  canOpen.value = false;
  saveButtonText.value = 'Update order';
  editOrderNotes.value = false;
  editDatetime.value = false;
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
    url = route('admin.update_order_status',{order: selectedOrder.value.uid})
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

const updateOrderDatetime = () => {
  local_errors.value = {};
  if(!selectedOrder.value) {
    return 0;
  }
  // Convert date from YYYY-MM-DD to MM/DD/YYYY format for backend
  const dateParts = orderDate.value.split('-');
  const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
  
  router.post(route('admin.update_order_datetime', {order: selectedOrder.value.uid}), {
    date: formattedDate,
    time: orderTime.value,
  }, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      const updatedOrder = props.orders.data.find(order => order.uid === selectedOrder.value.uid);
      if(updatedOrder) {
        selectedOrder.value = {...updatedOrder};
        if(updatedOrder.datetime) {
          const datetime = new Date(updatedOrder.datetime);
          // Format date as YYYY-MM-DD for date input
          const year = datetime.getFullYear();
          const month = String(datetime.getMonth() + 1).padStart(2, '0');
          const day = String(datetime.getDate()).padStart(2, '0');
          orderDate.value = `${year}-${month}-${day}`;
          // Format time as HH:MM for time input
          const hours = String(datetime.getHours()).padStart(2, '0');
          const minutes = String(datetime.getMinutes()).padStart(2, '0');
          orderTime.value = `${hours}:${minutes}`;
        }
      }
      editDatetime.value = false;
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};

const toggleEditDatetime = () => {
  editDatetime.value = !editDatetime.value;
  if(editDatetime.value && selectedOrder.value && selectedOrder.value.datetime) {
    const datetime = new Date(selectedOrder.value.datetime);
    // Format date as YYYY-MM-DD for date input
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, '0');
    const day = String(datetime.getDate()).padStart(2, '0');
    orderDate.value = `${year}-${month}-${day}`;
    // Format time as HH:MM for time input
    const hours = String(datetime.getHours()).padStart(2, '0');
    const minutes = String(datetime.getMinutes()).padStart(2, '0');
    orderTime.value = `${hours}:${minutes}`;
  }
};
//end order

const isRefunding = ref(false);

const local_errors = ref({});

const initiateRefund = () => {
  local_errors.value = {};
  isRefunding.value = true;
  router.post(route('admin.initiate_refund', {order: selectedOrder.value.uid}), refundForm, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      const updatedOrder = props.orders.data.find(order => order.uid === selectedOrder.value.uid);

      selectedOrder.value = {...updatedOrder};
      refundForm.stripe = '';
      refundForm.gift_card = '';
      isRefunding.value = false;
    },

    onError: (error) => {
      local_errors.value = props.errors;
      isRefunding.value = false;
    }
  });
};

const refundForm = reactive({
  stripe: '',
  gift_card: '',
  confirm: false,
});

const statuses = ref(['paid', 'ready', 'completed', 'canceled']);
const currentStatus = ref(null);

// datetime editing
const editDatetime = ref(false);
const orderDate = ref('');
const orderTime = ref('');

const showRefunds = ref(false);

const numberFormat = (number) => {
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const toggleRefunds = () => {
  showRefunds.value = !showRefunds.value;
};

// notes
    const editOrderNotes = ref(false);

    const orderNotes = ref('');

    const toggleEditOrderNotes = () => {
      orderNotes.value = selectedOrder.value.notes;
      editOrderNotes.value = !editOrderNotes.value;
    };

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

const customOrderModal = ref(null);

const createCustomOrder = () => {
  customOrderModal.value.openCustomOrder();
};

// helper function to check if order has notes or client notes
const hasNotesOrClientNotes = (order) => {
  // Check if order.notes exists
  if (order.notes && order.notes.trim() !== '') {
    return true;
  }
  // Check if any items have client notes
  if (order.items && Array.isArray(order.items)) {
    return order.items.some(item => item.client_note && item.client_note.trim() !== '');
  }
  return false;
};

// client notes modal
const showClientNotesModal = ref(false);
const selectedOrderForClientNotes = ref(null);

const openClientNotesModal = (order) => {
  selectedOrderForClientNotes.value = order;
  showClientNotesModal.value = true;
};

const closeClientNotesModal = () => {
  showClientNotesModal.value = false;
  setTimeout(() => {
    selectedOrderForClientNotes.value = null;
  }, 500);
};

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
  const url = route('admin.orders_export', { status });
  window.location.href = url;
};

</script>

<template>
  <AdmLayout title="Orders">

    <div class="flex flex-row flex-wrap gap-3 mb-5">
      <v-btn @click.prevent="$inertia.visit(route('admin.orders'))">
        Paid orders {{ `(${props.paid_count})` }}
      </v-btn>
      <v-btn @click.prevent="$inertia.visit(route('admin.orders_ready'))">
        Ready orders {{ `(${props.ready_count})` }}
      </v-btn>
      <v-btn @click.prevent="$inertia.visit(route('admin.orders_completed'))">
        Completed orders {{ `(${props.completed_count})` }}
      </v-btn>
      <v-btn @click.prevent="$inertia.visit(route('admin.orders_canceled'))">
        Canceled orders {{ `(${props.canceled_count})` }}
      </v-btn>
      <v-btn
          @click.prevent="createCustomOrder"
          variant="tonal" prepend-icon="mdi-plus-circle-outline">Custom order</v-btn>
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
                <template v-if="hasNotesOrClientNotes(order)">
                  <v-icon 
                    class="bg-red text-white rounded-circle cursor-pointer" 
                    @click.prevent="openClientNotesModal(order)"
                    style="cursor: pointer;">
                    mdi-pencil-circle
                  </v-icon>
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
                      <template v-if="editDatetime">
                        <div class="flex flex-col gap-2 mt-2">
                          <v-text-field
                            v-model="orderDate"
                            label="Date"
                            type="date"
                            variant="outlined"
                            density="compact"
                            :error-messages="local_errors.date || local_errors.datetime"
                            :error="!!(local_errors.date || local_errors.datetime)"
                          />
                          <v-text-field
                            v-model="orderTime"
                            label="Time"
                            type="time"
                            variant="outlined"
                            density="compact"
                            :error-messages="local_errors.time || local_errors.datetime"
                            :error="!!(local_errors.time || local_errors.datetime)"
                          />
                          <div v-if="local_errors.datetime" class="text-red text-sm">
                            {{ Array.isArray(local_errors.datetime) ? local_errors.datetime[0] : local_errors.datetime }}
                          </div>
                          <div class="flex flex-row gap-2">
                            <v-btn
                              size="small"
                              @click.prevent="updateOrderDatetime"
                              color="primary"
                            >Save</v-btn>
                            <v-btn
                              size="small"
                              variant="outlined"
                              @click.prevent="toggleEditDatetime"
                            >Cancel</v-btn>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        {{ selectedOrder.datetime_formatted }}
                        <v-btn
                          size="x-small"
                          variant="text"
                          @click.prevent="toggleEditDatetime"
                          class="mt-1"
                        >Edit</v-btn>
                      </template>
                    </div>
                    <div class="flex flex-col justify-center bg-grey-lighten-3 p-2">
                      <p class="font-bold">Items</p>
                      <div>
                        <v-btn
                            size="small" color="grey-darken-2">{{ selectedOrder.total_quantity }}</v-btn>
                      </div>
                    </div>
                    <div class="uppercase flex flex-col justify-center bg-grey-lighten-3 p-2">
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

            <div class="my-5 h-full bg-grey-lighten-2 px-3 py-2">
              <p class="text-2xl font-bold mb-2">Payment</p>
              <template v-for="payment in selectedOrder.payments">
                <Grid cols="2" md="2" lg="2" xl="2" 2xl="2">
                  <div>
                    <p class="font-bold">Amount</p>
                    <div><p>{{ payment.amount_display }}</p></div>
                  </div>
                  <div>
                    <p class="font-bold">Captured</p>
                    <div><p>{{ payment.amount_captured_display }}</p></div>
                  </div>
                  <div>
                    <p class="font-bold">Card</p>
                    <div><p>...{{ payment.card_last_4 }}</p></div>
                  </div>
                  <div>
                    <p class="font-bold">Status</p>
                    <div><p>{{ payment.status }}</p></div>
                  </div>
                </Grid>
              </template>
            </div>

          </Grid>

          <div>
            <div class="my-5">
              <p class="text-2xl font-bold mb-2">Refunds</p>
              <v-card color="grey-lighten-2">
                <v-card-item>
                  <v-table v-if="selectedOrder.refunds.length > 0" class="bg-grey-lighten-2">
                    <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="refund in selectedOrder.refunds">
                      <td><p>{{ refund.amount_display }}</p></td>
                      <td><p>{{ refund.status }}</p></td>
                    </tr>
                    </tbody>
                  </v-table>
                  <div v-else>
                    <p>There are no refunds to show for this order</p>
                  </div>
                </v-card-item>
              </v-card>
              <div v-if="showRefunds" class="mt-5">
                <div class="flex flex-col lg:flex-row items-center gap-2 w-full">
                  <div class="grow w-full">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      <div class="w-full">
                        <v-text-field
                            :disabled="selectedOrder.refundable_stripe <= 0"
                            v-model="refundForm.stripe"
                            :label="`Online payment refundable (USD): ${selectedOrder.refundable_stripe}`" class="w-full" hide-details />
                      </div>
                      <div>
                        <v-text-field
                            :disabled="selectedOrder.refundable_gift_card <= 0"
                            v-model="refundForm.gift_card"
                            :label="`Gift card amount refundable (USD): ${selectedOrder.refundable_gift_card}`" class="w-full" hide-details />
                      </div>
                    </div>
                  </div>
                  <div class="shrink-0">
                    <v-btn
                        @click.prevent="initiateRefund"
                        :disabled="isRefunding"
                    >{{ isRefunding ? 'Processing...' : 'Initiate refund' }}</v-btn>
                  </div>
                </div>
                <div class="flex flex-row items-center justify-center w-full">
                  <div>
                    <v-checkbox
                        v-model="refundForm.confirm"
                        label="Confirm that you want to proceed with the refund" hide-details />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="Object.keys(local_errors).length" class="flex flex-col justify-center">
              <p class="text-red w-full text-center" v-for="(error, index) in Object.values(local_errors)" :key="index">
                {{ error }}
              </p>
            </div>
            <div class="flex flex-row justify-center items-center gap-2 w-full my-5">
              <v-btn
                  @click.prevent="toggleRefunds"
                  color="grey-darken-2"
                  variant="plain"
              >{{ `${showRefunds ? 'Hide' : 'Show'}` }} refund form</v-btn>
            </div>
          </div>

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

    <CustomOrderModal ref="customOrderModal" :errors="props.errors"/>

    <!-- Client Notes Modal -->
    <DialogModal
        :show="showClientNotesModal"
        @close="closeClientNotesModal"
        maxWidth="2xl"
    >
      <template #title>
        Client Notes - Order {{ selectedOrderForClientNotes?.initial }}{{ selectedOrderForClientNotes?.number }}
      </template>
      <template #content>
        <div v-if="selectedOrderForClientNotes" class="flex flex-col gap-3">
          <!-- Show order notes if exists -->
          <div v-if="selectedOrderForClientNotes.notes" class="mb-4">
            <p class="text-2xl font-bold mb-2">Order Notes</p>
            <v-card color="grey-lighten-3" rounded="lg">
              <div class="p-4">
                <p v-html="selectedOrderForClientNotes.notes_formatted || selectedOrderForClientNotes.notes"></p>
              </div>
            </v-card>
          </div>

          <!-- Show client notes from items -->
          <div v-if="selectedOrderForClientNotes.items && selectedOrderForClientNotes.items.length > 0">
            <p class="text-2xl font-bold mb-2">Item Client Notes</p>
            <Col gap="4">
              <template v-for="item in selectedOrderForClientNotes.items" :key="item.id || item.uid">
                <div v-if="item.client_note" class="bg-grey-lighten-2 p-4 rounded-lg">
                  <div class="flex flex-row items-start gap-3">
                    <div class="hidden lg:flex shrink-0 w-[70px]">
                      <v-img v-if="item.thumbnail" aspect-ratio="1" :src="item.thumbnail" cover />
                    </div>
                    <div class="grow">
                      <div class="mb-2">
                        <p class="font-bold text-lg">{{ item.product_name }}</p>
                        <p class="text-sm text-grey-darken-1">{{ item.variation_name }}</p>
                        <p class="text-xs text-grey-darken-2">Quantity: {{ item.quantity }}</p>
                      </div>
                      <div class="mt-3">
                        <p class="text-red font-bold mb-1">Client Note:</p>
                        <v-textarea
                            rows="2"
                            auto-grow
                            :model-value="item.client_note"
                            variant="solo"
                            flat
                            bg-color="red-lighten-3"
                            hide-details
                            readonly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </Col>
          </div>
          <div v-if="!selectedOrderForClientNotes.notes && (!selectedOrderForClientNotes.items || !selectedOrderForClientNotes.items.some(item => item.client_note))" class="text-center py-4">
            <p class="text-grey">No notes found for this order.</p>
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="closeClientNotesModal">Close</SecondaryButton>
      </template>
    </DialogModal>

  </AdmLayout>
</template>

<style scoped>
th, td {
  width: 20% !important;
}
</style>