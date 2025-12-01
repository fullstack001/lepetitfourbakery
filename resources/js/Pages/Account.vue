<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import WrapperFull from "@/Components/WrapperFull.vue";
import Wrapper from "@/Components/Wrapper.vue";
import NavLink from "@/Components/NavLink.vue";
const props = defineProps({
  user: Object,
});

defineOptions({ layout: AppLayout });

</script>

<template>

  <Head title="Account"></Head>


  <WrapperFull style="margin-top: 150px;">

    <Wrapper>

      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="text-6xl brand uppercase">Account</h1>
          <v-btn
              @click.prevent="$inertia.visit(route('profile.show'))"
              variant="plain" color="black" size="small">Manage profile</v-btn>
        </div>
      </div>

      <div class="text-center">
        <p>
          Username: <strong>{{ props.user.name }}</strong>
        </p>
        <p>
          Can subscribe: <strong>{{ props.user.can_subscribe ? 'yes' : 'no' }}</strong>
        </p>
      </div>

    </Wrapper>

  </WrapperFull>

</template>