<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import HomepageModal from "@/Components/Content/HomepageModal.vue";
import AboutModal from "@/Components/Content/AboutModal.vue";
import CateringModal from "@/Components/Content/CateringModal.vue";
import SubscriptionModal from "@/Components/Content/SubscriptionModal.vue";
import ContactModal from "@/Components/Content/ContactModal.vue";
import LandingModal from "@/Components/Content/LandingModal.vue";
import {ref} from "vue";

const props = defineProps({
  homepage_content: Object,
  about_content: Object,
  catering_content: Object,
  subscription_content: Object,
  contact_content: Object,
  landing_content: Object,
  errors: Object,
});

const homepageModal = ref(null);
const aboutModal = ref(null);
const cateringModal = ref(null);
const subscriptionModal = ref(null);
const contactModal = ref(null);
const landingModal = ref(null);

</script>

<template>
  <AdmLayout title="Content">

    <Col gap="4">
      <div>
        <v-btn @click.prevent="homepageModal.openContent()">Homepage</v-btn>
      </div>
      <div>
        <v-btn @click.prevent="aboutModal.openContent()">La boutique</v-btn>
      </div>
      <div>
        <v-btn @click.prevent="cateringModal.openContent()">Catering menu</v-btn>
      </div>
      <div>
        <v-btn @click.prevent="subscriptionModal.openContent()">Subscription</v-btn>
      </div>
      <div>
        <v-btn @click.prevent="contactModal.openContent()">Contact us</v-btn>
      </div>
      <div>
        <v-btn @click.prevent="landingModal.openContent()">Modal window</v-btn>
      </div>
    </Col>

    <HomepageModal
        ref="homepageModal"
        :content="props.homepage_content"
        :errors="props.errors"/>
    <AboutModal
        ref="aboutModal"
        :content="props.about_content"
        :errors="props.errors"/>
    <CateringModal
        ref="cateringModal"
        :content="props.catering_content"
        :errors="props.errors"/>
    <SubscriptionModal
        ref="subscriptionModal"
        :content="props.subscription_content"
        :errors="props.errors"/>
    <ContactModal
        ref="contactModal"
        :content="props.contact_content"
        :errors="props.errors"/>
    <LandingModal
        ref="landingModal"
        :content="props.landing_content"
        :errors="props.errors"/>

  </AdmLayout>
</template>
