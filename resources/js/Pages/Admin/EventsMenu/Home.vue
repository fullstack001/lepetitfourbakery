<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import EventsMenuModal from "@/Components/EventsMenuModal.vue";
import {ref} from "vue";

const props = defineProps({
  categories: Object,
  errors: Object,
});

const eventsMenuModal = ref(null);

const deleteCategory = (category) => {
  if (confirm(`Are you sure you want to delete "${category.name}"? This will also remove all products associated with this category.`)) {
    router.post(route('admin.events_menu.delete_category', {category: category.uid}), {}, {
      preserveScroll: true,
      preserveState: false,
    });
  }
};

</script>

<template>

  <AdmLayout title="Events menu">

    <div>
      <v-btn
          @click.prevent="eventsMenuModal.openCategory()"
          size="small">Create event menu category</v-btn>
    </div>

    <div class="my-3">
      <Col gap="4">
        <template v-for="category in props.categories">
          <v-card color="grey-lighten-3" rounded="lg">
            <div class="p-4">
              <Row :center="true" justify="between">
                <p>{{ category.name }} ({{ category.products_count }})</p>
                <Row :center="true" justify="end">
                  <div>
                    <v-btn
                        @click.prevent="$inertia.visit(route('admin.events_menu.products',{category: category.uid}))"
                        variant="outlined" size="small">Manage products</v-btn>
                  </div>
                  <div>
                    <v-btn
                        @click.prevent="eventsMenuModal.openCategory(category)"
                        variant="outlined" size="small">Edit category</v-btn>
                  </div>
                  <div>
                    <v-btn
                        @click.prevent="deleteCategory(category)"
                        variant="outlined"
                        color="error"
                        size="small">Delete category</v-btn>
                  </div>
                </Row>
              </Row>
            </div>
          </v-card>
        </template>
      </Col>
    </div>

    <EventsMenuModal ref="eventsMenuModal" :errors="props.errors"/>

  </AdmLayout>

</template>
