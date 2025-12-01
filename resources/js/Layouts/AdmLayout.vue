<script setup>
import {nextTick, onMounted, onUnmounted, onUpdated, ref, watch} from 'vue';
import {Head, Link, router, usePage} from '@inertiajs/vue3';
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

const showSnackbar = ref(false);
const snackbarColor = ref('black');
const snackbarMessage = ref(null);

const page = usePage();

watch(() => page.props.flash, (flash) => {
  const message = flash?.message ?? '';
  const error = flash?.error ?? '';

  if (message) {
    snackbarMessage.value = message;
    snackbarColor.value = 'success';
    showSnackbar.value = true;
  }
  if (error) {
    snackbarMessage.value = error;
    snackbarColor.value = 'error';
    showSnackbar.value = true;
  }
});

</script>


<template>
  <div>
    <Head :title="`${props.title} :: Admin`" />

    <div class="min-h-screen bg-gray-100" ref="viewRef">

      <div class="flex flex-row">
        <div id="sidebar" class="min-h-screen shrink-0 bg-grey-darken-4 p-0 px-md-6 py-6">
          <div class="mb-10">
            <v-btn
                @click.prevent="$inertia.visit(route('home'))"
                prepend-icon="mdi-arrow-left"
                variant="flat" color="white"
            >
              <span class="hidden d-md-block">Back to site</span>
            </v-btn>
          </div>
          <div>
            <v-btn
                @click.prevent="$inertia.visit(route('admin'))"
                prepend-icon="mdi-view-dashboard"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Dashboard</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.orders'))"
                prepend-icon="mdi-printer-pos"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Orders</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.subscriptions'))"
                prepend-icon="mdi-calendar"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Subscriptions</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.deliveries'))"
                prepend-icon="mdi-truck"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Deliveries</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.categories'))"
                prepend-icon="mdi-shape"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Categories</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.products'))"
                prepend-icon="mdi-baguette"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Products</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.events_menu'))"
                prepend-icon="mdi-table-chair"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Events Menu</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia" class="hidden lg:block">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.subscription_plans'))"
                prepend-icon="mdi-autorenew"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Subscription plans</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.closed_dates'))"
                prepend-icon="mdi-cancel"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Closed dates</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia" class="hidden lg:block">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.post_codes'))"
                prepend-icon="mdi-map-marker"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Post codes</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia" class="hidden">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.cards'))"
                prepend-icon="mdi-cards-outline"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Gift cards</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.payments'))"
                prepend-icon="mdi-currency-usd"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Payments</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia" class="hidden lg:block">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.users'))"
                prepend-icon="mdi-account"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Users</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.settings'))"
                prepend-icon="mdi-cogs"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Settings</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.landing_modal'))"
                prepend-icon="mdi-window-restore"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Landing modal</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia" class="hidden lg:block">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.team'))"
                prepend-icon="mdi-account-outline"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Team members</span>
            </v-btn>
          </div>
          <div>
            <v-btn
                @click.prevent="$inertia.visit(route('team.orders'))"
                prepend-icon="mdi-clipboard-outline"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Team dashboard</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia" class="hidden lg:block">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.main_content'))"
                prepend-icon="mdi-text-long"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Main Content</span>
            </v-btn>
          </div>
          <div v-if="$page.props.ia" class="hidden lg:block">
            <v-btn
                @click.prevent="$inertia.visit(route('admin.legal_content'))"
                prepend-icon="mdi-text-long"
                variant="plain" color="white"
            >
              <span class="hidden d-md-block">Legal Content</span>
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
  <v-snackbar v-model="showSnackbar" :text="snackbarMessage" :color="snackbarColor" class="mb-5"/>
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
