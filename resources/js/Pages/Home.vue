<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head} from "@inertiajs/vue3";
import Wrapper from "@/Components/Wrapper.vue";
import {computed, ref} from "vue";
import ProductModal from "@/Components/CartProductModal.vue";
import WrapperFull from "@/Components/WrapperFull.vue";
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import NavButton from "@/Components/NavButton.vue";
import {formatTitle} from "@/utils.js";

gsap.registerPlugin(ScrollToPlugin);

const props = defineProps({
  content: Object,
  products: Object,
  meta_description: { type: String, default: '' },
  is_production: { type: Boolean, default: false },
});

defineOptions({ layout: AppLayout });

const productModal = ref(null);

const personSelected = ref('valerie');

const getPersonColor = (name) => {
  return name === personSelected.value ? 'bg-black' : 'bg-white';
};

const teamSection = ref(null);

const selectPerson = (name) => {
  personSelected.value = name;
  setTimeout(() => {
    gsap.to(window, {
      scrollTo: {
        y: teamSection.value.offsetTop - 100,
        autoKill: false
      },
      duration: 1,
      ease: 'power2.out',
    });
  }, 500);

};

const originsOpen = ref(false);
const toggleOrigins = () => {
  originsOpen.value = !originsOpen.value;
};

const teamOpen = ref(false);

const toggleTeam = () => {
  teamOpen.value = !teamOpen.value;
};

</script>

<template>

  <Head>
    <title>Home</title>
    <meta
        v-if="props.meta_description"
        name="description" :content="props.meta_description">
    <meta name="robots" :content="(props.is_production??false)?'index, follow':'noindex, nofollow'">
  </Head>

  <div class="relative z-0 2xl:h-[92vh] overflow-hidden" style="background: #ece8e5;">
    <div class="relative z-10 h-full">


      <div class="block lg:hidden h-full relative z-30">
        <v-img aspect-ratio="0.5" color="grey"
               class="align-top text-center relative pt-[126px] pb-[126px]"
               :src="`/images/content/${props.content.hero_background_image_mobile}`"
               cover
        >

          <div class="m-0 lg:me-20 my-20 relative flex flex-col justify-center mt-[180px] px-20" style="height: 40%;">
            <h1 class="text-4xl 2xl:text-6xl mb-5 uppercase text-white" v-html="props.content.hero_title" />
            <p class="text-lg md:text-2xl text-white" v-html="props.content.hero_introduction" />
            <div class="mt-8">
              <div class="flex flex-row flex-wrap justify-center items-center gap-2 w-full">
                <template v-for="i in 2">
                  <div class="mb-5">
                    <NavButton
                        v-if="props.content[`hero_button_${i}_active`] == 1"
                        class="bg-white text-black"
                        :href="props.content[`hero_button_${i}_url`]">{{ props.content[`hero_button_${i}_text`] }}</NavButton>
                    <NavButton
                        v-else
                        color="grey" disabled
                        href="#">{{ props.content[`hero_button_${i}_text`] }}</NavButton>
                  </div>
                </template>
              </div>
            </div>
          </div>

        </v-img>
      </div>
      <div class="hidden lg:flex h-full relative z-30">
        <v-img aspect-ratio="2" color="grey"
               class="align-center text-center py-20"
               :src="`/images/content/${props.content.hero_background_image_desktop}`"
               cover
        >
          <div class="grid grid-cols-1 lg:grid-cols-7 gap-3">
            <div class="col-span-3 hidden lg:flex">
            </div>
            <div class="flex h-full items-center col-span-4">
              <div class="max-w-3xl mx-auto m-0 lg:me-20 my-20">
                <h1 class="text-4xl 2xl:text-6xl mb-5 uppercase text-white text-start" v-html="props.content.hero_title" />
                <p class="text-lg md:text-2xl text-black text-white" v-html="props.content.hero_introduction" />
                <div class="mt-8">
                  <div class="flex flex-row flex-wrap items-center gap-2 w-full">
                    <template v-for="i in 2">
                      <div class="mb-5">
                        <NavButton
                            v-if="props.content[`hero_button_${i}_active`] == 1"
                            class="bg-white text-black"

                            :href="props.content[`hero_button_${i}_url`]">{{ props.content[`hero_button_${i}_text`] }}</NavButton>
                        <NavButton
                            v-else
                            color="grey" disabled
                            href="#">{{ props.content[`hero_button_${i}_text`] }}</NavButton>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-img>
      </div>


    </div>

  </div>

  <WrapperFull v-if="props.products.length > 0" style="margin-top: 120px;">
    <div class="flex justify-center mx-10">
      <div class="text-center">
        <h2 class="text-5xl mb-2 uppercase" v-html="formatTitle(props.content.sneak_peek_title)" />
      </div>
    </div>
    <div class="block xl:hidden px-2 py-20 xl:p-20">
      <v-carousel height="auto" :show-arrows="false" hide-delimiters :cycle="false">
        <v-carousel-item v-if="props.products.length > 0">
          <div>
            <div class="grid grid-cols-2 gap-0">
              <div v-for="(product, index) in props.products.slice(0,2)" class="p-2">
                <v-card
                    @click.prevent="productModal.openProduct(product)"
                    rounded="0" class="card">
                  <div class="overflow-hidden rounded-xl">
                    <v-img aspect-ratio="0.6667" class="zoom-image shadow-sm" :src="product.image_url" alt="">
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular
                              color="grey-lighten-4"
                              indeterminate
                          ></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                  </div>
                  <!-- product description -->
                  <div class="p-2 xl:p-5">
                    <div>
                      <div class="grid grid-cols-1 lg:grid-cols-6 gap-3">
                        <div class="col-span-6 xl:col-span-4">
                          <p class="text-base xl:text-2xl uppercase brand bold">{{ product.name }}</p>
                          <p class="hidden xl:block mt-2">{{ product.description }}</p>
                        </div>
                        <div class="flex xl:justify-end col-span-6 xl:col-span-2">
                          <p class="text-base xl:text-xl font-serif">{{ product.price_string }}</p>
                        </div>
                      </div>
                      <template v-if="product.weekend_only">
                        <div>
                          <v-chip
                              color="black" variant="outlined"
                              size="x-small">Week-end only</v-chip>
                        </div>
                      </template>
                    </div>
                  </div>
                  <!-- end product description -->
                </v-card>
              </div>
            </div>
          </div>
        </v-carousel-item>
        <v-carousel-item v-if="props.products.length > 2">
          <div>
            <div class="grid grid-cols-2 gap-0">
              <div v-for="(product, index) in props.products.slice(2,4)" class="p-2">
                <v-card
                    @click.prevent="productModal.openProduct(product)"
                    rounded="0" class="card">
                  <div class="overflow-hidden rounded-xl">
                    <v-img aspect-ratio="0.6667" class="zoom-image shadow-sm" :src="product.image_url" alt="">
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular
                              color="grey-lighten-4"
                              indeterminate
                          ></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                  </div>
                  <!-- product description -->
                  <div class="p-2 xl:p-5">
                    <div>
                      <div class="grid grid-cols-1 lg:grid-cols-6 gap-3">
                        <div class="col-span-6 xl:col-span-4">
                          <p class="text-base xl:text-2xl uppercase brand bold">{{ product.name }}</p>
                          <p class="hidden xl:block mt-2">{{ product.description }}</p>
                        </div>
                        <div class="flex xl:justify-end col-span-6 xl:col-span-2">
                          <p class="text-base xl:text-xl font-serif">{{ product.price_string }}</p>
                        </div>
                      </div>
                      <template v-if="product.weekend_only">
                        <div>
                          <v-chip
                              color="black" variant="outlined"
                              size="x-small">Week-end only</v-chip>
                        </div>
                      </template>
                    </div>
                  </div>
                  <!-- end product description -->
                </v-card>
              </div>
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="hidden xl:block px-2 py-20 xl:p-20">
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        <div v-for="product in props.products" class="p-2">
          <v-card
              @click.prevent="productModal.openProduct(product)"
              rounded="0" class="card">
            <div class="overflow-hidden rounded-xl">
              <v-img aspect-ratio="0.6667" class="zoom-image shadow-sm" :src="product.image_url" alt="">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                        color="grey-lighten-4"
                        indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </div>
            <!-- product description -->
            <div class="p-2 xl:p-5">
              <div>
                <div class="grid grid-cols-1 lg:grid-cols-6 gap-3">
                  <div class="col-span-6 xl:col-span-4">
                    <p class="text-base xl:text-2xl uppercase brand bold">{{ product.name }}</p>
                    <p class="hidden xl:block mt-2">{{ product.description }}</p>
                  </div>
                  <div class="flex xl:justify-end col-span-6 xl:col-span-2">
                    <p class="text-base xl:text-xl font-serif">{{ product.price_string }}</p>
                  </div>
                </div>
                <template v-if="product.weekend_only">
                  <div>
                    <v-chip
                        color="black" variant="outlined"
                        size="x-small">Week-end only</v-chip>
                  </div>
                </template>
              </div>
            </div>
            <!-- end product description -->
          </v-card>
        </div>
      </div>
    </div>
    <div class="mt-0 flex flex-row justify-center" v-if="false">
      <NavButton
          :href="route('catering_menu')"
      >{{ props.content.sneak_peek_button_text }}</NavButton>
    </div>
  </WrapperFull>

  <WrapperFull>
    <Wrapper>
      <div class="mt-20">
        <div>
          <div class="max-w-7xl mx-auto m-5 p-0 py-6 lg:px-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 rounded-5xl overflow-hidden">
              <div class="brand-bg-grey">
                <v-img :src="`/images/content/${props.content.origins_image}`" class="w-full h-full rounded-5xl" :alt="props.content.origins_title" cover />
              </div>
              <div class="flex items-center brand-bg-grey p-5 lg:px-10 lg:py-10 ">
                <div>
                  <h2 class="text-3xl mb-7 brand uppercase">
                    <i>{{ props.content.origins_title }}</i>
                  </h2>
                  <div>
                    <p><span v-html="props.content.origins_content_1" /> <span :class="`${originsOpen ? 'inline' : 'hidden lg:inline'}`" v-html="props.content.origins_content_2" /></p>
                    <div class="mt-5 block lg:hidden">
                      <v-btn class="text-none" variant="outlined" size="small" @click.prevent="toggleOrigins">{{ originsOpen ? 'Close' : 'Read' }}</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  </WrapperFull>

  <WrapperFull wrapper="section">
    <Wrapper wrapper="section">
      <div class="px-5 mb-10" id="team-section" ref="teamSection">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div class="lg:col-span-2">
            <p v-if="personSelected === 'valerie'" class="text-2xl"><strong class="text-3xl">{{ props.content.team_1_name }}</strong>,<br><span class="brand">{{ props.content.team_1_title }}</span></p>
            <p v-else-if="personSelected === 'romain'" class="text-2xl"><strong class="text-3xl">{{ props.content.team_2_name }}</strong>,<br><span class="brand">{{ props.content.team_2_title }}</span></p>
          </div>
          <div class="lg:col-span-3" v-if="personSelected === 'valerie'">
            <p class="text-xl"><v-icon size="large" style="margin-top: -20px;">mdi-format-quote-open</v-icon>{{ props.content.team_1_quote }}<v-icon size="large" style="margin-bottom: -20px;">mdi-format-quote-close</v-icon></p>
            <p class="text-end mt-5 me-2"><i><strong>{{ props.content.team_1_quote_source }}</strong> - {{ props.content.team_1_quote_date }}</i></p>
          </div>
          <div class="lg:col-span-3" v-else-if="personSelected === 'romain'">
            <p class="text-xl"><v-icon size="large" style="margin-top: -20px;">mdi-format-quote-open</v-icon>{{ props.content.team_2_quote }}<v-icon size="large" style="margin-bottom: -20px;">mdi-format-quote-close</v-icon></p>
            <p class="text-end mt-5 me-2"><i><strong>{{ props.content.team_2_quote_source }}</strong> - {{ props.content.team_2_quote_date }}</i></p>
          </div>
        </div>
      </div>
      <div class="rounded-5xl overflow-hidden">
        <v-img aspect-ratio="1.6667" :src="personSelected === 'romain' ? `/images/content/${props.content.team_2_photo}` : `/images/content/${props.content.team_1_photo}`" style="background: transparent; filter: grayscale(100%);">
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
              ></v-progress-circular>
            </div>
          </template>
        </v-img>

        <div class="p-10 text-lg brand-bg-grey">

          <div v-if="personSelected === 'valerie'">

            <p class="mb-6" v-html="props.content.team_1_content_1" />
            <p :class="`my-6 ${teamOpen ? 'block' : 'hidden lg:block'}`" v-html="props.content.team_1_content_2" />

            <div class="mt-2 block lg:hidden">
              <v-btn class="text-none" variant="outlined" size="small" @click.prevent="toggleTeam">{{ teamOpen ? 'Close' : 'Read' }}</v-btn>
            </div>



          </div>
          <div v-else-if="personSelected === 'romain'">

            <p class="mb-6" v-html="props.content.team_2_content_1" />
            <p :class="`my-6 ${teamOpen ? 'block' : 'hidden lg:block'}`" v-html="props.content.team_2_content_2" />

            <div class="mt-2 block lg:hidden">
              <v-btn class="text-none" variant="outlined" size="small" @click.prevent="toggleTeam">{{ teamOpen ? 'Close' : 'Read' }}</v-btn>
            </div>

          </div>

          <div class="flex flex-row mt-10">
            <div class="flex flex-row bg-white rounded-pill mx-auto gap-3 px-3 py-2">
              <div
                  @click.prevent="selectPerson('valerie')"
                  class="cursor-pointer rounded-pill p-7 py-3 text-xl px-lg-7 py-lg-2 text-lg-lg" :class="getPersonColor('valerie')">Valérie</div>
              <div
                  @click.prevent="selectPerson('romain')"
                  class="cursor-pointer rounded-pill p-7 py-3 text-xl px-lg-7 py-lg-2 text-lg-lg" :class="getPersonColor('romain')">Romain</div>
            </div>
          </div>
        </div>
      </div>

    </Wrapper>
  </WrapperFull>

  <WrapperFull>
    <Wrapper>
      <div>
        <div>
          <div class="max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-5xl uppercase brand" v-html="formatTitle(props.content.tour_title)" />
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 text-start mt-15">


              <template v-for="i in 2">
                <div class="flex flex-col rounded-5xl overflow-hidden">
                  <div class="shrink-0">
                    <v-img class="w-full" aspect-ratio="1.5" :src="`/images/content/${props.content[`tour_${i}_image`]}`" cover />
                  </div>
                  <div class="px-8 py-10 brand-bg-grey grow flex flex-col justify-between">
                    <div>
                      <h2 class="text-3xl mb-4 brand bold"><i>{{ props.content[`tour_${i}_title`] }}</i></h2>
                      <p class="text-grey-darken-2" v-html="props.content[`tour_${i}_introduction`]" />
                    </div>
                    <div class="mt-10 navigation">

                      <NavButton
                          v-if="props.content[`tour_${i}_button_active`] == 1"
                          :href="props.content[`tour_${i}_button_link`]">
                        <span class="me-10">{{ props.content[`tour_${i}_button_text`] }}</span>
                        <v-icon size="small">mdi-arrow-right</v-icon>
                      </NavButton>


                      <NavButton v-else href="#" color="grey">
                        <span class="me-10">{{ props.content[`tour_${i}_button_text`] }}</span>
                        <v-icon size="small">mdi-arrow-right</v-icon>
                      </NavButton>

                    </div>
                  </div>
                </div>
              </template>


            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  </WrapperFull>

  <ProductModal ref="productModal" />

</template>
