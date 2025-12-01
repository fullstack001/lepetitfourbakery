<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head} from "@inertiajs/vue3";
import WrapperFull from "@/Components/WrapperFull.vue";
import Wrapper from "@/Components/Wrapper.vue";
const props = defineProps({});

defineOptions({ layout: AppLayout });

//VARIABLES

//FORMS

//FUNCTIONS

</script>

<template>

  <Head title="Success"></Head>


  <WrapperFull wrapper="section" background="#c4dcb5">

    <Wrapper wrapper="section">

      <div class="w-full p-20 text-center" style="color: #2C6922;">
        <div class="py-20">
          <p class="text-3xl font-bold mb-4">Your order has been successfully placed</p>
          <div class="mt-10">
            <v-btn
                @click.prevent="$inertia.visit(route('home'))"
                class="rounded-pill">Back to homepage</v-btn>
          </div>
        </div>
      </div>

    </Wrapper>

  </WrapperFull>

</template>