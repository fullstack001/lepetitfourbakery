<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head, router, useForm} from "@inertiajs/vue3";
const props = defineProps({
  deliveries: Object,
  selected_status: String,
});
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {ref} from "vue";
import Pagination from "@/Components/Pagination.vue";
import DeliveryOrderItems from "@/Pages/Admin/Subscriptions/DeliveryOrderItems.vue";

const orders = ref([]);
const selectedDelivery = ref(null);

const openDelivery = (delivery) => {
  selectedDelivery.value = delivery;
  axios.get(route('admin.open_delivery', {delivery: delivery.uid}))
      .then(response => {
        formDelivery.status = response.data.delivery.status;
        orders.value = response.data.orders;
        showDeliveryModal.value = true;
      })
      .catch(error => {
        console.error(error);
      });
};

const formDelivery = useForm({
  status: 'initial,'
});

const showDeliveryModal = ref(false);

const closeDelivery = () => {
  showDeliveryModal.value = false;
};

const statuses = ['initial', 'completed', 'canceled'];

const saveDelivery = () => {
  formDelivery.post(route('admin.update_delivery', { delivery: selectedDelivery.value.uid }), {
      onSuccess: () => {
        formDelivery.reset('status');
        closeDelivery();
      },
  });
};

</script>

<template>
  <AdmLayout title="Deliveries">
    <div class="mb-4">
      <Row :center="true" justify="start">
        <template v-for="status in statuses">
          <div>
            <v-btn
                :variant="status === props.selected_status ? 'flat' : 'tonal'"
                @click.prevent="$inertia.visit(route('admin.deliveries', {status: status}))"
            >{{ status }}</v-btn>
          </div>
        </template>
      </Row>
    </div>
    <div class="w-full">
      <v-table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Delivery</th>
          <th>Addr 1</th>
          <th>Addr 2</th>
          <th>Post code</th>
          <th>City</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Subscription</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="delivery in props.deliveries.data">
          <tr>
            <td>
              <p>{{ delivery.full_name }}</p>
            </td>
            <td>
              <p>{{ delivery.datetime_formatted }}</p>
            </td>
            <td><p>{{ delivery.address_1??'-' }}</p></td>
            <td><p>{{ delivery.address_2??'-' }}</p></td>
            <td><p>{{ delivery.post_code??'-' }}</p></td>
            <td><p>{{ delivery.city??'-' }}</p></td>
            <td>
              <p>{{ delivery.email??'-' }}</p>
            </td>
            <td>
              <p>{{ delivery.phone??'-' }}</p>
            </td>
            <td>
              <p>{{ delivery.subscription?.status??'-' }}</p>
            </td>
            <td>
              <div>
                <v-btn
                    @click.prevent="openDelivery(delivery)"
                    variant="outlined" size="small"
                >{{ delivery.status }}</v-btn>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
      </v-table>
      <div class="pagination">

        <div class="flex justify-center mt-5 mb-3">
          <span>Page {{ props.deliveries.current_page }} of {{ props.deliveries.last_page }}</span>
        </div>

        <div class="flex justify-center">
          <SecondaryButton
              class="mx-2"
              v-if="props.deliveries.prev_page_url"
              @click="router.visit(props.deliveries.prev_page_url + '&status=' + props.selected_status)"
          >
            Previous
          </SecondaryButton>
          <SecondaryButton
              class="mx-2"
              v-if="props.deliveries.next_page_url"
              @click="router.visit(props.deliveries.next_page_url + '&status=' + props.selected_status)"
          >
            Next
          </SecondaryButton>
        </div>
      </div>
    </div>

    <DialogModal
        :show="showDeliveryModal"
        @close="closeDelivery"
    >
      <template #title>
        Delivery
      </template>
      <template #content>

        <Col gap="4">
            <Col gap="4">
              <template v-if="orders && orders.length > 0">
                <v-card color="grey-lighten-1" rounded="lg">
                  <div class="p-4">
                    <Col gap="3">

                      <template v-for="order in orders">
                       <template v-if="order.type === 'subscription'">
                         <DeliveryOrderItems
                             :order="order"
                             title="Subscription order"
                         />
                       </template>
                      </template>

                      <template v-for="order in orders">
                        <template v-if="order.type === 'add-on'">
                          <DeliveryOrderItems
                              :order="order"
                              title="Add-ons"
                          />
                        </template>
                      </template>

                    </Col>
                  </div>
                </v-card>
              </template>
              <template v-else>
                <p>This delivery doesn't have any products.</p>
              </template>
            </Col>
          <Col>
              <v-card color="grey-lighten-2" rounded="lg">
                  <div class="p-4">
                    <Col gap="2">
                      <v-label>Delivery status:</v-label>
                      <Row :center="true" justify="start">
                        <v-radio-group inline v-model="formDelivery.status" hide-details>
                          <template v-for="status in statuses">
                            <v-radio :label="status" :value="status" />
                          </template>
                        </v-radio-group>
                      </Row>
                    </Col>
                  </div>
              </v-card>
          </Col>
        </Col>



      </template>
      <template #footer>
        <PrimaryButton
            :disabled="formDelivery.processing"
            @click="saveDelivery"
            class="me-3"
        >Save</PrimaryButton>
        <SecondaryButton
            @click="closeDelivery"
        >Close</SecondaryButton>
      </template>
    </DialogModal>

  </AdmLayout>
</template>
