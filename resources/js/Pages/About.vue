<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head} from "@inertiajs/vue3";
import Wrapper from "@/Components/Wrapper.vue";
import Header from "@/Components/Header.vue";
import WrapperFull from "@/Components/WrapperFull.vue";

const isotope = ref(null);
import Flickity from "flickity";
import 'flickity/css/flickity.css';
import imagesLoaded from "imagesloaded";
import {formatTitle,linkOutcome} from "@/utils.js";

import {onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import NavLink from "@/Components/NavLink.vue";

const props = defineProps({
  content: Object,
  meta_description: { type: String, default: '' },
  is_production: { type: Boolean, default: false },
});

defineOptions({ layout: AppLayout });

const launchAnimation = () => {
  gsap.to(".hero-image", {
    duration: 8,
    scrollTrigger: {
      start: "top 20%",
      end: () => `+=${document.querySelector('.hero-wrapper').offsetHeight - document.querySelector('.hero-image').offsetHeight}`,
      scrub: 4,
      pin: ".hero-image",
      pinSpacing: false,
      toggleActions: "restart none none none",
    },
  });
};

const carousel = ref(null);
const monthCreationImages = ref([
  'monthly-1.jpg','monthly-2.jpg','monthly-3.jpg','monthly-4.jpg','monthly-5.jpg',
]);

onMounted(() => {
  //carousel
  if(monthCreationImages.value.length) {
    imagesLoaded(carousel.value, function() {
      new Flickity(carousel.value, {
        cellAlign: 'center',
        contain: true,
        pageDots: false,
        prevNextButtons: false,
        wrapAround: true,
        autoPlay: true,
      });
    });
  }
  //end carousel
})


</script>

<template>

  <Head>
    <title>La Boutique</title>
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
          <p v-html="props.content.introduction" />
        </template>
      </Header>
    </Wrapper>

  <WrapperFull wrapper="section">

    <Wrapper>

      <div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

          <template v-for="module in 9">
            <div :class="`xl:col-span-${props.content[`module_${module}_size`]}`">
              <v-card color="grey-lighten-3" rounded="lg">
                <a :href="props.content[`module_${module}_button_link`]??'#'"
                   :target="linkOutcome(props.content[`module_${module}_button_link`]??'#','_self','_blank')"
                >
                  <v-img
                      height="350px"
                      class="align-end"
                      :src="`/images/content/${props.content[`module_${module}_image`]??'empty.png'}`"
                      :gradient="`${props.content[`module_${module}_button_link`] ? 'to bottom left, rgba(0,0,0,.1), rgba(0,0,0,.8)' : 'to bottom left, rgba(0,0,0,.08), rgba(0,0,0,.2)'}`"
                      cover
                  >
                    <div class="pb-3 text-white">
                      <v-card-title>{{ props.content[`module_${module}_title`]??'Coming soon' }}</v-card-title>
                      <v-card-subtitle
                          v-if="props.content[`module_${module}_button_link`]??false"
                      ><v-btn color="white" size="small" :append-icon="linkOutcome(props.content[`module_${module}_button_link`]??'#','','mdi-open-in-new')">{{ props.content[`module_${module}_button_text`]??'' }}</v-btn></v-card-subtitle>
                    </div>
                  </v-img>
                </a>
              </v-card>
            </div>
          </template>

        </div>
      </div>

    </Wrapper>

    <Wrapper class="mt-10">
      <div class="text-center">
        <h2 class="text-5xl uppercase mb-5" v-html="formatTitle(props.content.testimonials_title)" />
        <p v-html="props.content.testimonials_introduction" />
      </div>
      <div class="mt-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <template v-for="i in 3">
            <div>
              <v-img class="brand-bg text-white rounded-3xl">
                <div class="p-12">
                  <p class="mb-5 uppercase text-orange-lighten-4 font-bold">{{ props.content[`testimonial_${i}_name`] }}</p>
                  <div>
                    <p v-html="props.content[`testimonial_${i}_content`]" />
                  </div>
                </div>
              </v-img>
            </div>
          </template>
        </div>
      </div>
    </Wrapper>


  </WrapperFull>

  <Wrapper class="mt-10 pb-20" v-if="props.content.instructions_baked_goods_youtube_video_id">
    <div class="text-center">
      <h2 class="text-5xl uppercase" v-html="formatTitle(props.content.instructions_baked_goods_title)" />

      <v-card class="mt-10" rounded="xl">
        <v-img aspect-ratio="1.777">
          <iframe class="w-full h-full"
                  :src="`https://www.youtube.com/embed/${props.content.instructions_baked_goods_youtube_video_id}?modestbranding=1&rel=0&controls=1`"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen></iframe>
        </v-img>
      </v-card>
    </div>
  </Wrapper>



</template>

<style scoped>

.carousel-cell {
  width: 33%;
  height: auto;
  margin-right: 10px;
  border-radius: 5px;
  counter-increment: gallery-cell;
}

.wp {
  white-space: normal;
}

</style>
