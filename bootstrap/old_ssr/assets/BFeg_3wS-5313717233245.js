import { ref, watchEffect, watch, resolveComponent, withCtx, renderSlot, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import "./C6q4kDV--4257163313235.js";
import { e as emitter } from "./DKEAH6nn-4333751172235.js";
const _sfc_main = {
  __name: "DialogModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const close = () => {
      emit("close");
    };
    const showModal = ref(false);
    function onOpen() {
      emitter.emit("modal-opened");
    }
    function onClose() {
      emitter.emit("modal-closed");
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_dialog = resolveComponent("v-dialog");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_title = resolveComponent("v-card-title");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_card_actions = resolveComponent("v-card-actions");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_v_dialog, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        closeable: props.closeable,
        onAfterLeave: close,
        class: `max-w-${props.maxWidth}`,
        scrollable: "",
        "data-lenis-prevent": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_card, { rounded: "lg" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (_ctx.$slots.title) {
                    _push3(ssrRenderComponent(_component_v_card_title, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "title", {}, null, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "title")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_v_card_text, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="mt-4 text-sm text-gray-600"${_scopeId3}>`);
                        ssrRenderSlot(_ctx.$slots, "content", {}, null, _push4, _parent4, _scopeId3);
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "mt-4 text-sm text-gray-600" }, [
                            renderSlot(_ctx.$slots, "content")
                          ])
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                  if (_ctx.$slots.footer) {
                    _push3(ssrRenderComponent(_component_v_card_actions, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex flex-row justify-center px-6 py-4 bg-gray-100 w-full"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push4, _parent4, _scopeId3);
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex flex-row justify-center px-6 py-4 bg-gray-100 w-full" }, [
                              renderSlot(_ctx.$slots, "footer")
                            ])
                          ];
                        }
                      }),
                      _: 3
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    _ctx.$slots.title ? (openBlock(), createBlock(_component_v_card_title, { key: 0 }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "title")
                      ]),
                      _: 3
                    })) : createCommentVNode("", true),
                    createVNode(_component_v_card_text, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mt-4 text-sm text-gray-600" }, [
                          renderSlot(_ctx.$slots, "content")
                        ])
                      ]),
                      _: 3
                    }),
                    _ctx.$slots.footer ? (openBlock(), createBlock(_component_v_card_actions, { key: 1 }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-row justify-center px-6 py-4 bg-gray-100 w-full" }, [
                          renderSlot(_ctx.$slots, "footer")
                        ])
                      ]),
                      _: 3
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_card, { rounded: "lg" }, {
                default: withCtx(() => [
                  _ctx.$slots.title ? (openBlock(), createBlock(_component_v_card_title, { key: 0 }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "title")
                    ]),
                    _: 3
                  })) : createCommentVNode("", true),
                  createVNode(_component_v_card_text, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "mt-4 text-sm text-gray-600" }, [
                        renderSlot(_ctx.$slots, "content")
                      ])
                    ]),
                    _: 3
                  }),
                  _ctx.$slots.footer ? (openBlock(), createBlock(_component_v_card_actions, { key: 1 }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-row justify-center px-6 py-4 bg-gray-100 w-full" }, [
                        renderSlot(_ctx.$slots, "footer")
                      ])
                    ]),
                    _: 3
                  })) : createCommentVNode("", true)
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DialogModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
