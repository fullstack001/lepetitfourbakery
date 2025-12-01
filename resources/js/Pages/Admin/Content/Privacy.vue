<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import LegalCategoryModal from "@/Components/Content/LegalCategoryModal.vue";
import LegalParagraphModal from "@/Components/Content/LegalParagraphModal.vue";
import {nextTick, onMounted, ref} from "vue";
import draggable from 'vuedraggable';

const props = defineProps({
  categories: Object,
  errors: Object,
});

const legalCategoryModal = ref(null);
const legalParagraphModal = ref(null);
const showParagraphContent = ref(true);

const categoryList = ref([]);

const local_errors = ref({});

const orderChanged = ref(false);

const saving = ref(false);

const notifyOrderChanged = () => {
  orderChanged.value = true;
  categoryList.value.forEach((category, index) => {
    const originalCategory = props.categories.find(c => c.id === category.id);
    if (originalCategory) {
      category.paragraphs = [...originalCategory.paragraphs];
    }
  });
};

const initLists = () => {
  categoryList.value = props.categories.map((category) => ({
    ...category,
    paragraphs: category.paragraphs,
  }));
};

const saveOrder = () => {
  saving.value = true;
  router.post(route('admin.update_privacy_order'), {
    categories: categoryList.value,
  }, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: (page) => {
      setTimeout(() => {
        orderChanged.value = false;
        saving.value = false;
        initLists();
      }, 1000);
    },
    onError: (error) => {
      setTimeout(() => {
      }, 1000);
      saving.value = false;
      local_errors.value = props.errors;
    }
  });
};

onMounted(() => {
  nextTick(() => {
    initLists();
  });
})


</script>

<template>
  <AdmLayout title="Privacy Policy">

    <Row :center="true" justify="start">
      <v-btn
          variant="outlined"
          @click.prevent="$inertia.visit(route('admin.legal_content'))">Close</v-btn>
      <v-btn @click.prevent="legalCategoryModal.openCategory('privacy')">Create category</v-btn>
    </Row>

    <div class="py-4">
      <Row>
        <div class="grow">
          <Col gap="4">
            <v-card color="white" rounded="lg">
              <div class="p-4">
                <Col gap="2">
                  <Row :center="true" justify="between">
                    <p class="font-bold">List of categories and paragraphs</p>
                    <v-checkbox
                        v-model="showParagraphContent"
                        label="Show paragraphs"
                        hide-details />
                  </Row>
                  <template v-for="category in categoryList">
                    <v-card color="grey-lighten-3" rounded="lg">
                      <div class="p-4">
                        <Col gap="2">
                          <Row :center="true" justify="between">
                            <div>
                              <p class="text-xl">{{ category.position }}. {{ category.title }}</p>
                            </div>
                            <div>
                              <v-btn
                                  variant="outlined"
                                  @click.prevent="legalCategoryModal.openCategory('privacy', category)"
                                  size="small">Edit category</v-btn>
                            </div>
                          </Row>
                          <draggable
                              :list="category.paragraphs"
                              :group="`paragraphs-${category.id}`"
                              :sort="true"
                              item-key="id"
                              :disabled="saving"
                              @end="notifyOrderChanged"
                              style="min-height: 50px;"
                          >
                            <template #item="{element}">
                              <div class="my-2">
                                <v-card color="white" rounded="lg">
                                  <div class="p-2">
                                    <Row :center="true" justify="between">
                                      <Col>
                                        <Row :center="true" justify="between">
                                          <Row :center="true" justify="start">
                                            <v-icon size="small">mdi-drag</v-icon>
                                            <p class="font-bold">{{ category.position }}.{{ element.position }}. {{ element.title }}</p>
                                          </Row>
                                          <v-btn
                                              @click.prevent="legalParagraphModal.openParagraph('privacy', category, element)"
                                              variant="outlined" size="small">Edit paragraph</v-btn>
                                        </Row>
                                        <template v-if="showParagraphContent">
                                          <Row>
                                            <v-icon size="small" color="transparent">mdi-drag</v-icon>
                                            <p v-html="element.content_formatted" />
                                          </Row>
                                        </template>
                                      </Col>
                                    </Row>
                                  </div>
                                </v-card>
                              </div>
                            </template>
                          </draggable>
                          <div>
                            <v-btn
                                @click.prevent="legalParagraphModal.openParagraph('privacy', category)"
                                size="small">Create paragraph</v-btn>
                          </div>
                        </Col>
                      </div>
                    </v-card>
                  </template>
                </Col>
              </div>
            </v-card>
          </Col>
        </div>
        <div class="shrink-0 w-[400px]">
          <Col gap="4">
            <v-card color="grey-lighten-3" rounded="lg">
              <div class="p-4">
                <p class="font-bold">Reorder categories</p>
                <Col gap="2">
                  <draggable
                      :list="categoryList"
                      :group="`categories`"
                      :sort="true"
                      item-key="id"
                      :disabled="saving"
                      @end="notifyOrderChanged"
                      style="min-height: 50px;"
                  >
                    <template #item="{element}">
                      <div class="my-2">
                        <v-card rounded="lg">
                          <div class="p-2">
                            <Row :center="true" justify="start" gap="1">
                              <v-icon size="small">mdi-drag</v-icon>
                              <p class="text-sm">{{ element.title }}</p>
                            </Row>
                          </div>
                        </v-card>
                      </div>
                    </template>
                  </draggable>
                </Col>
              </div>
            </v-card>
          </Col>
        </div>
      </Row>
    </div>

    <LegalCategoryModal ref="legalCategoryModal" @complete="initLists" :errors="props.errors"/>
    <LegalParagraphModal ref="legalParagraphModal" @complete="initLists" :errors="props.errors"/>

    <div v-if="orderChanged"
         class="fixed z-50 bottom-10 right-10"
    >
      <v-btn
          @click.prevent="saveOrder"
          color="red"
          :disabled="saving"
      >Save order</v-btn>
    </div>

  </AdmLayout>
</template>
