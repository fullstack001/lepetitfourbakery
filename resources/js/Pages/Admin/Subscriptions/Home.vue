<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  subscriptions: Object,
  errors: Object,
});

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
// subscription
const showSubscriptionModal = ref(false);
const selectedSubscription = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);
const isDelivered = ref(false);

const canOpen = ref(true);
const openSubscription = (subscription = null) => {
  if(subscription && canOpen.value) {
    modalTitle.value = 'View subscription';
    selectedSubscription.value = { ...subscription };
    isDelivered.value = false;
  } else {
    return 0;
  }
  canOpen.value = false;
  saveButtonText.value = 'Update subscription';
  showSubscriptionModal.value = true;
};

const closeSubscription = () => {
  showSubscriptionModal.value = false;
  setTimeout(() => {
    selectedSubscription.value = null;
    canOpen.value = true;
  }, 500);
};

const updateSubscription = () => {
  if(isDelivered.value) {
    let url;
    if(selectedSubscription.value) {
      url = route('admin.update_subscription_status',{subscription: selectedSubscription.value.uid})
    } else {
      return 0;
    }
    router.post(url, {
      delivered: true,
    }, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (page) => {
        closeSubscription();
      },
      onError: (error) => {
        console.log(error);
      }
    });
  } else {

  }
};
//end subscription

const addressForm = reactive({
  full_name: '',
  address_1: '',
  address_2: '',
  post_code: '',
  city: '',
  phone: '',
});

const showAddressForm = ref(false);

const toggleEditAddress = () => {
  if(showAddressForm.value) {
    showAddressForm.value = false;
    Object.assign(addressForm, {
      full_name: '',
      address_1: '',
      address_2: '',
      post_code: '',
      city: '',
      phone: ''
    });
  } else {
    const user = { ...selectedSubscription.value.user };
    Object.assign(addressForm, {
      full_name: user.full_name,
      address_1: user.address_1,
      address_2: user.address_2,
      post_code: user.post_code,
      city: user.city,
      phone: user.phone
    });
    showAddressForm.value = true;
  }
};

const local_errors = ref({});
const saveAddress = () => {
    if(showAddressForm.value) {
      router.post(route('admin.update_delivery_address', { subscription: selectedSubscription.value.uid }), addressForm, {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            const updatedSubscription = props.subscriptions.data.find(
                (subscription) => subscription.uid === selectedSubscription.value.uid
            );

            if (updatedSubscription) {
              selectedSubscription.value = updatedSubscription;
            }

            showAddressForm.value = false;
          },
          onError: (error) => {
              local_errors.value = props.errors;
          }
      });
    }
};

</script>

<template>

  <AdmLayout title="Subscriptions">
    <Head title="Subscriptions"></Head>

    <div v-if="props.subscriptions.data.length > 0" class="flex flex-col gap-3">
      <v-card v-for="subscription in props.subscriptions.data">
        <v-card-item>
          <v-table>
            <thead>
            <tr>
              <th>Client</th>
              <th>Next delivery</th>
              <th>Recipient</th>
              <th>Plan</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ subscription.user.name }}<br>{{ subscription.user.email }}</td>
              <td>{{ subscription.next_delivery_formatted }}</td>
              <td>
                <template v-if="subscription.delivery">
                  <p>{{ subscription.delivery.full_name }}</p>
                  <p>{{ subscription.delivery.address_1 }}</p>
                  <p v-if="subscription.delivery.address_2">{{ subscription.delivery.address_2 }}</p>
                  <p>{{ `${subscription.delivery.city} - ${subscription.delivery.post_code}` }}</p>
                  <p>{{ subscription.delivery.phone }}</p>
                </template>
              </td>
              <td>{{ subscription.plan.name }}</td>
              <td>
                <v-btn
                    @click.prevent="openSubscription(subscription)"
                    size="small">View</v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card-item>
      </v-card>
    </div>
    <div v-else>
      <p>There are no subscriptions to show here at the moment.</p>
    </div>


    <DialogModal
        :show="showSubscriptionModal"
        @close="closeSubscription"
        maxWidth="6xl"
    >
      <template #title>
        {{ modalTitle }}
      </template>
      <template #content>

        <div class="flex flex-col gap-3" v-if="selectedSubscription">
          <v-card>
            <div class="mb-10">
              <p class="text-lg font-bold">Subscription information:</p>
              <v-table>
                <thead>
                <tr>
                  <th>Client</th>
                  <th>Next delivery</th>
                  <th>Recipient</th>
                  <th>Plan</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{{ selectedSubscription.user.name }}<br>{{ selectedSubscription.user.email }}</td>
                  <td>{{ selectedSubscription.next_delivery_formatted }}</td>
                  <td>
                    <template v-if="selectedSubscription.delivery">
                      <p>{{ selectedSubscription.delivery.full_name }}</p>
                      <p>{{ selectedSubscription.delivery.address_1 }}</p>
                      <p v-if="selectedSubscription.delivery.address_2">{{ selectedSubscription.delivery.address_2 }}</p>
                      <p>{{ `${selectedSubscription.delivery.city} - ${selectedSubscription.delivery.post_code}` }}</p>
                      <p>{{ selectedSubscription.delivery.phone }}</p>
                    </template>
                  </td>
                  <td>{{ selectedSubscription.plan.name }}</td>
                </tr>
                </tbody>
              </v-table>
            </div>
            <div>
              <p class="text-lg font-bold">List of products</p>
              <v-table>
                <tbody>
                <tr v-if="selectedSubscription.plan.has_customization" v-for="product in selectedSubscription.user.premium_subscription_items">
                  <td class="uppercase">{{ product.product.name }} ({{ product.variation.name }})</td>
                  <td class="lowercase">x{{ product.quantity }}</td>
                </tr>
                <tr v-else v-for="product in selectedSubscription.plan.products">
                  <td class="uppercase">{{ product.name }}</td>
                  <td class="lowercase">x{{ product.pivot.quantity }}</td>
                </tr>
                </tbody>
              </v-table>
            </div>
            <div class="mt-5" v-if="selectedSubscription.delivery_addon_items.length">
              <p class="text-lg font-bold">List of add-on products</p>
              <v-table>
                <tbody>
                <tr v-for="item in selectedSubscription.delivery_addon_items">
                  <td class="uppercase">{{ item.product_name }} ({{ item.variation_name }})</td>
                  <td class="lowercase">x{{ item.quantity }}</td>
                </tr>
                </tbody>
              </v-table>
            </div>
            <div class="my-8" v-if="false">
              <v-card color="grey-lighten-4">
                <div class="p-1 flex flex-row justify-center items-center">
                  <v-checkbox label="Mark as delivered" value="is_delivered" v-model="isDelivered" hide-details />
                </div>
              </v-card>
            </div>
          </v-card>
          <div class="mb-6 w-full text-center">
            <div class="max-w-xl mx-auto mb-5" v-if="showAddressForm" >
              <div class="w-full">
                <v-label>Full name</v-label>
                <v-text-field v-model="addressForm.full_name" :error-messages="local_errors.full_name" />
              </div>
              <div class="w-full">
                <v-label>Address line 1</v-label>
                <v-text-field v-model="addressForm.address_1" :error-messages="local_errors.address_1" />
              </div>
              <div class="w-full">
                <v-label>Address line 2</v-label>
                <v-text-field v-model="addressForm.address_2" :error-messages="local_errors.address_2" />
              </div>
              <div class="w-full">
                <v-label>Post code</v-label>
                <v-text-field v-model="addressForm.post_code" :error-messages="local_errors.post_code" />
              </div>
              <div class="w-full">
                <v-label>City</v-label>
                <v-text-field v-model="addressForm.city" :error-messages="local_errors.city" />
              </div>
              <div class="w-full">
                <v-label>Phone</v-label>
                <v-text-field v-model="addressForm.phone" :error-messages="local_errors.phone" />
              </div>
              <div class="w-full">
                <p>This will update the user's current address as well as this delivery's address</p>
              </div>
            </div>
            <div class="flex flex-row flex-wrap gap-3 justify-center">
              <v-btn
                  v-if="showAddressForm"
                  @click.prevent="saveAddress"
                  color="grey"
              variant="outlined">Save delivery address</v-btn>
              <v-btn
                  @click.prevent="toggleEditAddress"
                  variant="plain">{{ showAddressForm ? 'Hide' : 'Show' }} user address form</v-btn>
            </div>
          </div>
        </div>

      </template>
      <template #footer>
        <Row :center="true" justify="between">
          <PrimaryButton
              @click="updateSubscription"
          >{{ saveButtonText }}</PrimaryButton>
          <SecondaryButton
              @click="closeSubscription"
          >close</SecondaryButton>
        </Row>
      </template>
    </DialogModal>


  </AdmLayout>



</template>

<style scoped>
    th, td {
      width: 20% !important;
    }
</style>
