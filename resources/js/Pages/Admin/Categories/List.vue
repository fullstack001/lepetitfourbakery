<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head, router} from "@inertiajs/vue3";
import CategoryModal from "@/Components/CategoryModal.vue";
import {onMounted, ref} from "vue";
import {cloneDeep} from "lodash";

const props = defineProps({
  categories: Object,
});

const categoryModal = ref(null);

const isReordering = ref(false);

const reorderCategories = () => {
  isReordering.value = !isReordering.value;
};

const categoriesOrder = ref({});
const draggedIndex = ref(null);

const dragStart = (event, index) => {
  draggedIndex.value = index;
  event.dataTransfer.effectAllowed = 'move';
};
const dragOver = (event) => {
  event.preventDefault();
};
const drop = (event, dropIndex) => {
  event.preventDefault();
  const itemToMove = categoriesOrder.value.splice(draggedIndex.value, 1)[0];
  categoriesOrder.value.splice(dropIndex, 0, itemToMove);
  saveCategoryOrder();
};

const saveCategoryOrder = () => {
  const list = categoriesOrder.value.map(category => category.uid);
  const data = {
    list: list,
  };
  router.post(route('admin.reorder_groups'), data, {
    preserveScroll: true,
    preserveState: true,
    only: [''],
    onSuccess: (page) => {
      initializeOrder();
    },
    onError: (error) => {
      console.log('error');
    }
  });
};

const initializeOrder = () => {
  categoriesOrder.value = cloneDeep(props.categories);
};

onMounted(() => {
  initializeOrder();
})

</script>

<template>
  <AdmLayout title="Categories">
    
    <template #buttons>
      <div class="flex flex-row items-center gap-2 w-full">
        <v-btn
            @click.prevent="categoryModal.openCategory(null)"
            size="small">Create new category</v-btn>
        <v-btn
            variant="outlined"
            @click.prevent="reorderCategories"
            size="small">Reorder categories</v-btn>
      </div>
    </template>

    
    <div v-if="props.categories.length">
      <!-- categories -->
      <div class="flex flex-col gap-3">
        <div v-for="(category, index) in categoriesOrder"
             :draggable="isReordering"
             @dragstart="event => dragStart(event, index)"
             @dragover="dragOver"
             @drop="event => drop(event, index)"
        >
          <v-card>
            <v-card-item>
              <div class="flex flex-row w-full gap-3">
                <div class="shrink-0" v-if="isReordering">
                  <v-btn size="small" color="transparent"><v-icon size="x-large">mdi-drag-horizontal</v-icon></v-btn>
                </div>
                <div class="grow">
                  <div class="flex flex-row-items-center justify-between">
                    <div class="flex items-center gap-1">
                      <p class="text-xl">{{ category.name }} <span class="text-grey">({{ category.products_count }})</span></p>
                    </div>
                    <div>
                      <v-btn
                          @click.prevent="categoryModal.openCategory(category)"
                          size="small">Edit category</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-item>
          </v-card>
        </div>
      </div>
      <!-- end categories -->
    </div>
    <div v-else>
      <p>There are no categories for now</p>
    </div>

    <CategoryModal ref="categoryModal" @refresh="initializeOrder" />

  </AdmLayout>
</template>