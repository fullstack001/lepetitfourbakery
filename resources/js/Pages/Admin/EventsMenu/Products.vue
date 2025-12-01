<script setup>
import AdmLayout from '@/Layouts/AdmLayout.vue';
import {Head, useForm} from "@inertiajs/vue3";
import {nextTick, onMounted, ref, watch} from "vue";
import Row from "@/Components/Row.vue";
import Col from "@/Components/Col.vue";
import draggable from 'vuedraggable';

const props = defineProps({
  category: Object,
  products: Object,
  selected_products: Object,
  product_uids: Object,
});

const selectedProducts = ref([]);

const form = useForm({
  selected: {},
  pickup_start_date: null,
  pickup_end_date: null,
});

const mode = ref('reorder');

const savingOrder = ref(false);

const notifyOrderChanged = () => {
  form.selected = selectedProducts.value.map(p => p.uid);
};

const initLists = () => {
  form.selected = props.product_uids;
  selectedProducts.value = Object.values(form.selected ?? {}).map(uid =>
      props.products.find(p => p.uid === uid)
  ).filter(Boolean);

  // Initialize pickup dates from category
  form.pickup_start_date = props.category.pickup_start_date || null;
  form.pickup_end_date = props.category.pickup_end_date || null;

  displayProducts.value = true;
};

const toggleMode = () => {
  mode.value = mode.value === 'reorder' ? 'select' : 'reorder';
};

const display = (uid) => {
  if(mode.value === 'select') return true;
    const selected = form.selected
  return selected.length && selected.includes(uid);
};

const saveProducts = () => {
    form.post(route('admin.events_menu.products.save',{category: props.category.uid}), {
        onSuccess: () => {
          // Re-initialize with updated props (Inertia automatically updates props)
          nextTick(() => {
            initLists();
          });
        },
    });
};

const displayProducts = ref(false);

onMounted(() => {
  nextTick(() => {
    initLists();
  });
})

watch(
    () => form.selected,
    (newSelected) => {
      const selectedUids = Object.values(newSelected ?? {});
      const allProducts = props.products;
      const currentUids = selectedProducts.value.map(p => p.uid);
      const newProducts = [];

      selectedUids.forEach(uid => {
        if (!currentUids.includes(uid)) {
          const product = allProducts.find(p => p.uid === uid);
          if (product) newProducts.push(product);
        }
      });

      selectedProducts.value = selectedProducts.value
          .filter(p => selectedUids.includes(p.uid))
          .concat(newProducts);
    },
    { immediate: true }
);

// Watch for category changes to update date fields
watch(
    () => props.category,
    (newCategory) => {
      if (newCategory) {
        form.pickup_start_date = newCategory.pickup_start_date || null;
        form.pickup_end_date = newCategory.pickup_end_date || null;
      }
    },
    { deep: true }
);


</script>

<template>
  <AdmLayout title="Events menu products">

    <div v-if="mode === 'select'"
         class="fixed bottom-10 end-10 z-50"
    >
      <v-btn  color="amber" size="large"
              prepend-icon="mdi-check-circle"
          @click.prevent="toggleMode"
      >Done</v-btn>
    </div>

    <p class="text-4xl mb-7">Category: <strong>{{ props.category.name }}</strong></p>

    <!-- Pickup Date Range Section -->
    <v-card class="mb-5" color="grey-lighten-5">
      <v-card-title>Pickup Date Range</v-card-title>
      <v-card-text>
        <Row :center="true" justify="start" gap="4">
          <Col>
            <v-label>Start Date</v-label>
            <v-text-field
                v-model="form.pickup_start_date"
                type="date"
                density="compact"
                variant="outlined"
                hide-details
            />
          </Col>
          <Col>
            <v-label>End Date</v-label>
            <v-text-field
                v-model="form.pickup_end_date"
                type="date"
                :min="form.pickup_start_date"
                density="compact"
                variant="outlined"
                hide-details
            />
          </Col>
        </Row>
      </v-card-text>
    </v-card>

    <Row :center="true" justify="between">
      <Row :center="true" justify="start">
        <div>
          <v-btn
              @click.prevent="toggleMode"
          >{{ `${mode === 'select' ? 'Done' : 'Select'}` }}</v-btn>
        </div>
        <template v-if="mode === 'reorder'">
          <div>
            <v-btn
                @click.prevent="saveProducts"
                color="green"
            >Save products</v-btn>
          </div>
          <p>You can reorder the products below.</p>
        </template>
      </Row>
      <div>
        <v-btn
            variant="outlined"
            @click.prevent="$inertia.visit(route('admin.events_menu'))"
        >Close</v-btn>
      </div>
    </Row>

    <Col gap="4" class="my-3" v-if="form.selected">
      <template v-if="mode==='select'">
        <template v-for="product in props.products">
          <v-card
              v-if="display(product.uid)"
              color="grey-lighten-3" rounded="lg">
            <div class="p-2">
              <div class="flex flex-row items-center gap-4">
                <div class="shrink-0">
                  <v-checkbox
                      v-model="form.selected" :value="product.uid"
                      density="compact" hide-details />
                </div>
                <div class="grow">
                  <p>{{ product.name }}</p>
                </div>
              </div>
            </div>
          </v-card>
        </template>
      </template>
      <template v-else-if="displayProducts && mode==='reorder'">
        <draggable
            :list="selectedProducts"
            :sort="true"
            item-key="uid"
            :disabled="savingOrder"
            @end="notifyOrderChanged"
            ghost-class="ghost-landing"
            drag-class="ghost-dragging"
        >
          <template #item="{ element }">
            <v-card
                v-if="display(element.uid)"
                color="grey-lighten-3 my-2" rounded="lg">
              <div class="p-2">
                <div class="flex flex-row items-center gap-4">
                  <div class="shrink-0">
                    <v-icon>mdi-drag</v-icon>
                  </div>
                  <div class="grow">
                    <p>{{ element.name }}</p>
                  </div>
                </div>
              </div>
            </v-card>
          </template>

        </draggable>
      </template>
    </Col>

  </AdmLayout>
</template>

<style scoped>
.ghost-landing {
  background: #000 !important;
}
.ghost-landing * {
  color: #fff !important;
}
.ghost-dragging {
  opacity: 0 !important;
}
.list-group-item {
  background: #222;
}
</style>
