import { reactive, readonly } from 'vue';

const state = reactive({});
const handlers = reactive({});

import mitt from 'mitt';

const emitter = mitt();

export default emitter;

export const eventBus = {
    state: readonly(state),
    emit(event, payload) {
        state[event] = payload;
        if (handlers[event]) {
            handlers[event].forEach(handler => handler(payload));
        }
    },
    on(event, handler) {
        if (!handlers[event]) {
            handlers[event] = [];
        }
        handlers[event].push(handler);
    },
    off(event, handler) {
        if (handlers[event]) {
            const index = handlers[event].indexOf(handler);
            if (index > -1) {
                handlers[event].splice(index, 1);
            }
        }
    },
};
