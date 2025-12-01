<script setup>
import TeamLayout from '@/Layouts/TeamLayout.vue';
import {Head} from "@inertiajs/vue3";
import {ref} from "vue";
const props = defineProps({
  dates: Object,
  special_products: Object,
});

const title = ref('Dashboard');

</script>

<template>

  <TeamLayout title="Bakery">

    <div class="flex flex-col items-center gap-10 w-full">
      <div v-for="(items, date) in props.dates" class="w-full">
        <p class="mb-2 text-2xl font-bold">{{ date }}</p>
        <div class="max-w-7xl flex flex-col gap-3 w-full bg-blue-grey-lighten-3 p-3">
          <div v-for="item in items" class="grid grid-cols-1 lg:grid-cols-3 bg-blue-grey-lighten-2 p-3">
            <div>
              <p class="text-black font-normal">{{ item.product_name }}</p>
            </div>
            <div>
              <p class="text-black font-normal">{{ item.variation_name }}</p>
            </div>
            <div>
              <p class="text-black font-normal">{{ item.quantity }}</p>
            </div>
          </div>
        </div>
        <div v-if="date in props.special_products">
          <div class="my-2">
            <p class="mb-2 text-red-darken-3 font-bold">Amongst the items for {{ date }}, the following require a note to be added:</p>
            <v-card class="max-w-7xl" color="grey-lighten-3">
              <div class="p-3 flex flex-col gap-3">
                <template v-for="item in props.special_products[date]">
                  <div>
                    <div class="grid grid-cols-4 gap-0 items-center">
                      <div class="col-span-2 lg:col-span-1 h-full">
                        <div class="p-2 bg-grey-lighten-1 h-full">
                          <p class="font-bold text-grey-darken-2">Order:</p>
                        <p class="text-black">{{ item.number }}</p>
                      </div>
                      </div>
                      <div class="col-span-2 lg:col-span-1 h-full">
                        <div class="p-2 bg-grey-lighten-1 h-full">
                          <p class="font-bold text-grey-darken-2">Item:</p>
                        <p class="text-black">{{ item.product }} ({{ item.variation }})</p>
                      </div>
                      </div>
                      <div class="col-span-4 lg:col-span-2 h-full">
                        <div class="p-2 bg-grey-lighten-1 h-full">
                          <p class="font-bold text-grey-darken-2">Note:</p>
                          <p class="text-black" v-html="item.note" />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </div>

  </TeamLayout>

</template>
