<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import ClosedDateModal from "@/Components/ClosedDateModal.vue";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";

const props = defineProps({
  closed_dates: Object,
  earlier_dates_exist: Boolean,
  earlier_dates_displayed: Boolean,
  errors: Object,
});

const form = reactive({
  dates: '',
  reason: '',
});

const closedDateModal = ref(null);

const deleteClosedDate = (closed_date) => {
    router.post(route('admin.delete_closed_date', {closed_date: closed_date.uid}), {}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {

        },
        onError: (error) => {
            local_errors.value = props.errors;
        }
    });
};

</script>

<template>

  <AdmLayout title="Closed dates">

    <div class="flex flex-col gap-3">
      <div>
        <v-btn @click.prevent="closedDateModal.openClosedDate()"
         size="small">Add closed date</v-btn>
      </div>

      <div v-if="props.closed_dates.length">
        <div class="grid grid-cols-1 xl:grid-cols-2 py-1">
        <v-table>
          <thead>
          <tr>
            <th><strong>Date</strong></th>
            <th colspan="2"><strong>Reason</strong></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <template v-for="closed_date in props.closed_dates">
              <tr>
                <td>{{ closed_date.date_formatted }}</td>
                <td colspan="2">{{ closed_date.reason??'-' }}</td>
                <td><v-btn
                    @click.prevent="deleteClosedDate(closed_date)"
                    size="small" variant="text" color="red">Delete</v-btn></td>
              </tr>
          </template>
          </tbody>
        </v-table>
        </div>
        <div class="w-full block mt-5" v-if="props.earlier_dates_exist || props.earlier_dates_displayed">
          <v-btn
              size="small"
              v-if="props.earlier_dates_exist"
              @click.prevent="$inertia.visit(route('admin.closed_dates', {'scope': 'all'}))"
          >Show all dates</v-btn>
          <v-btn
              size="small"
              v-if="props.earlier_dates_displayed"
              @click.prevent="$inertia.visit(route('admin.closed_dates'))"
          >Only show current dates</v-btn>
        </div>
      </div>
      <div v-else>
        <p>You haven't added any closed dates yet.</p>
      </div>

    </div>

    <ClosedDateModal ref="closedDateModal" :errors="props.errors"/>

  </AdmLayout>

</template>