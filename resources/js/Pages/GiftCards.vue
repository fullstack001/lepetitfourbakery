<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head} from "@inertiajs/vue3";
import Wrapper from "@/Components/Wrapper.vue";
import Header from "@/Components/Header.vue";
import WrapperFull from "@/Components/WrapperFull.vue";
import {computed, reactive, ref} from "vue";
import Logo from "@/Components/Logo.vue";
const props = defineProps({});

defineOptions({ layout: AppLayout });

const showIframe = ref(true);

const selectedAmount = ref(20);

const amount = ref(20);

const customAmount = ref('');

const selectAmount = (value) => {
  typedAmount.value = '';
  selectedAmount.value = value;
  amount.value = value;
};

const typedAmount = ref('');

const enteredEmail = ref('');
const enteredPhone = ref('');

const recipientEmail = ref('');

const selectedRecipientEmail = computed(() => {
  const email = recipientEmail.value;
  const isValid = email.includes('@') && email.includes('.') &&
      email.indexOf('@') > 0 &&
      email.indexOf('.') - email.indexOf('@') > 2 &&
      email.length - email.indexOf('.') > 2;

  return isValid ? email : 'janedoe@example.com';
});

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

const typeAmount = (event) => {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
    return;
  }

  let value = typedAmount.value.replace(/[^0-9]/g, '').replace(/^0+/, '');
  value = (isNaN(value) || !value) ? 20 : value;
  value = (value > 1000 || value < 10) ? 20 : value;
  selectedAmount.value = value;
  amount.value = value;

  if (value.length > 0 || isNaN(typedAmount.value)) {
    typedAmount.value = value;
  }
};

const formattedAmount = computed(() => {
  return Number(selectedAmount.value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
});

const errors = reactive({});
const isOrdering = ref(false);

const checkout = () => {
  isOrdering.value = true;
  Object.keys(errors).forEach(key => delete errors[key]);
  axios.post(route('gift_card_checkout'),{
    recipient: recipientEmail.value,
    email: enteredEmail.value,
    amount: amount.value,
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


</script>

<template>

  <Head title="Gift cards"></Head>


  <Wrapper style="margin-top: 150px;">
    <Header>
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="text-6xl brand uppercase">Gift cards</h1>
        </div>
      </div>
      <template #description>
        <div class="max-w-3xl mx-auto">
          Welcome to our Gift Card page! Whether you're looking for the perfect present or want to give the gift of choice, our gift cards make it easy. Choose the amount, personalize your message, and send it instantly—ideal for any occasion!
        </div>
      </template>
    </Header>
    <div class="mt-20 mb-10">
      <div class="max-w-xl mx-auto rounded-xl overflow-hidden shadow-xl">
        <v-img
            gradient="to top left, rgba(255,255,255,0), rgba(255,255,255,.4)"
            aspect-ratio="1.7" color="#f99c19">
          <div class="w-full h-full flex flex-col justify-between p-10">
            <Logo />
            <p class="text-lg lg:text-3xl w-full">XXXX XXXX XXXX XXXX</p>
            <p class="text-md lg:text-2xl w-full">To: {{ selectedRecipientEmail }}</p>
            <p class="text-3xl lg:text-8xl w-full text-right">${{ selectedAmount }}</p>
          </div>
        </v-img>
      </div>
    </div>
    <div class="max-w-sm mx-auto mb-10">
      <div
          class="flex flex-row justify-center mt-0"
      >
        <div class="w-full">
          <div class="w-full text-center">
            <v-label class="mb-2">Recipient's email address</v-label>
            <v-text-field v-model="recipientEmail" :error-messages="errors.recipient" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center items-center gap-3">
      <v-btn
          @click.prevent="selectAmount(10)"
          style="height: 40px;" size="large" :variant="selectedAmount === 10 ? 'flat' : 'outlined'">10</v-btn>
      <v-btn
          @click.prevent="selectAmount(20)"
          style="height: 40px;" size="large" :variant="selectedAmount === 20 ? 'flat' : 'outlined'">20</v-btn>
      <v-btn
          @click.prevent="selectAmount(50)"
          style="height: 40px;" size="large" :variant="selectedAmount === 50 ? 'flat' : 'outlined'">50</v-btn>
      <v-btn
          @click.prevent="selectAmount(100)"
          style="height: 40px;" size="large" :variant="selectedAmount === 100 ? 'flat' : 'outlined'">100</v-btn>
      <div style="width: 160px; height: 40px;">
        <v-text-field
            @keyup="typeAmount($event)"
            v-model="typedAmount"
            density="compact" label="Custom amount" style="width: 100% !important; height: 100% !important;" hide-details />
      </div>
    </div>
    <div class="max-w-sm mx-auto">
      <div class="flex flex-row justify-center mt-10">
        <p class="text-2xl">Total: ${{ formattedAmount }}</p>
      </div>
      <div
          v-if="!$page.props.auth.user"
          class="flex flex-row justify-center mt-10"
      >
        <div class="w-full">
          <div class="w-full text-center">
            <v-label class="mb-2">Your email address</v-label>
            <v-text-field v-model="enteredEmail" :error-messages="errors.email" hint="Your e-mail address is necessary to check out as a guest" persistent-hint />
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-center mt-10">
        <v-btn
            :disabled="isOrdering"
            class="rounded-pill"
            @click.prevent="checkout"
        >{{ isOrdering ? 'Processing' : 'Place order'}}</v-btn>
      </div>
    </div>
  </Wrapper>



</template>