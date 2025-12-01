<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
// closed date
const showClosedDateModal = ref(false);
const selectedClosedDate = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const props = defineProps({
  errors: Object,
});

const formClosedDate = reactive({});

const selectedDates = ref([]);
const openClosedDate = () => {
  local_errors.value = {};
  selectedDates.value = [];
  modalTitle.value = 'Add closed date';
  selectedClosedDate.value = null;
  formClosedDate.dates = [];
  formClosedDate.reason = '';
  saveButtonText.value = 'Save closed date';
  showClosedDateModal.value = true;
};

const closeClosedDate = () => {
  showClosedDateModal.value = false;
  selectedClosedDate.value = null;
};

const local_errors = ref({});

const saveClosedDate = () => {
  local_errors.value = {};
  const url = route(`admin.create_closed_date`);
  router.post(url, formClosedDate, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      closeClosedDate();
    },
    onError: (error) => {
      local_errors.value = props.errors;
    }
  });
};
//end closed date

defineExpose({ openClosedDate });

function updateDates() {
  local_errors.value = {};
  formClosedDate.dates = selectedDates.value.map(date =>
      new Date(date).toLocaleDateString('en-US').replace(/\//g, '.')
  );
}


</script>

<template>

  <DialogModal
      maxWidth="3xl"
        :show="showClosedDateModal"
        @close="closeClosedDate"
    >
      <template #title>
        {{ modalTitle }}
      </template>
      <template #content>

        <div class="flex flex-col gap-5">
          <div>
            <v-label>Reason for closing (internal) - Optional</v-label>
            <v-text-field v-model="formClosedDate.reason" />
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <v-date-picker
                  color="black"
                  header="Select dates"
                  v-model="selectedDates"
                  @update:modelValue="updateDates"
                  multiple
              />
            </div>
            <div class="flex flex-col gap-2">
              <v-label>Dates selected</v-label>
              <div class="flex flex-col gap-2" v-if="formClosedDate.dates.length">
                <div v-for="date in formClosedDate.dates">
                  <p class="text-2xl text-black">{{ date }}</p>
                </div>
              </div>
              <div v-else>
                <p>No date selected.</p>
              </div>
            </div>
          </div>
        </div>

      </template>
      <template #footer>
        <PrimaryButton
            @click="saveClosedDate"
            class="me-3"
        >{{ saveButtonText }}</PrimaryButton>
        <SecondaryButton
            @click="closeClosedDate"
        >Cancel</SecondaryButton>
      </template>
    </DialogModal>

</template>