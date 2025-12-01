<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import Pagination from "@/Components/Pagination.vue";
import {computed, onMounted, reactive, ref, toRefs} from "vue";
const props = defineProps({
  users: Object,
  can_subscribe: Array,
});


const selectedUsers = ref([]);

const form = reactive({
  subscribers: [],
});

const savingSubscribers = ref('default');

const subSaveButtonColor = computed(() => {
  if(savingSubscribers.value === 'saving') return 'grey';
  if(savingSubscribers.value === 'saved') return 'green';
  return 'black';
});


const subSaveButtonText = computed(() => {
  if(savingSubscribers.value === 'saving') return 'Saving';
  if(savingSubscribers.value === 'saved') return 'Saved';
  return 'Save';
});

const saveSubscribers = () => {
  if(savingSubscribers.value === 'default') {
    savingSubscribers.value = 'saving';
    form.subscribers = selectedUsers.value;
    router.post(route('admin.update_subscribers'), form, {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (page) => {
        savingSubscribers.value = 'saved';
        setTimeout(() => {
          savingSubscribers.value = 'default';
        }, 2000)
      },
      only: [''],
      preserveScroll: true,
      preserveState: true
    });
  }
};

onMounted(() => {
  selectedUsers.value = props.users.data
      .filter(user => props.can_subscribe.includes(user.uid))
      .map(user => user.uid);
});

</script>

<template>
  <AdmLayout title="Users">
    <div class="mt-3">
      <v-table>
        <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th class="text-center">Can subscribe</th>
          <th class="text-center">Subscription status</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in props.users.data">
          <td>
            <v-label>{{ user.name }}</v-label>
          </td>
          <td>
            <v-label>{{ user.email }}</v-label>
          </td>
          <td>
            <div class="flex justify-center">
              <v-checkbox v-model="selectedUsers" :value="user.uid"
                          hide-details />
            </div>
          </td>
          <td>
            <div class="flex justify-center">
            <v-label>not subscribed</v-label>
            </div>
          </td>
          <td class="text-end">
            <v-btn color="grey" size="small">Orders</v-btn>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>
            <div class="flex justify-center">
              <v-btn
                  :color="subSaveButtonColor"
                  @click.prevent="saveSubscribers" size="small">{{ subSaveButtonText }}</v-btn>
            </div>
          </td>
          <td></td>
        </tr>
        </tbody>
      </v-table>
    </div>

    <div>
      <Pagination :entities="props.users" />
    </div>

  </AdmLayout>
</template>