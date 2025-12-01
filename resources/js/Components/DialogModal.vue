<script setup>
import Modal from './Modal.vue';
import {computed, ref, watch, watchEffect} from "vue";
import emitter from '@/eventBus.js';

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

function onOpen() {
  emitter.emit('modal-opened');
}

function onClose() {
  emitter.emit('modal-closed');
}

watchEffect(() => {
  showModal.value = props.show;
});

watch(() => props.show, (newVal) => {
  if (newVal) {
    onOpen();
  } else {
    onClose();
  }
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
        <v-card-title v-if="$slots.title">
          <slot name="title" />
        </v-card-title>
        <v-card-text>

            <div class="mt-4 text-sm text-gray-600">
              <slot name="content" />
            </div>

        </v-card-text>
        <v-card-actions  v-if="$slots.footer">
          <div class="flex flex-row justify-center px-6 py-4 bg-gray-100 w-full">
            <slot name="footer" />
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
