<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head} from "@inertiajs/vue3";
import WrapperFull from "@/Components/WrapperFull.vue";
import Wrapper from "@/Components/Wrapper.vue";
import ErrorMessage from "@/Components/ErrorMessage.vue";
const props = defineProps({
  status: { type: [String, Number], default: null },
  message: String,
});

defineOptions({ layout: AppLayout });

</script>

<template>

  <Head :title="status + ' ' + message"></Head>


  <WrapperFull>

    <Wrapper wrapper="section" background="#1f1f1f">

      <div class="flex items-center justify-center text-white py-20">
        <div class="text-center py-20">
          <div>


            <div v-if="status === 404">
              <ErrorMessage>
                <template #title>You appear to be lost</template>
                The page you are looking for doesn't exist.
              </ErrorMessage>
            </div>
            <div v-else-if="status === 401">
              <ErrorMessage>
                <template #title>Unauthorized</template>
                Sorry, you are not allowed to visit this page.
              </ErrorMessage>
            </div>
            <div v-else-if="status === 403">
              <ErrorMessage>
                <template #title>Forbidden</template>
                Sorry, you can't visit this page.
              </ErrorMessage>
            </div>
            <div v-else-if="status === 419">
              <ErrorMessage>
                <template #title>Page Expired</template>
                Please refresh the page and try again.
              </ErrorMessage>
            </div>
            <div v-else-if="status === 429">
              <ErrorMessage>
                <template #title>Too Many Requests</template>
                Don't hesitate to contact us if you need assistance.
              </ErrorMessage>
            </div>
            <div v-else-if="status === 503">
              <ErrorMessage>
                <template #title>Service Unavailable</template>
                Don't hesitate to contact us if you need assistance.
              </ErrorMessage>
            </div>
            <div v-else>
              <ErrorMessage>
                <template #title>An unknown error occurred.</template>
                Don't hesitate to contact us if you need assistance.
              </ErrorMessage>
            </div>


          </div>
          <div class="mt-10">
            <v-btn
                @click.prevent="$inertia.visit(route('home'))"
                variant="flat" color="white">Back to homepage</v-btn>
          </div>
        </div>
      </div>

    </Wrapper>

  </WrapperFull>
  

</template>