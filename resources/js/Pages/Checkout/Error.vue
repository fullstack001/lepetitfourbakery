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

  <Head title="Error"></Head>


  <WrapperFull wrapper="section" background="#f3c7a8">

    <Wrapper wrapper="section">
      <div class="w-full p-20 text-center" style="color: #692222;">
        <div class="py-20">
          <p class="text-3xl font-bold mb-4">An error occurred</p>
          <p class="text-xl">Please try again later or contact Support if you need assistance.</p>
        </div>
      </div>

    </Wrapper>

  </WrapperFull>

</template>