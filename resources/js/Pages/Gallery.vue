<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head} from "@inertiajs/vue3";
import Wrapper from "@/Components/Wrapper.vue";
import Header from "@/Components/Header.vue";
import WrapperFull from "@/Components/WrapperFull.vue";

import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

const isotope = ref(null);

import {onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
const props = defineProps({});

defineOptions({ layout: AppLayout });

function filterItems(filter) {
  isotope.value.arrange({ filter: filter });
}

function sortItems(sortBy) {
  console.log(sortBy);
  isotope.value.arrange({ sortBy: sortBy });
}

onMounted(() => {
  const gridElement = document.querySelector('.collection');
  imagesLoaded(gridElement, function() {
    // Initialize Isotope after all images have loaded
    isotope.value = new Isotope(gridElement, {
      itemSelector: '.collection-item',
      layoutMode: 'fitRows',
      transitionDuration: '0.7s'
    });
    isotope.value.on('layoutComplete', function() {
      console.log('9203492');
      // isotope.value.layout();
    });
  });
});

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

onBeforeUnmount(() => {
  const heroImage = document.querySelector('.hero-image');
  heroImage.removeEventListener('load', onLoad);
});

</script>

<template>

  <Head title="La Boutique"></Head>

  <Wrapper>
    <Header>La Boutique</Header>
  </Wrapper>


  <WrapperFull wrapper="section">

    <Wrapper wrapper="section">

      <div>
        <div class="mb-2">
          <v-btn class="me-2" @click="filterItems('*')">Show All</v-btn>
          <v-btn class="me-2" @click="filterItems('.metal')">Metal</v-btn>
          <v-btn class="me-2" @click="filterItems('.transition')">Transition</v-btn>
          <v-btn class="me-2" @click="sortItems('original-order')">Original Order</v-btn>
          <v-btn class="me-2" @click="sortItems('name')">Name</v-btn>
        </div>

        <div class="collection">
          <div class="w-1/2 collection-item metal" data-name="Iron">Iron</div>
          <div class="w-1/2 collection-item metal" data-name="Gold">Gold</div>
          <div class="w-1/2 collection-item transition" data-name="Copper">Copper</div>
          <div class="w-1/2 collection-item transition" data-name="Zinc">Zinc</div>
        </div>
      </div>

    </Wrapper>


  </WrapperFull>



</template>

<style>
.collection {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  transition: height 0.7s ease, background-color 0.7s ease;
  overflow: hidden;
}
.collection-item {
  background: #ccc;
  height: 250px;
  transition: none;
}
</style>