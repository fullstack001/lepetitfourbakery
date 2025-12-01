<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import Wrapper from "@/Components/Wrapper.vue";
import {computed, nextTick, onMounted, ref} from "vue";
import flatPickr from 'vue-flatpickr-component';
import Flickity from "flickity";
import 'flickity/css/flickity.css';
import DialogModal from "@/Components/DialogModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";

defineOptions({ layout: AppLayout });

const props = defineProps({
  order: Object,
  date: String,
  time: String,
  quick_days: Object,
  first_day_string: String,
  first_pickup_date: String,
  last_pickup_date: String,
  available_times: Object,
  closed_dates: Array,
  date_valid: Boolean,
  total_amount: String,
  full_name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  errors: Object,
});

const carousel = ref(null);
const calendar = ref(null);
const localProducts = ref([]);
const selectedDate = ref('');
const selectedTime = ref('');
const showPickupModal = ref(false);
const modalTitle = ref('');
const saveButtonText = ref('');
const isDragging = ref(false);
const flickityInit = ref(true);

const enteredName = ref('');
const enteredEmail = ref('');
const enteredPhone = ref('');



function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

const openCalendar = () => {
  if(showPickupModal.value && calendar.value) {
    nextTick(() => {
      calendar.value.open();
    });
  }
};

const flickityCarousel = ref(null);

const openPickup = () => {
  if(flickityInit.value) {
    modalTitle.value = 'Select a date and time for pickup';
    showPickupModal.value = true;
    nextTick(() => {
      flickityInit.value = false;
      if(flickityCarousel.value) flickityCarousel.value.destroy();
      flickityCarousel.value = new Flickity(carousel.value, {
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        prevNextButtons: false,
        autoPlay: false,
      });

      flickityCarousel.value.on('dragStart', () => {
        isDragging.value = true;
      });

      flickityCarousel.value.on('dragEnd', () => {
        isDragging.value = false;
      });
      setTimeout(() => {
        carousel.value.style.opacity = 1;
      }, 100);
    });
  }
};

const timeslotsAvailable = ref(false);

const timeslots = ref({});

const getPickupTimes = () => {
  timeslotsAvailable.value = false;
  selectedTime.value = '';
  nextTick(() => {
    axios.post(route('get_pickup_times'), {
      date: selectedDate.value,
    })
        .then(response => {
          timeslots.value = { ...response.data.available_times };
          timeslotsAvailable.value = true;
        })
        .catch(error => {
          console.error('error');
        });
  });
};

const selectDate = (date) => {
  if(!isDragging.value) {
    calendar.value.setDate(date.selection, true, 'm/d/Y');
  }
  getPickupTimes();
};

const selectTime = (time) => {
  selectedTime.value = time;
};

const defineInstance = (instance) => {
  calendar.value = instance;
};

const closePickup = () => {
  carousel.value.style.opacity = 0;
  showPickupModal.value = false;
  console.log('close');
  setTimeout(() => {
    flickityCarousel.value.destroy();
    flickityInit.value = true;
  }, 200);
};

const canOrder = computed(() => {
  return selectedDate.value && selectedTime.value;
});

const isOrdering = ref(false);

const isTimeSlotAvailable = (time) => {
  return selectedDate.value && timeslotsAvailable.value && time.available;
};

const checkout = () => {
  isOrdering.value = true;
  axios.post(route('order_checkout', {order: props.order.uid}),{
    date: selectedDate.value,
    time: selectedTime.value,
    full_name: enteredName.value,
    email: enteredEmail.value,
    phone: enteredPhone.value,
  })
      .then(response => {
        const url = response.data.url;
        if (url === 'error') {
          isOrdering.value = false;
          console.log('An error occurred');
        } else if (isValidUrl(url)) {
          window.location.href = url;
        } else {
          isOrdering.value = false;
          console.log('Invalid URL');
        }
      })
      .catch(error => {
        console.error('error');
      });
};

const resetOrder = () => {
  router.post(route('order_reset', {order: props.order.uid}), {}, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      console.log('success');
    },
    onError: (error) => {
      console.error('error');
    }
  });
};

const cancelOrder = () => {
  router.post(route('order_cancel', {order: props.order.uid}), {}, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      console.log('success');
    },
    onError: (error) => {
      console.error('error');
    }
  });
};

const closedDates = ref([]);


onMounted(() => {
  nextTick(() => {
    if(props.order.status === 'initial') {
      if(props.date_valid) {
        timeslots.value = { ...props.available_times };
        closedDates.value = props.closed_dates;
        selectedDate.value = props.date;
        selectedTime.value = props.time;
        enteredName.value = props.full_name;
        enteredEmail.value = props.email;
        enteredPhone.value = props.phone;
      } else {

      }
    }
  });
})

</script>

<template>

  <Head :title="`Order ${props.order.number}`"></Head>

  <Wrapper style="margin-top: 150px;">
    <div class="flex justify-center">
      <div class="text-center">
        <h1 class="text-6xl brand uppercase">Order</h1>
        <div class="my-4">
          <v-btn
              @click.prevent="$inertia.visit(route('orders'))"
          >Close</v-btn>
        </div>
      </div>
    </div>
  </Wrapper>

  <Wrapper wrapper="row">
    <div>
      <v-table>
        <tbody>
        <tr>
          <td>Number</td>
          <td class="uppercase">{{ props.order.initial }}{{ props.order.number }}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td class="uppercase">${{ props.order.amount }}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td class="uppercase">{{ props.order.type }}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td class="uppercase">{{ props.order.status }}</td>
        </tr>
        <tr v-if="props.order.type === 'catering'">
          <td>Date & time</td>
          <td class="uppercase">
            <div class="flex flex-row items-center gap-3">
              <div>
                <div v-if="props.order.status === 'initial'">
                  <p v-if="selectedDate && selectedTime" class="text-black font-bold">{{ selectedDate }} at {{ selectedTime }}</p>
                  <p v-else-if="selectedDate"><strong>{{ selectedDate }}</strong> <span class="text-red">(time not set)</span></p>
                  <p v-else-if="selectedTime"><strong>{{ selectedTime }}</strong> <span class="text-red">(date not set)</span></p>
                  <p v-else class="text-red">Not set</p>
                </div>
                <div v-else class="text-black font-bold">
                  {{ props.date }} at {{ props.time }}
                </div>
              </div>
              <div v-if="props.order.status === 'initial'" class="flex flex-row flex-wrap gap-3">
                <v-btn
                    color="amber"
                    @click.prevent="resetOrder">Reset order</v-btn>
                <v-btn
                    variant="outlined"
                    color="red"
                    @click.prevent="cancelOrder">Cancel order</v-btn>
              </div>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td>Delivery</td>
          <td>
            <v-btn
                variant="outlined"
                color="red"
                @click.prevent="cancelOrder">Cancel order</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </div>
  </Wrapper>

  <Wrapper wrapper="row">
    <div>
      <v-table>
        <tbody>
        <tr v-for="item in props.order.items">
          <td><v-img :src="item.thumbnail" /></td>
          <td class="uppercase">{{ item.product_name }}</td>
          <td class="uppercase">{{ item.variation_name }}</td>
          <td class="uppercase">${{ item.variation_price }}</td>
          <td class="uppercase">{{ item.quantity }}</td>
          <td class="uppercase">${{ item.amount }}</td>
        </tr>
        </tbody>
      </v-table>
    </div>
  </Wrapper>

  <Wrapper wrapper="row" v-if="false">

    <div class="max-w-3xl mx-auto">
      <div class="flex flex-row justify-center mt-10">
        <p class="text-2xl">Total: {{ props.total_amount }}</p>
      </div>

      <div class="max-w-sm mx-auto">
        <div
            v-if="props.order.status === 'initial'"
            class="flex flex-row justify-center mt-10"
        >
          <div class="w-full">
            <div class="w-full text-center">
              <v-label class="mb-2">Your first and last name</v-label>
              <v-text-field v-model="enteredName" :error-messages="errors.full_name" />
            </div>
            <div class="w-full text-center mt-5">
              <v-label class="mb-2">Your email address</v-label>
              <v-text-field
                  :disabled="true"
                  :readonly="true"
                  v-model="enteredEmail" :error-messages="errors.email" />
            </div>
            <div class="w-full text-center mt-5">
              <v-label class="mb-2">Your phone number</v-label>
              <v-text-field v-model="enteredPhone" :error-messages="errors.phone" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-center mt-10" v-if="props.order.status === 'initial'">
        <v-btn
            :disabled="isOrdering"
            v-if="canOrder"
            @click.prevent="checkout"
        >{{ isOrdering ? 'Processing' : 'Place order'}}</v-btn>

        <v-btn
            :disabled="isOrdering"
            v-else-if="props.order.type === 'catering'"
            color="grey-darken-1"
            variant="tonal"
        >
          {{ isOrdering ? 'Processing' : 'Place order'}}
          <v-tooltip
              activator="parent"
              location="end"
          >Please select a date and time for pickup</v-tooltip>
        </v-btn>
      </div>
    </div>
  </Wrapper>


  <DialogModal
      :show="showPickupModal"
      @close="closePickup"
  >
    <template #title>
      {{ modalTitle }}
    </template>
    <template #content>


      <div class="text-center">
        <p class="text-lg font-bold text-black">Pick a date</p>
      </div>
      <div ref="carousel" class="carousel w-full mb-3">
        <div v-for="quick_day in props.quick_days" class="carousel-cell m-1">
          <div class="p-1 h-full">
            <v-card
                @click.prevent="selectDate(quick_day)"
                elevation="3" class="h-full"
                :color="selectedDate === quick_day.selection ? '#000000' : '#f99c19'"
            >
              <v-card-item class="h-full">
                <div class="flex flex-col items-center h-full">
                  <div class="font-normal">
                    <p class="text-lg">{{ quick_day.day }}</p>
                    <p class="text-md">{{ quick_day.date }}</p>
                  </div>
                </div>
              </v-card-item>
            </v-card>
          </div>
        </div>
        <div class="carousel-cell m-1">
          <div class="p-1 h-full">
            <v-card
                @click.prevent="openCalendar"
                elevation="3" class="h-full" color="#f99c19"
            >
              <v-card-item class="h-full">
                <div class="flex flex-col items-center h-full">
                  <div>
                    <v-icon>mdi-calendar</v-icon>
                  </div>
                </div>
              </v-card-item>
            </v-card>
          </div>
        </div>
      </div>

      <div class="px-1">
        <flat-pickr ref="datepicker" v-model="selectedDate"
                    placeholder="No date selected"
                    :config="{
          dateFormat: 'm/d/Y',
          minDate: props.first_pickup_date,
          maxDate: props.last_pickup_date,
          disable: closedDates,
          onReady: (selectedDates, dateStr, instance) => {
            defineInstance(instance);
          },
          onValueUpdate: (selectedDates, dateStr, instance) => {
            defineInstance(instance);
          },
          onClose: (selectedDates, dateStr, instance) => {
            getPickupTimes();
            defineInstance(instance);
          },
        }"
                    class="main-input rounded-md" />
      </div>

      <div class="mt-10 mb-3 text-center">
        <p class="text-lg font-bold text-black">Pick a time</p>
      </div>
      <div class="flex flex-row justify-center mb-5">
        <div class="grid grid-cols-4 gap-3">
          <div v-for="time in timeslots">
            <v-btn
                :disabled="!isTimeSlotAvailable(time)"
                :class="`${isTimeSlotAvailable(time) ? 'opacity-100' : 'opacity-40'}`"
                @click.prevent="selectTime(time.displayed_time)"
                :color="isTimeSlotAvailable(time) ? (selectedTime === time.displayed_time ? '#000000' : '#f99c19') : '#ffffff'"
            >{{ time.displayed_time }}</v-btn>
          </div>
        </div>
      </div>

    </template>
    <template #footer>
      <SecondaryButton
          @click="closePickup"
      >Close</SecondaryButton>
    </template>
  </DialogModal>



</template>

<style scoped>

.carousel {
  background: #fff;
  opacity: 0;
  transition: opacity 1s ease;
}

.carousel-cell {
  width: 100px;
  height: 100px;
}

.carousel img {
  display: block;
}

</style>
