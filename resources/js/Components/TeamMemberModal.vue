<script setup>

import DialogModal from "@/Components/DialogModal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";
const props = defineProps({
  errors: Object,
});
// member
const showMemberModal = ref(false);
const selectedMember = ref(null);
const modalTitle = ref(null);
const saveButtonText = ref(null);

const emailAddress = ref('');
const canCreate = ref(false);
const message = ref('');
const errors = ref({});

const formMember = reactive({
  name: '',
  email: '',
  permission: '',
  make_admin: false,
});

const selectedType = ref('');

const openMember = (member = null, type) => {
  local_errors.value = {};
  selectedType.value = type;
  resetStatus();
  if(member) {
    modalTitle.value = 'Edit team member';
    selectedMember.value = member;
    formMember.name = member.name;
    formMember.email = member.email;
    emailAddress.value = member.email;
  } else {
    if(type === 'admin') {
      modalTitle.value = 'Create admin';
      saveButtonText.value = 'Save admin';
    } else {
      modalTitle.value = 'Create team member';
      saveButtonText.value = 'Save team member';
    }
    selectedMember.value = null;
    formMember.name = null;
    formMember.make_admin = false;
    emailAddress.value = '';
  }
  showMemberModal.value = true;
};

const closeMember = () => {
  showMemberModal.value = false;
  emit('refresh')
};

const local_errors = ref({});

const saveMember = () => {
  let url;
  if(selectedMember.value) {
    url = route('admin.update_team_member',{member: selectedMember.value.uid})
  } else if(selectedType.value === 'admin') {
    url  = route(`admin.create_admin`);
  } else {
    url  = route(`admin.create_team_member`);
  }
  router.post(url, formMember, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      closeMember();
    },
    onError: (error) => {
      errors.value = props.errors;
    }
  });
};
//end member

const searchUser = () => {
  resetStatus();
  axios.post(route('admin.search_user',{type: selectedType.value}),{
    email: emailAddress.value,
  })
      .then(response => {
        canCreate.value = response.data.exists === 'false';
        message.value = response.data.message;
        formMember.email = emailAddress.value;
      })
      .catch(error => {
        if(error?.response?.data?.errors?.email) {
          errors.value = error.response.data.errors.email;
        } else {
          errors.value = ['An error occurred'];
        }
      });
};

const resetStatus = () => {
  formMember.name = '';
  formMember.email = '';
  formMember.make_admin = false;
  canCreate.value = false;
  errors.value = {};
  message.value = '';
};

defineExpose({ openMember });

const emit = defineEmits(['refresh']);

</script>

<template>

  <DialogModal
      :show="showMemberModal"
      @close="closeMember"
  >
    <template #title>
      {{ modalTitle }}
    </template>
    <template #content>

      <v-label>E-mail address</v-label>
      <!-- email -->
      <v-text-field v-model="emailAddress"
                    @keydown.enter="searchUser"
                    @keydown="resetStatus"
      >
        <template #append-inner>
          <v-btn
              @click.prevent="searchUser"
              variant="plain" prepend-icon="mdi-magnify">Search</v-btn>
        </template>
      </v-text-field>
      <!-- end email -->
      <div v-if="canCreate">

        <template v-if="selectedType === 'team'">

          <!-- name -->
          <div>
            <v-label>Team member name (for admin only)</v-label>
            <v-text-field v-model="formMember.name" :error-messages="local_errors.name" />
          </div>
          <!-- end name -->

          <!-- permission -->
          <v-label>Permission</v-label>
          <v-radio-group inline v-model="formMember.permission"
                         :error-messages="local_errors.permission"
          >
            <v-radio label="Front" value="front" />
            <v-radio label="Baker" value="baker" />
          </v-radio-group>
          <!-- end permission -->

        </template>

        <template v-else-if="selectedType === 'admin'">

          <v-checkbox
              label="Make admin"
              v-model="formMember.make_admin"
              :true-value="true"
              :false-value="false"
          />

        </template>

      </div>

      <div v-else>
        <p>Start by searching the user by email address</p>
      </div>

      <div v-if="Object.keys(errors).length > 0">
        <ul>
          <li v-for="(error, index) in errors" :key="index" class="text-red-500">
            {{ error }}
          </li>
        </ul>
      </div>
      <div v-else-if="message">
        <p>{{ message }}</p>
      </div>


    </template>
    <template #footer>
      <PrimaryButton
          @click="saveMember"
          class="me-3"
          :disabled="!canCreate"
      >{{ saveButtonText }}</PrimaryButton>
      <SecondaryButton
          @click="closeMember"
      >Cancel</SecondaryButton>
    </template>
  </DialogModal>

</template>
