<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import TeamMemberModal from "@/Components/TeamMemberModal.vue";
import {onMounted, ref} from "vue";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";

const props = defineProps({
  members: Object,
  admins: Object,
  errors: Object,
});

const teamMemberModal = ref(null);
const local_errors = ref({});

const updateMember = (member) => {
  const updatedData = {
    name: member.localName,
    permission: member.localPermission,
  };
  router.post(route('admin.update_team_member', {member: member.uid}), updatedData, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (page) => {
        refreshData();
      },
      onError: (error) => {
          console.log('error');
      }
  });
};

const revokeAdmin = (email) => {
    router.post(route('admin.revoke_admin'), {
      email: email,
    }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          refreshData();
        },
        onError: (error) => {
            local_errors.value = props.errors;
        }
    });
};

onMounted(() => {
  refreshData();
});

const refreshData = () => {
  props.members.forEach(member => {
    member.localName = member.name;
    member.localPermission = member.permission;
  });
};

</script>

<template>
  <AdmLayout title="Team">

    <Col gap="4">

      <Col>
        <v-card color="grey-lighten-3" rounded="lg">
          <div class="p-4">
            <p class="text-2xl">Team</p>
            <div v-if="props.members.length > 0">

              <p class="mb-5">To remove a team member, enter "remove user" as their name and update</p>

              <Col gap="3">
                <template v-for="member in props.members">
                  <v-card elevation="2" rounded="lg">
                    <v-card-item>
                      <Col>
                        <p class="text-grey-darken-3">{{member.user.email}} ({{member.user.name}})</p>
                        <div class="flex gap-3">
                          <v-text-field v-model="member.localName" hide-details />
                          <v-radio-group inline hide-details v-model="member.localPermission">
                            <v-radio label="Front" value="front" />
                            <v-radio label="Baker" value="baker" />
                          </v-radio-group>
                          <v-btn
                              @click.prevent="updateMember(member)"
                          >Update</v-btn>
                        </div>
                      </Col>
                    </v-card-item>
                  </v-card>
                </template>
              </Col>

            </div>
            <div v-else>
              <p>The team doesn't have any members yet.</p>
            </div>

            <div class="mt-5">
              <v-btn
                  @click.prevent="teamMemberModal.openMember(null, 'team')"
              >Add team member</v-btn>
            </div>
          </div>
        </v-card>
      </Col>

      <Col>
          <v-card color="grey-lighten-3" rounded="lg">
              <div class="p-4">
                <p class="text-2xl">Admins</p>

                <Col gap="3">
                  <template v-for="admin in props.admins">
                    <v-card color="white" elevation="2" rounded="lg">
                      <div class="p-4">
                        <Row :center="true" justify="between">
                          <p>{{admin.email}} ({{admin.name}})</p>
                          <template v-if="admin.can_be_removed">
                            <div>
                              <v-btn
                                  @click.prevent="revokeAdmin(admin.email)"
                                  size="small" variant="outlined" color="red">Revoke admin permission</v-btn>
                            </div>
                          </template>
                        </Row>
                      </div>
                    </v-card>
                  </template>
                </Col>

                <div class="mt-5">
                  <v-btn
                      @click.prevent="teamMemberModal.openMember(null, 'admin')"
                  >Add Admin</v-btn>
                </div>

              </div>
          </v-card>
      </Col>

    </Col>

    <TeamMemberModal :errors="props.errors" ref="teamMemberModal" @refresh="refreshData" />

  </AdmLayout>
</template>
