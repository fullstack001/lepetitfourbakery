<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head} from "@inertiajs/vue3";
import PostCodeModal from "@/Components/PostCodeModal.vue";
import {ref} from "vue";

const props = defineProps({
  post_codes: Object,
  errors: Object,
});

const postCodeModal = ref(null);

const openPostCode = (post_code) => {
    postCodeModal.value.openPostCode(post_code);
};

const getColorClass = (post_code) => {
    return post_code.active ? 'text-black' : 'text-red';
};

</script>

<template>
  <AdmLayout title="Post codes">

    <div class="flex flex-col gap-3">
      <div>
        <v-btn @click.prevent="openPostCode(null)" size="small">Create post code</v-btn>
      </div>


      <div class="grid grid-cols-1 xl:grid-cols-2 py-1">
        <v-table>
          <thead>
          <tr>
            <th>Post code</th>
            <th>Extra fee</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="post_code in props.post_codes">
            <td :class="`font-bold ${getColorClass(post_code)}`">{{ post_code.post_code }}</td>
            <td :class="`${getColorClass(post_code)}`">{{ post_code.extra_fee_formatted }}</td>
            <td :class="`text-end ${getColorClass(post_code)}`"><v-btn @click.prevent="openPostCode(post_code)" size="small">Edit</v-btn></td>
          </tr>
          </tbody>
        </v-table>
      </div>
    </div>

    <PostCodeModal ref="postCodeModal" :errors="props.errors" />

  </AdmLayout>
</template>