<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import Wrapper from "@/Components/Wrapper.vue";
import Header from "@/Components/Header.vue";
import {nextTick, onMounted, reactive, ref} from "vue";
import { useDisplay } from 'vuetify';
import {formatTitle,linkOutcome} from "@/utils.js";

const { mobile } = useDisplay();

const props = defineProps({
  content: Object,
  errors: Object,
  meta_description: { type: String, default: '' },
  is_production: { type: Boolean, default: false },
});

defineOptions({ layout: AppLayout });

const subjectOptions = ref([
  'Choose',
  'Order for a company',
  'Quote request for an event',
  'Potential partnership',
  'Press-related',
  'Order-related',
  'Job application',
]);

const selectedSubject = ref('Choose');

const form = reactive({});

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.phone = '';
  form.subject = 'Choose';
  form.message = '';
};

const local_errors = ref({});

onMounted(() => {
  nextTick(() => {
    resetForm();
  });
})

const sendButtonClass = ref('bg-black');
const sendButtonText = ref('Send message');

const updateSendButton = (action = 'reset') => {
  if(action === 'processing') {
    sendButtonClass.value = 'bg-black';
    sendButtonText.value = 'Sending...';
  } else if(action === 'success') {
    sendButtonClass.value = 'bg-green';
    sendButtonText.value = 'Message sent!';
  } else if(action === 'error') {
    sendButtonClass.value = 'bg-red';
    sendButtonText.value = 'Error';
  } else {
    sendButtonClass.value = 'bg-black';
    sendButtonText.value = 'Send message';
  }
};

const sendMessage = () => {
  local_errors.value = {};
  updateSendButton('processing');
  router.post(route('send_message'), form, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      updateSendButton('success');
      setTimeout(() => {
        updateSendButton();
        resetForm();
      }, 3000);
    },
    onError: (error) => {
      local_errors.value = props.errors;
      updateSendButton('error');
      setTimeout(() => {
        updateSendButton();
      }, 3000);
    }
  });
};

</script>

<template>

  <Head>
    <title>Contact Us</title>
    <meta
        v-if="props.meta_description"
        name="description" :content="props.meta_description">
    <meta name="robots" :content="(props.is_production??false)?'index, follow':'noindex, nofollow'">
  </Head>


  <Wrapper style="margin-top: 150px;">
    <Header>
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="text-6xl brand uppercase" v-html="formatTitle(props.content.title)" />
        </div>
      </div>
      <template #description>
        <p v-html="props.content.introduction"  />
      </template>
    </Header>
  </Wrapper>

  <Wrapper maxWidth="max-w-2xl">

    <div class="rounded-5xl overflow-hidden">
      <v-card color="grey-lighten-3">
        <div class="px-10 pt-10 pb-5">
          <div>
            <v-label>Name</v-label>
            <v-text-field variant="filled" color="white"
                          v-model="form.name"
                          :error-messages="local_errors.name"
            />
          </div>

          <div>
            <v-label>Email</v-label>
            <v-text-field variant="filled" color="white"
                          v-model="form.email"
                          :error-messages="local_errors.email"
            />
          </div>

          <div>
            <v-label>Phone</v-label>
            <v-text-field variant="filled" color="white"
                          v-model="form.phone"
                          :error-messages="local_errors.phone"
            />
          </div>

          <div>
            <v-label>Subject</v-label>
            <v-select variant="filled" bg-color="white"
                      v-model="form.subject"
                      :items="subjectOptions"
                      :error-messages="local_errors.subject"
            />
          </div>

          <div>
            <v-label>Message</v-label>
            <v-textarea variant="filled" bg-color="white"
                        v-model="form.message"
                        :error-messages="local_errors.message"
            />
          </div>
        </div>
      </v-card>
    </div>

    <div class="text-center mt-7">
      <div
          @click.prevent="sendMessage"
          class="cursor-pointer inline-block rounded-pill p-7 py-3 text-xl px-lg-5 py-lg-2 text-lg-lg" :class="sendButtonClass">{{sendButtonText}}</div>
    </div>


  </Wrapper>



</template>
