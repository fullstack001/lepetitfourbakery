<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head} from "@inertiajs/vue3";
import Wrapper from "@/Components/Wrapper.vue";
import WrapperFull from "@/Components/WrapperFull.vue";
import Header from "@/Components/Header.vue";
import ProductModal from "@/Components/CartProductModal.vue";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import Isotope from 'isotope-layout';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();

const props = defineProps({
  content: Object,
  filters: Object,
  products: Object,
  event_menu_category: { type: Object, default: '' },
  meta_description: { type: String, default: '' },
  is_production: { type: Boolean, default: false },
});

defineOptions({ layout: AppLayout });

const productModal = ref(null);

const selectedCategory = ref(null);
const isotopeInstance = ref(null);
const grid = ref(null);

const selectCategory = (category) => {
  selectedCategory.value = category;
  const filterValue = category ? `.${category}` : '*';
  isotopeInstance.value.arrange({ filter: filterValue });
};

const filteredProducts = computed(() => {
  if (selectedCategory.value === null) {
    return props.products;
  }
  return props.products.filter(product => product.category === selectedCategory.value);
});

onMounted(() => {
  props.products.forEach(product => {
    product.categoryClass = product.categories.map(category => category.slug).join(' ');
  });

  isotopeInstance.value = new Isotope(grid.value, {
    itemSelector: '.card',
    layoutMode: 'fitRows',
  });
});

</script>

<template>

  <Head>
    <title>Events menu: {{ props.event_menu_category.name }}</title>
    <meta
        v-if="props.meta_description"
        name="description" :content="props.meta_description">
    <meta name="robots" :content="(props.is_production??false)?'index, follow':'noindex, nofollow'">
  </Head>

  <Wrapper style="margin-top: 150px;">
    <Header>
      <div class="flex justify-center">
        <div class="text-center">
          <h1
              class="brand uppercase"
              :class="props.event_menu_category ? 'text-5xl' : 'text-6xl'"
              v-html="props.content.title" />
        </div>
      </div>
      <template #description>
        <p
            :class="props.event_menu_category ? 'text-4xl' : ''"
            v-html="props.content.introduction" />
      </template>
    </Header>
  </Wrapper>


  <WrapperFull wrapper="section">
    <div class="flex justify-center" v-if="!props.event_menu_category">
      <div class="flex flex-col gap-3 items-center lg:flex-row mx-20 my-10">
        <div class="block">
          <v-btn
              rounded="xl"
              :size="mobile ? 'large' : 'default'"
              @click.prevent="selectCategory(null)"
              :variant="selectedCategory === null ? 'flat' : 'outlined'">All categories</v-btn>
        </div>
        <div class="flex flex-row flex-wrap gap-3 justify-center items-center">
          <div v-for="category in filters" :key="category.uid">
            <v-btn
                rounded="xl"
                :size="mobile ? 'large' : 'default'"
                @click.prevent="selectCategory(category.slug)"
                :variant="selectedCategory === category.slug ? 'flat' : 'outlined'">{{ category.name }}</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="px-2 py-10 xl:p-20">
      <div ref="grid" class="block relative p-0">
        <div v-for="(product, index) in products" :key="index" :class="product.categoryClass" class="card w-[50%] sm:w-[50%] lg:w-[25%] p-2">
          <v-card
              @click.prevent="productModal.openProduct(product)" color="black"
              variant="text" class="relative"
          >
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
  </WrapperFull>

  <ProductModal ref="productModal" :event_menu_category="props.event_menu_category" />



</template>

<style scoped>
</style>
