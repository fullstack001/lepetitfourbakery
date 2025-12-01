<script setup>
import {nextTick, onMounted, onUnmounted, ref} from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Banner from '@/Components/Banner.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import Logo from "@/Components/Logo.vue";

const props = defineProps({
  title: String,
});

const isScrolled = ref(false);

// Scroll event handler
const handleScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

const lenis = ref(null);

const showingNavigationDropdown = ref(false);

</script>


<template>
  <div>
    <Head :title="`${props.title} :: Admin`" />

    <div class="min-h-screen bg-gray-100" ref="viewRef">

      <div class="flex flex-row">
        <div id="sidebar" class="min-h-screen shrink-0 bg-blue-grey-darken-4 p-0 px-md-6 py-6">
          <div class="mb-10">
            <v-btn
                @click.prevent="$inertia.visit(route('home'))"
                prepend-icon="mdi-arrow-left"
                variant="flat" color="white"
            >
              <span class="hidden d-md-block">Back to site</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin'))"
                prepend-icon="mdi-arrow-left"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Back to admin</span>
            </v-btn>
          </div>
          <div>
            <v-btn
                @click.prevent="$inertia.visit(route('team.orders'))"
                prepend-icon="mdi-printer-pos"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Orders</span>
            </v-btn>
          </div>
          <div>
            <v-btn
                @click.prevent="$inertia.visit(route('team.bakery'))"
                prepend-icon="mdi-baguette"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Bakery</span>
            </v-btn>
          </div>
        </div>
        <div class="h-screen grow bg-blue-grey-lighten-4 p-6 overflow-x-hidden overflow-y-scroll">

          <div v-if="props.title">
            <p class="text-4xl font-medium mb-3 uppercase">{{ props.title }}</p>
          </div>

          <div v-if="$slots.buttons" class="mb-3">
            <slot name="buttons" />
          </div>

          <slot />

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
td {
  vertical-align: top;
}
html {
  scroll-behavior: smooth;
}
header {
  transition: background-color 0.3s ease-in-out;
}
.div1, .div2 {
  height: 100vh;
}

.div1 {
  background-color: limegreen;
}

.div2 {
  background-color: salmon;
}

.square {
  opacity: 0;
  width: 150px;
  height: 150px;
  background-color: steelblue;
}

#sidebar {
  width: 70px;
}

@media (min-width: 960px) {
  #sidebar {
    width: 300px;
  }
}
</style>
