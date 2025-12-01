<script setup>
import Modal from './Modal.vue';
import {computed, ref, watchEffect} from "vue";

const emit = defineEmits(['close']);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: '2xl',
  },
  closeable: {
    type: Boolean,
    default: true,
  },
});

const close = () => {
  emit('close');
};

const showModal = ref(false);

watchEffect(() => {
  showModal.value = props.show;
});

</script>

<template>
  <div>
    <v-dialog
        v-model="showModal"
        :closeable="props.closeable"
        @after-leave="close"
        :class="`max-w-${props.maxWidth}`"
        scrollable
        data-lenis-prevent
    >
      <v-card rounded="lg">
        <div>

          <div class="text-sm text-gray-600">
            <slot name="content" />
          </div>

        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.v-overlay__scrim {
  background-color: #000000;
  opacity: 0.7;
}
</style>
