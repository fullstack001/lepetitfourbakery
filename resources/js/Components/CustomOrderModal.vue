<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {computed, nextTick, reactive, ref, watch} from "vue";
import {router, useForm} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import flatPickr from 'vue-flatpickr-component';
import Flickity from "flickity";
import 'flickity/css/flickity.css';

const props = defineProps({
  errors: Object,
});

// custom order
const showCustomOrderModal = ref(false);
const selectedCustomOrder = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const formCustomOrder = useForm({
  full_name: '',
  email: '',
  phone: '',
  notes: '',
  date: '',
  time: '',
  selected: [],
  quantities: {},
});

const carousel = ref(null);
const calendar = ref(null);
const selectedDate = ref('');
const selectedTime = ref('');
const showPickupModal = ref(false);
const isDragging = ref(false);
const flickityInit = ref(true);

const closedDates = ref([]);
const quick_days = ref({});
const first_day_string = ref('');
const closed_dates = ref([]);
const first_pickup_date = ref('');
const last_pickup_date = ref('');
const is_weekend_only = ref(false);

const orderNotes = ref('');

const orderStep = ref(1);

const calendarKey = ref(0);

const localProducts = ref([]);
const selectedQuantities = reactive({})
const selectedProducts = computed(() =>
    localProducts.value
        .map(product => {
          const matchedVariations = product.variations.filter(variation =>
              formCustomOrder.selected.includes(variation.uid)
          )
          return matchedVariations.length
              ? { ...product, variations: matchedVariations }
              : null
        })
        .filter(Boolean)
)

const totalPrice = computed(() => {
  const total = selectedProducts.value.reduce((total, product) =>
          total + product.variations.reduce((sum, variation) =>
              sum + (variation.price * (selectedQuantities[variation.uid] || 1)), 0
          ), 0
  )
  return total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
})


watch(selectedProducts, (products) => {
  for (const product of products) {
    for (const variation of product.variations) {
      if (!(variation.uid in selectedQuantities)) {
        selectedQuantities[variation.uid] = 1;
      }
    }
  }
})


const openCustomOrder = (custom_order = null) => {
  localProducts.value = [];
  axios.get(route('get_available_products'))
      .then(response => {
        localProducts.value = response.data.products;
        if(custom_order) {
          modalTitle.value = 'Edit custom order';
          selectedCustomOrder.value = custom_order;
          formCustomOrder.name = '';
        } else {
          modalTitle.value = 'Create custom order';
          selectedCustomOrder.value = null;
          formCustomOrder.name = '';
        }
        saveButtonText.value = 'Save custom order';
        orderStep.value = 1;
        formCustomOrder.reset();
        for (const key in selectedQuantities) {
          delete selectedQuantities[key];
        }
        closedDates.value = [];
        quick_days.value = {};
        first_day_string.value = '';
        closed_dates.value = [];
        first_pickup_date.value = '';
        last_pickup_date.value = '';
        is_weekend_only.value = false;
        selectedDate.value = '';
        selectedTime.value = '';
        showCustomOrderModal.value = true;
      })
      .catch(error => {
        console.error(error);
      });
};

const closeCustomOrder = () => {
  showCustomOrderModal.value = false;
};

const resetFormCustomOrder = () => {
  formCustomOrder.reset();
};

const saveCustomOrder = () => {
  let url;
  if(selectedCustomOrder.value) {
    url = route('admin.update_custom_order',{custom_order: selectedCustomOrder.value.uid})
  } else {
    url  = route('admin.create_custom_order');
  }
  formCustomOrder.date = selectedDate.value;
  formCustomOrder.time = selectedTime.value;
  formCustomOrder.quantities = selectedQuantities;
  formCustomOrder.post(url, {
    onSuccess: () => {
      resetFormCustomOrder();
      showCustomOrderModal.value = false;
    },
  });
};
//end custom order

const getPickupDates = () => {
  axios.post(route('admin.get_pickup_dates'), {
    products: selectedQuantities,
  })
      .then(response => {
        orderStep.value = 2;
        // timeslots.value = { ...props.available_times };
        console.log(response.data);
        closedDates.value = response.data.closed_dates;
        quick_days.value = response.data.quick_days;
        first_day_string.value = response.data.first_day_string;
        closed_dates.value = response.data.closed_dates;
        first_pickup_date.value = response.data.first_pickup_date;
        last_pickup_date.value = response.data.last_pickup_date;
        is_weekend_only.value = response.data.is_weekend_only;
        calendarKey.value = Date.now();
      })
      .catch(error => {
        console.error(error);
      });
};

const timeslotsAvailable = ref(false);

const timeslots = ref({});

const getPickupTimes = () => {
  timeslotsAvailable.value = false;
  selectedTime.value = '';
  nextTick(() => {
    axios.post(route('admin.get_pickup_times'), {
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

const openCalendar = () => {
  if(showPickupModal.value && calendar.value) {
    nextTick(() => {
      calendar.value.open();
    });
  }
};
const calendarTargetRef = ref(null);

const flickityCarousel = ref(null);

const closePickup = () => {
  carousel.value.style.opacity = 0;
  showPickupModal.value = false;
  console.log('close');
  setTimeout(() => {
    flickityCarousel.value.destroy();
    flickityInit.value = true;
  }, 200);
};

const dateTimeSet = computed(() => {
  return selectedDate.value && selectedTime.value;
});

const isTimeSlotAvailable = (time) => {
  return selectedDate.value && timeslotsAvailable.value && time.available;
};


defineExpose({ openCustomOrder });

</script>

<template>

  <DialogModal
      :show="showCustomOrderModal"
      @close="closeCustomOrder"
      maxWidth="6xl"
  >
    <template #title>
      {{ modalTitle }}
    </template>
    <template #content>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div>
          <Col gap="2">
            <p>Client name</p>
            <v-text-field v-model="formCustomOrder.full_name" :error-messages="formCustomOrder.errors.full_name" />
          </Col>
        </div>
        <div>
          <Col gap="2">
            <p>Client email</p>
            <v-text-field v-model="formCustomOrder.email" :error-messages="formCustomOrder.errors.email" />
          </Col>
        </div>
        <div>
          <Col gap="2">
            <p>Client phone number</p>
            <v-text-field v-model="formCustomOrder.phone" :error-messages="formCustomOrder.errors.phone" />
          </Col>
        </div>
        <div>
          <Col gap="2">
            <p>Order notes</p>
            <v-text-field v-model="formCustomOrder.notes" :error-messages="formCustomOrder.errors.notes" />
          </Col>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div v-if="orderStep === 1">
          <Col gap="2">
            <p class="text-xl font-bold text-[#222]">Catering menu</p>
            <template v-if="localProducts" v-for="product in localProducts">
              <v-card color="grey-lighten-2" rounded="lg">
                <div class="p-4">
                  <Col gap="2">
                    <Row :center="true" justify="between">
                      <p class="text-black font-bold">{{ product.name }}</p>
                      <template v-if="product.weekend_only">
                          <v-chip size="x-small" color="amber" variant="flat">Weekend only</v-chip>
                      </template>
                    </Row>
                    <Col gap="2">
                      <template v-for="variation in product.variations">
                        <v-card color="grey-lighten-3" rounded="lg">
                          <div class="p-4">
                            <Row :center="true" justify="start">
                              <div class="w-[50px]">
                                <v-img aspect-ratio="1" color="transparent" :src="variation.image_url" cover />
                              </div>
                              <div class="grow">
                                <p>{{ variation.name }}</p>
                                <p>{{ variation.price_string }}</p>
                              </div>
                              <div>
                                <v-checkbox
                                    v-model="formCustomOrder.selected"
                                    :value="variation.uid"
                                    multiple hide-details
                                />
                              </div>
                            </Row>
                          </div>
                        </v-card>
                      </template>
                    </Col>
                  </Col>
                </div>
              </v-card>
            </template>
          </Col>
        </div>
        <div>
          <template v-if="selectedProducts.length">
            <Col gap="2">
              <p class="text-xl font-bold text-[#222]">Selected products</p>
              <template v-for="product in selectedProducts">
                <v-card color="grey" rounded="lg">
                  <div class="p-4">
                    <Col gap="2">
                      <p class="text-black font-bold">{{ product.name }}</p>
                      <Col gap="2">
                        <template v-for="variation in product.variations">
                          <v-card color="grey-lighten-2" rounded="lg">
                            <div class="p-4">
                              <Row :center="true" justify="start">
                                <div class="w-[50px]">
                                  <v-img aspect-ratio="1" color="transparent" :src="variation.image_url" cover />
                                </div>
                                <div class="grow">
                                  <p>{{ variation.name }}</p>
                                  <p>{{ variation.price_string }}</p>
                                </div>
                              </Row>
                              <div class="w-full">
                                <v-slider
                                    v-model="selectedQuantities[variation.uid]"
                                    min="1"
                                    max="50"
                                    hide-details
                                    show-ticks="always"
                                    thumb-label="always"
                                    step="1"
                                />

                              </div>
                            </div>
                          </v-card>
                        </template>
                      </Col>
                    </Col>
                  </div>
                </v-card>
              </template>
              <div class="p-4 text-center">
                <p class="text-2xl font-bold text-black">${{ totalPrice }}</p>
              </div>

            </Col>
          </template>
        </div>
        <div v-if="orderStep === 2" :key="calendarKey">

          <!-- date and time -->
          <div class="text-center">
            <p class="text-lg font-bold text-black">Pick a date</p>
          </div>
          <div ref="carousel" class="carousel w-full mb-3" v-if="false">
            <div v-for="quick_day in quick_days" class="carousel-cell m-1">
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

          <div class="px-1 relative">
            <flat-pickr ref="datepicker" v-model="selectedDate"
                        placeholder="No date selected"
                        :config="{
          dateFormat: 'm/d/Y',
          minDate: first_pickup_date,
          maxDate: last_pickup_date,
          disable: closedDates,
          ...(is_weekend_only && {
          enable: [
            (date) => {
              const isWeekend = [0, 6].includes(date.getDay());
              const isClosed = closedDates.some(d =>
                date.toDateString() === new Date(d).toDateString()
              );
              return isWeekend && !isClosed;
            }
          ]
        }),
          onReady: (selectedDates, dateStr, instance) => {
            defineInstance(instance);
            nextTick(() => {
              const target = calendarTargetRef;
              if (target) {
                target.appendChild(instance.calendarContainer);
                instance.set('static', true);
              nextTick(() => {
                Object.assign(instance.calendarContainer.style, {
                position: 'absolute',
                  top: '10px',
                  left: '0',
                  zIndex: '9999'
                  });
              });
              }
            });
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
            <div id="calendar-target" class="position-relative" ref="calendarTargetRef" />
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
          <!-- end date and time -->

        </div>
      </div>

    </template>
    <template #footer>
      <PrimaryButton
          v-if="orderStep === 1"
          :disabled="formCustomOrder.processing"
          @click="getPickupDates"
          class="me-3"
      >Next</PrimaryButton>
      <PrimaryButton
          v-if="orderStep === 2"
          :disabled="formCustomOrder.processing"
          @click="saveCustomOrder"
          class="me-3"
      >Save</PrimaryButton>
      <SecondaryButton
          @click="closeCustomOrder"
      >Cancel</SecondaryButton>
    </template>
  </DialogModal>

</template>
