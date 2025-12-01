<script setup>

import ScreenModal from "@/Components/ScreenModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {computed, nextTick, reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  details: Object,
});

const localDetails = ref({});

// landing
const showLandingModal = ref(false);
const selectedLanding = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);
const nameInput = ref(null);

const newsletterEmail = ref('');
const subscribed = ref('');

const formLanding = reactive({});
const openLanding = () => {
  localDetails.value = {...props.details};
  subscribed.value = '';
  showLandingModal.value = true;
};

const closeLanding = () => {
  axios.post(route('dismiss_landing_modal'), {})
      .then(response => {
        showLandingModal.value = false;
      })
      .catch(error => {
          console.error('error');
      });
};

const newsletterSubscribe = () => {
  router.post(route('newsletter_subscribe'), {
    email: newsletterEmail.value,
  }, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      subscribed.value = 'success';
    },
    onError: (error) => {
      subscribed.value = 'error';
      local_errors.value = props.errors;
    }
  });
};

const getButtonColor = computed(() => {
  if(subscribed.value) {
    if(subscribed.value === 'success') {
      return 'success';
    } else {
      return 'error';
    }
  } else {
    return '#f99c19';
  }
});

//end landing

defineExpose({ openLanding });

</script>

<template>

  <ScreenModal
        :show="showLandingModal"
        @close="closeLanding"
        maxWidth="6xl"
    >

      <template #content>

  <template v-if="localDetails">
    <v-img
        :src="`/storage/assets/images/landing/${localDetails.image}`"
        aspect-ratio="2" color="black"
        cover
        :gradient="`to bottom, rgba(0,0,0,${localDetails.opacity}), rgba(0,0,0,${localDetails.opacity})`"
        class="text-white align-center text-center p-10"
    >
     <Col>


       <template v-if="localDetails.title_top">
         <p class="text-4xl" v-html="localDetails.title_top_formatted" />
       </template>

       <template v-if="localDetails.content_top">
         <p class="text-xl py-2" v-html="localDetails.content_top_formatted" />
       </template>


       <template v-if="localDetails.title_bottom">
         <p class="text-4xl" v-html="localDetails.title_bottom_formatted" />
       </template>

       <template v-if="localDetails.content_bottom">
         <p class="text-xl" v-html="localDetails.content_bottom_formatted" />
       </template>

       <div class="max-w-lg w-full my-3 mx-auto" v-if="localDetails.show_newsletter_form">
         <div>
           <v-card style="background: rgba(0,0,0,0.7);" rounded="lg">
             <div class="px-7 py-3">
               <p class="text-white text-lg my-2">{{ $page.props.lmt }}</p>
               <template v-if="false">
                 <v-text-field
                     v-model="newsletterEmail"
                     @keydown.enter="newsletterSubscribe"
                     variant="solo" rounded="0" />
                 <template v-if="subscribed">
                   <template v-if="subscribed === 'success'">
                     <p class="text-success mb-5">Your request has been received, please check your inbox!</p>
                   </template>
                   <template v-if="subscribed === 'error'">
                     <p class="text-error mb-5">An error occurred, please double-check your email address</p>
                   </template>
                 </template>
                 <v-btn
                     @click.prevent="newsletterSubscribe"
                     :color="getButtonColor"
                 >Subscribe</v-btn>
               </template>
               <template v-else>

                 <div class="my-2">
                   <v-btn
                       href="https://www.toasttab.com/le-petit-four-bakery-380-washington-street/marketing-signup"
                       :color="getButtonColor" target="_blank"
                   >Subscribe</v-btn>
                 </div>

               </template>
             </div>
           </v-card>
         </div>
       </div>

       <div class="mt-5">
           <v-btn
               @click.prevent="closeLanding"
               color="white" size="small" prepend-icon="mdi-close">Dismiss</v-btn>
       </div>
     </Col>


    </v-img>
  </template>

      </template>

    </ScreenModal>

</template>
