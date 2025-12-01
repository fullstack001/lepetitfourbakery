<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head, router} from "@inertiajs/vue3"
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import Grid from "@/Components/Grid.vue";
import {onMounted, reactive, ref, watch} from "vue";

const props = defineProps({
  settings: Object,
  errors: Object,
});

const addressForm = reactive({});
const pickupHoursForm = reactive({});
const openingTimesForm = reactive({});
const futureHoursForm = reactive({});
const timeRangeForm = reactive({});
const productsSoldForm = reactive({});
const boardScriptForm = reactive({});
const metaTagsForm = reactive({});

const local_errors = ref({});

const saveAddress = () => {
  local_errors.value = {};
  router.post(route('admin.update_settings_address'), addressForm, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {

    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};

const savePickupHours = () => {
  local_errors.value = {};
  router.post(route('admin.update_pickup_hours'), pickupHoursForm, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {

    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};

const saveFuturePickupDayCount = () => {
  local_errors.value = {};
  router.post(route('admin.update_future_pickup_day_count'), futureHoursForm, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {

    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};

const saveOpeningTimes = () => {
  local_errors.value = {};
  router.post(route('admin.update_opening_times'), openingTimesForm, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {

    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};

const saveMetaTags = () => {
  local_errors.value = {};
  router.post(route('admin.update_meta_tags'), metaTagsForm, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {

    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};

const saveProductsSold = () => {
  local_errors.value = {};
    router.post(route('admin.update_products_sold'), productsSoldForm, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {

        },
        onError: (error) => {
            local_errors.value = props.errors;
        }
    });
};


const timeRange = ref([9,14]);
const saveTimeRange = () => {
  timeRangeForm.pickup_opening_hour = timeRange.value[0];
  timeRangeForm.pickup_closing_hour = timeRange.value[1];
  router.post(route('admin.update_time_range'), timeRangeForm, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (page) => {

      },
      onError: (error) => {
          local_errors.value = props.errors;
      }
  });
};

const saveBoardScript = () => {
    router.post(route('admin.update_board_script'), boardScriptForm, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {

        },
        onError: (error) => {
            local_errors.value = props.errors;
        }
    });
};

onMounted(() => {
  addressForm.our_address_1 = props.settings.our_address_1;
  addressForm.our_address_2 = props.settings.our_address_2;
  addressForm.our_city_postcode = props.settings.our_city_postcode;
  addressForm.our_phone_number = props.settings.our_phone_number;
  //
  pickupHoursForm.min_hours_before_pickup = props.settings.min_hours_before_pickup;
  //
  futureHoursForm.future_pickup_day_count = props.settings.future_pickup_day_count;
  //
  timeRange.value = [
    props.settings.pickup_opening_hour,
    props.settings.pickup_closing_hour
  ];
  timeRangeForm.interval_minutes = props.settings.interval_minutes;
  timeRangeForm.max_orders_per_slot = props.settings.max_orders_per_slot;
  //
  openingTimesForm.monday_opening_times = props.settings.monday_opening_times;
  openingTimesForm.tuesday_opening_times = props.settings.tuesday_opening_times;
  openingTimesForm.wednesday_opening_times = props.settings.wednesday_opening_times;
  openingTimesForm.thursday_opening_times = props.settings.thursday_opening_times;
  openingTimesForm.friday_opening_times = props.settings.friday_opening_times;
  openingTimesForm.saturday_opening_times = props.settings.saturday_opening_times;
  openingTimesForm.sunday_opening_times = props.settings.sunday_opening_times;
  //
  boardScriptForm.board_script_on = props.settings.board_script_on === 1;
  //
  metaTagsForm.meta_description_home = props.settings.meta_description_home;
  metaTagsForm.meta_description_boutique = props.settings.meta_description_boutique;
  metaTagsForm.meta_description_catering = props.settings.meta_description_catering;
  metaTagsForm.meta_description_contact = props.settings.meta_description_contact;
})

watch(metaTagsForm, (newValues) => {
  Object.keys(newValues).forEach((key) => {
    if (typeof newValues[key] === 'string') {
      metaTagsForm[key] = newValues[key].replace(/\n/g, ' ').replace('  ',' '); // Remove new lines
    }
  });
}, { deep: true });

</script>

<template>
  <AdmLayout title="Settings">

    <Grid cols="1" md="1" lg="2" xl="2" 2xl="2">
      <Col gap="4">

        <Col>
          <v-card color="grey-lighten-3" rounded="lg">
            <div class="p-4">
              <Col>
                <p class="text-xl">Edit store address</p>
                <p>(appears in order pickup notification)</p>
                <Col>
                  <v-label>Store name</v-label>
                  <v-text-field
                      v-model="addressForm.our_address_1"
                      :error-messages="local_errors.our_address_1"
                  />
                </Col>
                <Col>
                  <v-label>Address</v-label>
                  <v-text-field
                      v-model="addressForm.our_address_2"
                      :error-messages="local_errors.our_address_2"
                  />
                </Col>
                <Col>
                  <v-label>City and post code</v-label>
                  <v-text-field
                      v-model="addressForm.our_city_postcode"
                      :error-messages="local_errors.our_city_postcode"
                  />
                </Col>
                <Col>
                  <v-label>Phone number</v-label>
                  <v-text-field
                      v-model="addressForm.our_phone_number"
                      :error-messages="local_errors.our_phone_number"
                  />
                </Col>
                <div class="mt-2">
                  <v-btn @click.prevent="saveAddress">Update</v-btn>
                </div>
              </Col>
            </div>
          </v-card>
        </Col>

        <Col>
          <v-card color="grey-lighten-3" rounded="lg">
            <div class="p-4">
              <Col>
                <p class="text-xl">Minimum hours between order and pickup</p>
                <v-slider
                    v-model="pickupHoursForm.min_hours_before_pickup"
                    :error-messages="local_errors.min_hours_before_pickup"
                    min="0"
                    max="120"
                    :ticks="[0,24,48,72,96,120]"
                    show-ticks="always"
                    step="24"
                />
              </Col>
              <div class="mt-2">
                <v-btn @click.prevent="savePickupHours">Update</v-btn>
              </div>
            </div>
          </v-card>
        </Col>

        <Col>
          <v-card color="grey-lighten-3" rounded="lg">
            <div class="p-4">
              <Col>
                <p class="text-xl">Up to how many days in the future can users set up a pickup date</p>
                <v-label>Will effectively be 365 if empty</v-label>
                <v-text-field
                    v-model="futureHoursForm.future_pickup_day_count"
                    :error-messages="local_errors.future_pickup_day_count"
                />
              </Col>
              <div class="mt-2">
                <v-btn @click.prevent="saveFuturePickupDayCount">Update</v-btn>
              </div>
            </div>
          </v-card>
        </Col>

        <v-card color="grey-lighten-3" rounded="lg">
          <div class="p-4">
            <Col gap="10">
              <Col>
                <p class="text-xl">Hour range for pickup</p>
                <Col>
                  <div>
                    <template v-if="true">
                      <v-range-slider
                          min="6"
                          max="22"
                          v-model="timeRange"
                          :ticks="[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]"
                          show-ticks="always"
                          step="1"
                          strict />
                    </template>
                  </div>
                </Col>
              </Col>
              <Col>
                <p class="text-xl">Pickup interval (minutes)</p>
                <v-slider
                    v-model="timeRangeForm.interval_minutes"
                    min="5"
                    max="30"
                    :ticks="[5,10,15,20,25,30]"
                    show-ticks="always"
                    step="5"
                />
              </Col>
              <Col>
                <p class="text-xl">Max pickups per slot</p>
                <v-slider
                    v-model="timeRangeForm.max_orders_per_slot"
                    min="2"
                    max="20"
                    :ticks="[2,4,6,8,10,12,14,16,18,20]"
                    show-ticks="always"
                    step="2"
                />
              </Col>
              <div class="mt-2">
                <v-btn @click.prevent="saveTimeRange">Update</v-btn>
              </div>
            </Col>
          </div>
        </v-card>



      </Col>

      <Col gap="4">
        <Col>
            <v-card color="grey-lighten-3" rounded="lg">
                <div class="p-4">
                  <Col>
                    <p class="text-xl">Board script state</p>
                    <v-switch
                        inset color="green"
                        v-model="boardScriptForm.board_script_on"
                    />
                  </Col>
                  <div class="mt-2">
                    <v-btn @click.prevent="saveBoardScript">Update</v-btn>
                  </div>
                </div>
            </v-card>
        </Col>
        <Col>
          <v-card color="grey-lighten-3" rounded="lg">
            <div class="p-4">
              <Col>
                <p class="text-xl">Footer opening times</p>
                <Col>
                  <v-label>Monday (leave empty if closed)</v-label>
                  <p class="text-xs">Original value: empty</p>
                  <v-text-field
                      v-model="openingTimesForm.monday_opening_times"
                  />
                </Col>
                <Col>
                  <v-label>Tuesday (leave empty if closed)</v-label>
                  <p class="text-xs">Original value: 8:00am - Sold out</p>
                  <v-text-field
                      v-model="openingTimesForm.tuesday_opening_times"
                  />
                </Col>
                <Col>
                  <v-label>Wednesday (leave empty if closed)</v-label>
                  <p class="text-xs">Original value: 8:00am - Sold out</p>
                  <v-text-field
                      v-model="openingTimesForm.wednesday_opening_times"
                  />
                </Col>
                <Col>
                  <v-label>Thursday (leave empty if closed)</v-label>
                  <p class="text-xs">Original value: 8:00am - Sold out</p>
                  <v-text-field
                      v-model="openingTimesForm.thursday_opening_times"
                  />
                </Col>
                <Col>
                  <v-label>Friday (leave empty if closed)</v-label>
                  <p class="text-xs">Original value: 8:00am - Sold out</p>
                  <v-text-field
                      v-model="openingTimesForm.friday_opening_times"
                  />
                </Col>
                <Col>
                  <v-label>Saturday (leave empty if closed)</v-label>
                  <p class="text-xs">Original value: 8:30am - Sold out</p>
                  <v-text-field
                      v-model="openingTimesForm.saturday_opening_times"
                  />
                </Col>
                <Col>
                  <v-label>Sunday (leave empty if closed)</v-label>
                  <p class="text-xs">Original value: 8:30am - Sold out</p>
                  <v-text-field
                      v-model="openingTimesForm.sunday_opening_times"
                  />
                </Col>
              </Col>
              <div class="mt-2">
                <v-btn @click.prevent="saveOpeningTimes">Update</v-btn>
              </div>
            </div>
          </v-card>
        </Col>
        <v-card color="grey-lighten-3" rounded="lg">
            <div class="p-4">
                <Col>
                  <p class="text-xl">Meta descriptions</p>
                  <p class="text-xs">(recommended length: 150-160 characters)</p>

                  <!-- home -->
                  <Col>
                    <v-label
                    >Homepage<span
                        v-if="metaTagsForm.meta_description_home">&nbsp;{{metaTagsForm.meta_description_home.length}}/300</span></v-label>
                    <v-textarea
                        rows="2" auto-grow
                        @keydown.enter.prevent
                        v-model="metaTagsForm.meta_description_home"
                        :error-messages="local_errors.meta_description_home"
                    />
                  </Col>

                  <!-- boutique -->
                  <Col>
                    <v-label
                    >Boutique<span
                        v-if="metaTagsForm.meta_description_boutique">&nbsp;{{metaTagsForm.meta_description_boutique.length}}/300</span></v-label>
                    <v-textarea
                        rows="2" auto-grow
                        @keydown.enter.prevent
                        v-model="metaTagsForm.meta_description_boutique"
                        :error-messages="local_errors.meta_description_boutique"
                    />
                  </Col>

                  <!-- catering -->
                  <Col>
                    <v-label
                    >Catering<span
                        v-if="metaTagsForm.meta_description_catering">&nbsp;{{metaTagsForm.meta_description_catering.length}}/300</span></v-label>
                    <v-textarea
                        rows="2" auto-grow
                        @keydown.enter.prevent
                        v-model="metaTagsForm.meta_description_catering"
                        :error-messages="local_errors.meta_description_catering"
                    />
                  </Col>

                  <!-- contact -->
                  <Col>
                    <v-label
                    >Contact<span
                        v-if="metaTagsForm.meta_description_contact">&nbsp;{{metaTagsForm.meta_description_contact.length}}/300</span></v-label>
                    <v-textarea
                        rows="2" auto-grow
                        @keydown.enter.prevent
                        v-model="metaTagsForm.meta_description_contact"
                        :error-messages="local_errors.meta_description_contact"
                    />
                  </Col>

                </Col>
              <div class="mt-2">
                <v-btn @click.prevent="saveMetaTags">Update</v-btn>
              </div>
            </div>
        </v-card>

      </Col>

    </Grid>


  </AdmLayout>
</template>
