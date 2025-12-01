<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import WrapperFull from "@/Components/WrapperFull.vue";
import Wrapper from "@/Components/Wrapper.vue";
import Header from "@/Components/Header.vue";
import {computed, nextTick, onMounted, reactive, ref, watch, watchPostEffect} from "vue";
import flatPickr from 'vue-flatpickr-component';
import Flickity from "flickity";
import 'flickity/css/flickity.css';
import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import ConfirmModal from "@/Components/ConfirmModal.vue";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  order_items: Object,
  total_amount: String,
  quick_days: Object,
  first_day_string: String,
  first_pickup_date: String,
  last_pickup_date: String,
  available_times: Object,
  settings: Object,
  closed_dates: Array,
  full_name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  order_notes: { type: String, default: '' },
  is_auth: Boolean,
  is_weekend_only: Boolean,
  pickup_date_range: { type: Object, default: null },
  products_with_date_range: { type: Array, default: () => [] },
  all_items_have_event_menu_category_uid: { type: Boolean, default: false },
});

defineOptions({ layout: AppLayout });

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

const closedDates = ref([]);
const orderNotes = ref('');

const updateLocalProducts = () => {
  // Convert order_items to array if it's an object
  const items = Array.isArray(props.order_items) 
    ? props.order_items 
    : Object.values(props.order_items || {});
  
  localProducts.value = items.map(product => ({...product}));
  console.log("localProducts", localProducts.value);
};

const cartTotalPrice = computed(() => {
  return localProducts.value.reduce((total, product) => total + product.total_price, 0);
});

// Calculate minimum date - only use pickup_date_range if all items have event_menu_category_uid
const minPickupDate = computed(() => {
  // Only use pickup_date_range if ALL items have event_menu_category_uid
  if (props.all_items_have_event_menu_category_uid && props.pickup_date_range?.min_date) {
    console.log("minPickupDate", props.pickup_date_range.min_date);
    return props.pickup_date_range.min_date;
  }
  // Otherwise, use normal pickup dates
  console.log("minPickupDate with normal: ", props.first_pickup_date);
  return props.first_pickup_date;
});

// Calculate maximum date - only use pickup_date_range if all items have event_menu_category_uid
const maxPickupDate = computed(() => {
  // Only use pickup_date_range if ALL items have event_menu_category_uid
  if (props.all_items_have_event_menu_category_uid && props.pickup_date_range?.max_date) {
    console.log("maxPickupDate", props.pickup_date_range.max_date);
    return props.pickup_date_range.max_date;
  }
  // Otherwise, use normal pickup dates
  console.log("maxPickupDate with normal: ", props.last_pickup_date);
  return props.last_pickup_date;
});

// Helper function to check if a date (m/d/Y format) is within the pickup date range
const isDateWithinRange = (dateString) => {
  if (!dateString) return false;
  
  const [month, day, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0); // Normalize to start of day
  
  // Parse min date
  const minDateStr = minPickupDate.value;
  if (minDateStr) {
    const [minMonth, minDay, minYear] = minDateStr.split('/').map(Number);
    const minDate = new Date(minYear, minMonth - 1, minDay);
    minDate.setHours(0, 0, 0, 0); // Normalize to start of day
    if (date < minDate) return false;
  }
  
  // Parse max date
  const maxDateStr = maxPickupDate.value;
  if (maxDateStr) {
    const [maxMonth, maxDay, maxYear] = maxDateStr.split('/').map(Number);
    const maxDate = new Date(maxYear, maxMonth - 1, maxDay);
    maxDate.setHours(0, 0, 0, 0); // Normalize to start of day
    if (date > maxDate) return false;
  }
  
  return true;
};

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

const dateTimeSet = computed(() => {
  return selectedDate.value && selectedTime.value;
});

const enteredName = ref('');
const enteredEmail = ref('');
const enteredPhone = ref('');

const useGiftCard = ref(false);
const giftCardVerified = ref(false);

const GiftCardNumber = ref('');
const giftCardMessage = ref('');
const giftCardMessageColor = ref('red');

const amountPaidViaGiftCard = ref(0);
const amountPaidViaGiftCardFormatted = computed(() => {
  return amountPaidViaGiftCard.value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
});

const remainderToPay = ref(0)
const remainderToPayFormatted = computed(() => {
  return remainderToPay.value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
});

const typeNumber = () => {
  giftCardVerified.value = false;
  amountPaidViaGiftCard.value = 0;
  remainderToPay.value = 0;
  let value = GiftCardNumber.value;

  value = value.toUpperCase();

  value = value.replace(/[^A-Z0-9\-]/g, '');

  value = value.replace(/-/g, '');

  if (value.length > 4) value = value.slice(0, 4) + '-' + value.slice(4);
  if (value.length > 9) value = value.slice(0, 9) + '-' + value.slice(9);
  if (value.length > 14) value = value.slice(0, 14) + '-' + value.slice(14);

  if ([4, 9, 14].includes(value.length)) {
    value += '-';
  }

  if (value.length > 19) {
    value = value.slice(0, 19);
  }

  GiftCardNumber.value = value;
};


const verifyGiftCard = () => {
  Object.keys(errors).forEach(key => delete errors[key]);
  axios.post(route('verify_gift_card'), {
    number: GiftCardNumber.value,
    email: enteredEmail.value,
  })
      .then(response => {
        giftCardMessageColor.value = response.data.color;
        giftCardMessage.value = response.data.message;
        amountPaidViaGiftCard.value = response.data.amount_gift_card;
        remainderToPay.value = response.data.amount_remainder;
        giftCardVerified.value = response.data.verified;
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          const responseErrors = error.response.data.errors;
          Object.keys(responseErrors).forEach(key => {
            errors[key] = responseErrors[key];
          });
        } else {
          errors.value = ['An unexpected error occurred. Please try again.'];
        }
      });
};

const errors = reactive({});
const isOrdering = ref(false);

const checkout = () => {
  isOrdering.value = true;
  Object.keys(errors).forEach(key => delete errors[key]);
  axios.post(route('checkout'),{
    date: selectedDate.value,
    time: selectedTime.value,
    full_name: enteredName.value,
    email: enteredEmail.value,
    phone: enteredPhone.value,
    number: GiftCardNumber.value,
    notes: orderNotes.value,
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
        isOrdering.value = false;
        if (error.response && error.response.data && error.response.data.errors) {
          const responseErrors = error.response.data.errors;
          Object.keys(responseErrors).forEach(key => {
            errors[key] = responseErrors[key];
          });
        } else {
          errors.value = ['An unexpected error occurred. Please try again.'];
        }
      });
};


const canPlaceOrder = ref(true);
const updatedProduct = ref(null);
const canUpdateOrder = ref(true);
const timeout = ref(null);
const confirmModal = ref(null);

const askConfirmDelete = () => {
  confirmModal.value.openConfirm();
};

const isTimeSlotAvailable = (time) => {
  return selectedDate.value && timeslotsAvailable.value && time.available;
};

const updateQuantity = (uid, quantity) => {
  canUpdateOrder.value = false;
  router.post(route('update_cart_quantity'), {
    uid: uid,
    quantity: quantity,
  }, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      console.log('success');
      if(timeout.value) {
        clearTimeout(timeout.value);
      }
      canUpdateOrder.value = true;
      canPlaceOrder.value = true;
      updateLocalProducts();
    },
    onError: (error) => {
      console.log(error);
    }
  });
};

const reduceQuantity = (product) => {
  canPlaceOrder.value = false;
  if(canUpdateOrder.value && (updatedProduct.value === null || updatedProduct.value === product.uid)) {
    updatedProduct.value = product.uid;
    if(product.quantity > 1) {
      product.quantity--;
      if(timeout.value) {
        clearTimeout(timeout.value);
      }
      timeout.value = setTimeout(() => {
        updateQuantity(product.uid, product.quantity);
      }, 1000);
    } else {
      updatedProduct.value = product.uid;
      askConfirmDelete();
    }
  }
};

const increaseQuantity = (product) => {
  canPlaceOrder.value = false;
  if(canUpdateOrder.value && (updatedProduct.value === null || updatedProduct.value === product.uid)) {
    updatedProduct.value = product.uid;
    product.quantity++;
    if(timeout.value) {
      clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(() => {
      updateQuantity(product.uid, product.quantity);
    }, 1000);
  }
};

const confirmDelete = () => {
  if(updatedProduct.value) {
    const deletedUid = updatedProduct.value;
    // Close the modal before making the request
    if(confirmModal.value) {
      confirmModal.value.closeConfirm();
    }
    
    router.post(route('delete_cart_item'), {
      uid: deletedUid,
    }, {
      preserveScroll: true,
      preserveState: false,
      onSuccess: (page) => {
        // Update localProducts from the new props
        updateLocalProducts();
      },
      onError: (error) => {
        console.log(error);
      }
    });
  }
};

const closeConfirm = () => {
  updatedProduct.value = null;
};

watch(useGiftCard, (newValue) => {
  if (!newValue) {
    GiftCardNumber.value = '';
  }
});


const editingNote = ref('');

const selectedNote = ref('');

const editNote = (uid, note) => {
  editingNote.value = uid;
  selectedNote.value = note;
};

const closeEditNote = () => {
  editingNote.value = '';
  selectedNote.value = '';
};

const local_errors = ref({});

const saveNote = () => {
    local_errors.value = {};
    router.post(route('update_note', {item: editingNote.value}), {
      note: selectedNote.value,
    }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closeEditNote();
          updateLocalProducts();
        },
        onError: (error) => {
            local_errors.value = props.errors;
        }
    });
};

onMounted(() => {
  nextTick(() => {
    timeslots.value = { ...props.available_times };
    closedDates.value = props.closed_dates;
    updateLocalProducts();
    enteredName.value = props.full_name;
    enteredEmail.value = props.email;
    enteredPhone.value = props.phone;
    orderNotes.value = props.order_notes;
  });
});

// Watch for changes in order_items prop to keep localProducts in sync
watch(() => props.order_items, () => {
  updateLocalProducts();
}, { deep: true });

const calendarTargetRef = ref(null);

// Helper function to check if item has event_menu_category with pickup date range
const hasPickupDateRange = (item) => {
  if (!item?.event_menu_category) return false;
  const category = item.event_menu_category;
  return category.pickup_start_date != null && category.pickup_end_date != null;
};

// Helper function to format pickup date range
const formatPickupDateRange = (item) => {
  if (!hasPickupDateRange(item)) return '';
  const category = item.event_menu_category;
  const startDate = new Date(category.pickup_start_date);
  const endDate = new Date(category.pickup_end_date);
  
  const formatDate = (date) => {
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

// Helper function to check if a date is within a specific item's pickup date range
const isDateWithinItemRange = (dateString, item) => {
  if (!hasPickupDateRange(item) || !dateString) return true; // No restriction or no date selected
  
  const category = item.event_menu_category;
  const [month, day, year] = dateString.split('/').map(Number);
  const selectedDate = new Date(year, month - 1, day);
  selectedDate.setHours(0, 0, 0, 0);
  
  const startDate = new Date(category.pickup_start_date);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(category.pickup_end_date);
  endDate.setHours(0, 0, 0, 0);
  
  return selectedDate >= startDate && selectedDate <= endDate;
};

// Check if selected date is valid for all items with pickup date ranges
const isSelectedDateValidForAllItems = computed(() => {
  // Check if any items have pickup date ranges
  const itemsWithDateRange = localProducts.value.filter(item => hasPickupDateRange(item));
  
  // If no items have date range restrictions, always return true (no validation needed)
  if (itemsWithDateRange.length === 0) return true;
  
  // If items have date ranges but no date selected, return false
  if (!selectedDate.value) return false;
  
  // Check if selected date is within range for all items with date ranges
  return itemsWithDateRange.every(item => isDateWithinItemRange(selectedDate.value, item));
});

</script>

<template>

  <Head title="Cart"></Head>


  <WrapperFull wrapper="section">
    <Wrapper wrapper="section">
      <div class="pt-10">
        <div>
          <div class="flex justify-center">
            <div class="text-center">
              <Header>Cart</Header>
            </div>
          </div>
        </div>

        <div v-if="localProducts.length > 0">
          <!-- order section -->

          <div>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <!-- column 1 -->
              <div class="col-span-3">
                <div v-for="product in localProducts">                  
                
                  <v-card color="grey-lighten-3" class="px-4 pt-4 pb-2 my-4" rounded="lg">
                    <div class="lg:flex flex-row gap-10">
                      <div class="shrink-0" style="width: 60px;">
                        <img :src="product.thumbnail" alt="">
                        <div style="height: 10px;" class="block lg:hidden"></div>
                      </div>
                      <div class="grow">
                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 h-full">
                          <div class="col-span-2 lg:col-span-1 h-full flex items-center">
                            <div>
                              <p class="font-bold">{{ product.product_name }}</p>
                              <p>{{ product.variation_name }}</p>
                              <template v-if="product.weekend_only">
                                <div class="mt-1">
                                  <v-chip size="x-small" variant="outlined">Week-end only</v-chip>
                                </div>
                              </template>
                            </div>
                          </div>
                          <div class="h-full flex items-center lg:justify-center lg:text-center">
                            <div>
                              <p class="text-sm">Price</p>
                              <p>{{ product.variation_price }}</p>
                            </div>
                          </div>
                          <div class="h-full flex flex-row items-center lg:justify-center lg:text-center">
                            <div>
                              <p class="text-sm">Quantity</p>
                              <v-btn
                                  @click.prevent="reduceQuantity(product)"
                                  color="grey-lighten-3" size="small" class="px-0" style="width: 30px;" icon="mdi-minus"></v-btn>
                              <v-btn color="grey-lighten-3" class="px-0" style="width: 30px;">{{ product.quantity }}</v-btn>
                              <v-btn
                                  @click.prevent="increaseQuantity(product)"
                                  color="grey-lighten-3" size="small" class="px-0" style="width: 30px;" icon="mdi-plus"></v-btn>
                            </div>
                          </div>
                          <div class="h-full flex items-center lg:justify-end lg:text-end">
                            <div>
                              <p class="text-sm">Total</p>
                              <p>{{ product.amount }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <template v-if="hasPickupDateRange(product)">
                      <div class="pt-2 pb-0">
                        <hr style="border: solid 1px #ccc;" />
                      </div>
                      <div class="flex flex-row items-center gap-2 pt-2 pb-2">                       
                        <v-alert type="warning" variant="tonal" density="compact" class="text-xs flex-grow">
                          Sorry, this item is available for pickup only from {{ formatPickupDateRange(product) }}
                        </v-alert>
                      </div>
                    </template>
                    <template v-if="product?.variation?.product?.allow_client_note??false">
                      <div class="pt-2 pb-0">
                        <hr style="border: solid 1px #ccc;" />
                      </div>
                      <div class="flex flex-row justify-center">
                        <div class="w-full pt-3 pb-2">

                          <div class="flex flex-row items-center justify-between mb-2">
                            <div>
                              <p class="text-sm">Note (optional)</p>
                            </div>
                            <div>
                              <v-btn
                                  @click.prevent="editNote(product.uid, product.client_note)"
                                  size="x-small" color="grey">Edit note</v-btn>
                            </div>
                          </div>
                          <div>
                            <template v-if="editingNote === product.uid">
                              <v-textarea rows="1" auto-grow v-model="selectedNote" variant="solo" flat bg-color="white" hide-details />
                              <div class="flex flex-row items-center justify-center gap-2 mt-2">
                                <div>
                                  <v-btn
                                      @click.prevent="saveNote"
                                      size="small" color="green">Save</v-btn>
                                </div>
                                <div>
                                  <v-btn
                                      @click.prevent="closeEditNote"
                                      size="small" color="grey">Cancel</v-btn>
                                </div>
                              </div>
                            </template>
                            <template v-else>
                              <v-textarea rows="1" auto-grow :model-value="product.client_note" variant="solo" flat bg-color="grey-lighten-2" hide-details readonly />
                            </template>
                          </div>
                        </div>
                      </div>
                    </template>
                  </v-card>
                </div>

                <div class="w-full" v-if="false">
                  <Col>
                    <v-textarea
                        label="Order notes"
                        v-model="orderNotes"
                        rows="4" auto-grow />
                  </Col>
                </div>

                <div class="max-w-sm mx-auto">
                  <div class="flex flex-row justify-center mt-10">
                    <p class="text-2xl">Total: {{ props.total_amount }}</p>
                  </div>
                  <div
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
                            :disabled="props.is_auth"
                            :readonly="props.is_auth"
                            v-model="enteredEmail" :error-messages="errors.email" />
                      </div>
                      <div class="w-full text-center mt-5">
                        <v-label class="mb-2">Your phone number</v-label>
                        <v-text-field v-model="enteredPhone" :error-messages="errors.phone" />
                      </div>
                    </div>
                  </div>
                  <template v-if="false">
                    <div class="flex flex-row justify-center mt-10">
                      <v-checkbox v-model="useGiftCard" label="Use a gift card"></v-checkbox>
                    </div>
                    <div v-if="useGiftCard" class="flex flex-row justify-center py-5">
                      <v-card color="grey-lighten-4" rounded="xl">
                        <div class="p-5">
                          <div class="w-full text-center">
                            <v-label>Enter your gift card's code</v-label>
                            <v-text-field
                                v-model="GiftCardNumber"
                                @keyup="typeNumber"
                                density="compact"
                                class="w-full"
                                hint="The email address associated with the gift card must match the email address associated with this order. Please contact support if you need assistance."
                                :error-messages="errors.number"
                                persistent-hint
                            >
                              <template #append-inner>
                                <v-btn
                                    @click.prevent="verifyGiftCard"
                                    variant="plain">Verify</v-btn>
                              </template>
                            </v-text-field>
                            <div class="mt-5">
                              <div class="my-5">
                                <p :class="`text-${giftCardMessageColor}`">{{ giftCardMessage }}</p>
                              </div>
                              <v-table class="bg-grey-lighten-2">
                                <tbody>
                                <tr>
                                  <td class="text-start">Amount to be paid via gift card</td>
                                  <td class="text-end">${{ amountPaidViaGiftCardFormatted }}</td>
                                </tr>
                                <tr v-if="remainderToPay > 0">
                                  <td class="text-start">Remainder to pay</td>
                                  <td class="text-end">${{ remainderToPayFormatted }}</td>
                                </tr>
                                </tbody>
                              </v-table>
                            </div>
                          </div>
                        </div>
                      </v-card>
                    </div>
                  </template>
                  <div class="flex flex-row justify-center mt-10">
                    <v-btn
                        :disabled="isOrdering"
                        class="rounded-pill"
                        v-if="canPlaceOrder && (dateTimeSet && isSelectedDateValidForAllItems && (!useGiftCard || (useGiftCard && giftCardVerified)))"
                        @click.prevent="checkout"
                    >{{ isOrdering ? 'Processing' : 'Place order'}}</v-btn>

                    <div v-else class="text-center">
                      <v-btn
                          :disabled="isOrdering"
                          class="rounded-pill"
                          color="grey-darken-1"
                          variant="tonal"
                      >
                        {{ isOrdering ? 'Processing' : 'Place order'}}
                      </v-btn>
                      <p v-if="!dateTimeSet" class="mt-5 text-red">Please select a date and time for pickup</p>
                      <p v-if="dateTimeSet && !isSelectedDateValidForAllItems" class="mt-5 text-red">Selected date is outside the allowed pickup date range for some items</p>
                      <p v-if="useGiftCard && !giftCardVerified" class="text-red">Please verify your gift card number</p>
                    </div>
                  </div>

                  <template v-if="errors?.msg??false">
                    <Row :center="true" justify="center" class="py-5">
                      <template v-for="error in errors.msg">
                        <p class="font-bold text-red">{{error}}</p>
                      </template>
                    </Row>
                  </template>

                </div>
              </div>
              <!-- end column 1 -->
              <!-- column 2 -->
              <div>
                <v-card color="grey-lighten-3" class="px-4 py-4 my-4" rounded="lg">
                  <v-card-item>
                    <div class="flex flex-col gap-3">
                      <div>
                        <p class="text-sm font-bold">Pick up address:</p>
                        <div>
                          <p>{{ props.settings.our_address_1 }}</p>
                          <template v-if="props.settings.our_address_2">
                            <p>{{ props.settings.our_address_2 }}</p>
                          </template>
                          <p>{{ props.settings.our_city_postcode }}</p>
                        </div>
                      </div>
                      <div>
                        <p class="text-sm">Date &amp; time:</p>
                        <p v-if="selectedDate && selectedTime" class="text-black font-bold">{{ selectedDate }}<br>at {{ selectedTime }}</p>
                        <p v-else-if="selectedDate"><strong>{{ selectedDate }}</strong><br><span class="text-red">(time not set)</span></p>
                        <p v-else-if="selectedTime"><strong>{{ selectedTime }}</strong><br><span class="text-red">(date not set)</span></p>
                        <p v-else class="text-red">Not set</p>
                        <div class="mt-2">
                          <v-btn
                              @click.prevent="openPickup"
                              :color="dateTimeSet ? 'grey' : 'black'"
                              prepend-icon="mdi-calendar">Date &amp; time</v-btn>
                        </div>
                      </div>
                    </div>
                  </v-card-item>
                </v-card>
              </div>
              <!-- end column 2 -->
            </div>
          </div>

          <!-- end order section -->
        </div>
        <div v-else>
          <div class="my-4">
            <div class="flex justify-center">
              <div class="text-center">
                <p>Your cart is empty at the moment.</p>
                <div>
                  Why not visit our menu page?
                  <div class="mt-5">
                    <div class="flex flex-row justify-center gap-3">
                      <v-btn
                          color="grey-darken-1"
                          @click.prevent="$inertia.visit(route('catering_menu'))"
                      >View menu</v-btn>
                      <v-btn
                          v-if="$page.props.auth.user"
                          color="black"
                          @click.prevent="$inertia.visit(route('orders'))"
                      >Order history</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Wrapper>

  </WrapperFull>

  <DialogModal
      :show="showPickupModal"
      @close="closePickup"
  >
    <template #title>
      {{ modalTitle }}
    </template>
    <template #content>

      <!-- Display products with date range limitation - only show if all items have event_menu_category_uid -->
      <div v-if="props.all_items_have_event_menu_category_uid && props.products_with_date_range && props.products_with_date_range.length > 0" class="mb-4">
        <v-alert type="info" variant="tonal" class="mb-3">
          <div class="text-sm">
            <p class="font-bold mb-2">The following products have date pickup range limited:</p>
            <ul class="list-disc list-inside">
              <li v-for="productName in props.products_with_date_range" :key="productName">
                {{ productName }}
              </li>
            </ul>
          </div>
        </v-alert>
      </div>

      <div class="text-center">
        <p class="text-lg font-bold text-black">Pick a date</p>
      </div>
      <div ref="carousel" class="carousel w-full mb-3">
        <div v-for="quick_day in props.quick_days" class="carousel-cell m-1">
          <div class="p-1 h-full">
            <v-card
                @click.prevent="isDateWithinRange(quick_day.selection) && selectDate(quick_day)"
                elevation="3" class="h-full"
                :color="selectedDate === quick_day.selection ? '#000000' : (isDateWithinRange(quick_day.selection) ? '#f99c19' : '#cccccc')"
                :style="{ cursor: isDateWithinRange(quick_day.selection) ? 'pointer' : 'not-allowed', opacity: isDateWithinRange(quick_day.selection) ? 1 : 0.5 }"
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
          minDate: minPickupDate,
          maxDate: maxPickupDate,
          disable: closedDates,
          ...(props.is_weekend_only && {
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

    </template>
    <template #footer>
      <SecondaryButton
          @click="closePickup"
      >Close</SecondaryButton>
    </template>
  </DialogModal>

  <ConfirmModal ref="confirmModal"
                title="Are you sure you want to delete this item?"
                text="Delete item"
                @confirm="confirmDelete" @close="closeConfirm" />
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
