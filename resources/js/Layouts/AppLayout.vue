<script setup>
import {nextTick, onBeforeUnmount, onMounted, onUnmounted, reactive, ref} from 'vue';
import {Head, Link, router, usePage} from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Banner from '@/Components/Banner.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import Logo from "@/Components/Logo.vue";
import { useDisplay } from 'vuetify';
import emitter from '@/eventBus.js';

const { mobile } = useDisplay();

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import LogoLight from "@/Components/LogoLight.vue";
import LandingModal from "@/Components/LandingModal.vue";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

defineProps({
  title: String,
});

const page = usePage();

const scsm = ref(null);
const savedScrollPosition = ref(0);
const isScrolled = ref(false);

// Scroll event handler
const handleScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

const showingNavigationDropdown = ref(false);

const logout = () => {
  router.post(route('logout'));
};

const landingModalForm = reactive({});
const landingModal = ref(null);
const landingTimeout = ref(null);

const isMac = ref(false);
const isMobile = ref(false);

onMounted(() => {
  nextTick(() => {
    window.addEventListener('scroll', handleScroll);
    isMac.value = navigator.platform.toLowerCase().includes('mac');
    isMobile.value = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if(!isMac.value) {
      scsm.value = ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: isMobile.value,
      });
    }
    if(page.props.landing_active) {
      landingModalForm.title_top = page.props.landing_modal.title_top;
      landingModalForm.content_top = page.props.landing_modal.content_top;
      landingModalForm.title_bottom = page.props.landing_modal.title_bottom;
      landingModalForm.content_bottom = page.props.landing_modal.content_bottom;
      landingModalForm.title_top_formatted = page.props.landing_modal.title_top_formatted;
      landingModalForm.content_top_formatted = page.props.landing_modal.content_top_formatted;
      landingModalForm.title_bottom_formatted = page.props.landing_modal.title_bottom_formatted;
      landingModalForm.content_bottom_formatted = page.props.landing_modal.content_bottom_formatted;
      landingModalForm.image = page.props.landing_modal.image;
      landingModalForm.opacity = page.props.landing_modal.opacity;
      landingModalForm.show_newsletter_form = page.props.landing_modal.show_newsletter_form;
      const delay_seconds = page.props.landing_modal.delay_seconds;
      if(landingTimeout.value) {
        clearTimeout(landingTimeout.value);
      }
      if(landingModal.value) {
        setTimeout(() => {
          landingModal.value.openLanding();
        }, (delay_seconds * 1000));
      } else {
        console.log('no modal');
      }
    }
  });
})

onMounted(() => {
  if(!isMac.value) {
    emitter.on('modal-opened', () => {
      scsm.value.paused(true);
    });

    emitter.on('modal-closed', () => {
      scsm.value.paused(false);
    });
  }
});


onBeforeUnmount(() => {
  if(!isMac.value) {
    scsm.value.kill();
  }
  if(landingTimeout.value) {
    clearTimeout(landingTimeout.value);
  }
});

</script>


<template>
  <div>
    <Head :title="title" />

    <Banner />

        <div class="min-h-screen bg-white" ref="viewRef">
          <!-- Page Heading -->
          <!-- page heading -->
          <header class="fixed w-full top-0 left-0 z-50" :class="isScrolled ? 'bg-white' : 'bg-transparent'">
            <div class="mx-auto py-6 px-8 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center">
                <div @click.prevent="$inertia.visit(route('home'))" class="cursor-pointer">
                  <Logo />
                </div>
                <div class="uppercase hidden xl:flex">
                  <v-btn
                      @click.prevent="$inertia.visit(route('home'))"
                      class="mx-2" variant="plain">Home</v-btn>
                  <v-btn
                      @click.prevent="$inertia.visit(route('la_boutique'))"
                      class="mx-2" variant="plain">La boutique</v-btn>
                  <v-btn
                      v-if="false"
                      @click.prevent="$inertia.visit(route('catering_menu'))"
                      class="mx-2" variant="outlined">Catering menu</v-btn>
                  <v-btn class="mx-2 rounded-pill" variant="outlined"
                         append-icon="mdi-open-in-new"
                         href="https://order.toasttab.com/online/le-petit-four-bakery-380-washington-street"
                         target="_blank">Online orders</v-btn>
                  <v-menu v-if="$page.props.event_menu_categories.length > 0">
                    <template v-slot:activator="{ props }">
                      <v-btn
                          v-bind="props"
                          variant="plain">Events menu</v-btn>
                    </template>
                    <v-list>
                      <template v-for="event_menu_category in $page.props.event_menu_categories">
                        <v-list-item>
                          <v-btn
                              @click.prevent="$inertia.visit(route('events_menu', {category: event_menu_category.uid}))"
                              class="mx-2" variant="plain">{{ event_menu_category.name }}</v-btn>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-menu>
                  <v-btn
                      v-if="$page.props.auth.user && $page.props.auth.user.can_subscribe"
                      @click.prevent="$inertia.visit(route('subscription'))"
                      class="mx-2" variant="plain">Subscription</v-btn>
                  <v-btn
                      @click.prevent="$inertia.visit(route('contact'))"
                      class="mx-2" variant="plain">Contact us</v-btn>
                </div>
                <div class="uppercase hidden xl:flex">

                  <v-btn
                      @click.prevent="$inertia.visit(route('cart'))"
                      class="mx-2" variant="plain" prepend-icon="mdi-cart">Cart ({{ $page.props.cart_count }})</v-btn>

                  <div v-if="$page.props.auth.user">

                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                            prepend-icon="mdi-account-circle"
                            v-bind="props"
                            class="mx-2" variant="plain">{{ $page.props.auth.user.name }}</v-btn>
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-btn variant="plain" @click.prevent="$inertia.visit(route('orders'))">Order history</v-btn>
                        </v-list-item>
                        <v-list-item>
                          <v-btn variant="plain" @click.prevent="logout">Log out</v-btn>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-btn
                        v-if="$page.props.ia || $page.props.it"
                        prepend-icon="mdi-lock"
                        @click.prevent="$inertia.visit(route('admin'))"
                        class="rounded-pill mx-2" variant="flat">Adm</v-btn>
                  </div>
                  <div v-else>
                    <v-btn
                        @click.prevent="$inertia.visit(route('register'))"
                        class="mx-2" variant="plain">Register</v-btn>
                    <v-btn
                        @click.prevent="$inertia.visit(route('login'))"
                        class="ms-2 bg-main" variant="flat">Login</v-btn>
                  </div>
                </div>
                <div class="flex xl:hidden">
                  <v-menu location="bottom" location-alignment="end">
                    <template v-slot:activator="{ props }">
                      <v-badge
                          v-if="$page.props.cart_count"
                          color="red"
                          :content="$page.props.cart_count"
                      >
                        <v-btn
                            v-bind="props"
                            icon="mdi-menu"
                            rounded="5"
                        />
                      </v-badge>
                      <v-btn
                          v-else
                          v-bind="props"
                          icon="mdi-menu"
                          rounded="5"
                      />
                    </template>
                    <v-card elevation="4xl" rounded="4">
                      <v-list density="compact" color="white">
                        <v-list-item>
                          <v-btn
                              @click.prevent="$inertia.visit(route('home'))"
                              variant="plain">Home</v-btn>
                        </v-list-item>
                        <v-list-item>
                          <v-btn
                              @click.prevent="$inertia.visit(route('la_boutique'))"
                              variant="plain">La boutique</v-btn>
                        </v-list-item>
                        <v-list-item v-if="false">
                          <v-btn
                              @click.prevent="$inertia.visit(route('catering_menu'))"
                              variant="plain">Catering menu</v-btn>
                        </v-list-item>
                        <v-list-item>
                          <v-btn class="mx-2 rounded-pill" variant="outlined"
                                 append-icon="mdi-open-in-new"
                                 href="https://order.toasttab.com/online/le-petit-four-bakery-380-washington-street"
                                 target="_blank">Online orders</v-btn>
                        </v-list-item>
                        <v-list-item v-if="$page.props.event_menu_categories.length > 0">
                          <v-menu>
                            <template v-slot:activator="{ props }">
                              <v-btn
                                  v-bind="props"
                                  variant="plain">Events menu</v-btn>
                            </template>
                            <v-list elevation="10" rounded="md">
                              <template v-for="event_menu_category in $page.props.event_menu_categories">
                                <v-list-item>
                                  <v-btn
                                      @click.prevent="$inertia.visit(route('events_menu', {category: event_menu_category.uid}))"
                                      class="mx-2" variant="plain">{{ event_menu_category.name }}</v-btn>
                                </v-list-item>
                              </template>
                            </v-list>
                          </v-menu>
                        </v-list-item>
                        <v-list-item
                            v-if="$page.props.auth.user && $page.props.auth.user.can_subscribe">
                          <v-btn
                              @click.prevent="$inertia.visit(route('subscription'))"
                              variant="plain">Subscription</v-btn>
                        </v-list-item>
                        <v-list-item>
                          <v-btn
                              @click.prevent="$inertia.visit(route('contact'))"
                              variant="plain">Contact us</v-btn>
                        </v-list-item>
                      </v-list>
                      <hr>
                      <v-list density="compact" color="black">
                        <v-list-item>
                          <v-btn
                              @click.prevent="$inertia.visit(route('cart'))"
                              variant="plain" color="amber-darken-4">Cart ({{ $page.props.cart_count }})</v-btn>
                        </v-list-item>
                        <template v-if="$page.props.ia || $page.props.it">
                          <v-list-item>
                            <v-btn
                                v-if="$page.props.ia || $page.props.it"
                                prepend-icon="mdi-lock"
                                @click.prevent="$inertia.visit(route('admin'))"
                                class="rounded-pill mx-2" variant="flat">Adm</v-btn>
                          </v-list-item>
                        </template>
                        <div  v-if="!$page.props.auth.user">
                          <v-list-item>
                            <v-btn
                                @click.prevent="$inertia.visit(route('login'))"
                                variant="plain" color="amber-darken-4">Login</v-btn>
                          </v-list-item>
                          <v-list-item>
                            <v-btn
                                @click.prevent="$inertia.visit(route('register'))"
                                variant="plain" color="amber-darken-4">Register</v-btn>
                          </v-list-item>
                        </div>
                      </v-list>
                    </v-card>
                  </v-menu>
                </div>
              </div>
              <div
                  v-if="$page.props.unpaid_orders > 0 && !['orders', 'order'].includes(route().current())"
                  class="mt-3"
              >
                <v-card color="#ec8430" rounded="lg" class="text-center">
                  <v-card-item>
                    <div class="flex flex-row w-full justify-center items-center flex-wrap gap-3">
                      <p class="text-white">You have one or more unpaid orders.</p>
                      <v-btn
                          @click.prevent="$inertia.visit(route('orders'))"
                          size="small" color="white">View</v-btn>
                    </div>
                  </v-card-item>
                </v-card>
              </div>
            </div>
          </header>
          <!-- end page heading -->

          <div id="smooth-wrapper" class="w-screen h-screen">
            <div id="smooth-content">

              <!-- main content -->
              <main>
                <slot />
              </main>
              <!-- end main content -->


              <!-- footer -->
              <div class="mt-0 py-20">
                <div class="py-6 px-4 sm:px-6 lg:px-8">
                  <div>
                    <div class="max-w-7xl mx-auto ">
                      <div class="footer-wrapper overflow-hidden text-white" style="background: #0a0000;">
                        <div class="px-4 py-10">
                          <div class="flex flex-row footer-logo-wrapper mx-auto justify-center">
                            <LogoLight />
                          </div>
                        </div>
                        <hr>
                        <div class="px-4 py-0">
                          <div class="mt-10">
                            <p class="text-lg text-grey my-4 text-center uppercase">Business hours</p>
                            <div class="max-w-2xl mx-auto">
                              <table class="w-full">
                                <template v-for="day in $page.props.opening_times">
                                  <tr>
                                    <td class="px-3 py-1">
                                      <strong class="hidden md:flex">{{ day.name }}</strong>
                                      <strong class="flex md:hidden">{{ day.abbr }}</strong>
                                    </td>
                                    <td class="px-3 py-1">
                                      <div class="flex flex-row items-center justify-center">
                                        <template v-if="day.open">
                                          Open&nbsp;<v-icon color="green">mdi-checkbox-marked</v-icon>
                                        </template>
                                        <template v-else>
                                          Closed&nbsp;<v-icon color="red">mdi-close</v-icon>
                                        </template>
                                      </div>
                                    </td>
                                    <td class="px-3 py-1">
                                      <div class="flex flex-row items-center justify-end">{{ day.times}}</div>
                                    </td>
                                  </tr>
                                </template>
                              </table>
                            </div>
                          </div>
                          <div>

                            <div class="text-center pt-20 pb-5">
                              <div class="flex flex-row flex-wrap items-center justify-center gap-3 w-full">
                                <div>
                                  <v-btn
                                      :size="mobile ? 'small' : 'default'"
                                      variant="text" color="grey">Copyright &copy;{{ new Date().getFullYear() }}</v-btn>
                                </div>
                                <div class="flex flex-row flex-wrap items-center justify-center gap-3">
                                  <div>
                                    <v-btn
                                        :size="mobile ? 'small' : 'default'"
                                        @click.prevent="$inertia.visit(route('terms'))"
                                        variant="text" color="grey">Terms &amp; conditions</v-btn>
                                  </div>
                                  <div>
                                    <v-btn
                                        :size="mobile ? 'small' : 'default'"
                                        @click.prevent="$inertia.visit(route('privacy'))"
                                        variant="text" color="grey">Privacy policy</v-btn>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end footer -->

            </div>
          </div>

        </div>
      </div>

  <LandingModal v-if="$page.props.landing_active" ref="landingModal" :details="landingModalForm" />

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
.footer-wrapper {
  border-radius: 20px;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
}
.footer-logo-wrapper {
  max-width: 70%;
}
@media (min-width: 640px) {
  .footer-logo-wrapper {
    max-width: 384px;
  }
}
@media (min-width: 1024px) {
  .footer-wrapper {
    border-radius: 70px;
    -moz-border-radius: 70px;
    -webkit-border-radius: 70px;
  }
}

</style>
